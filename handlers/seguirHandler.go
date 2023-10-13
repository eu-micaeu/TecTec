package handlers

// Importando bibliotecas para a criação da classe e funções do usuário.
import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

// Estrutura da amizade.
type Seguir struct {

	ID_Seguir           int    `json:"id_amizade"`

	ID_Usuario_Seguidor int    `json:"id_usuario"`

	ID_Usuario_Seguido  int    `json:"id_usuario_seguindo"`

	Data_Seguindo       string `json:"data_seguindo"`

}

// Função com a finalidade de criar uma amizade.
func (a *Seguir) CriarAmizade(db *sql.DB) gin.HandlerFunc {

	// Trabalhando com rotas, usando o GIN (Framework Web do GoLang).
	return func(c *gin.Context) {

		// Criando um seguir novo.
		var novoSeguir Seguir

		// Criando o corpo JSON para o INSERT.
		if err := c.BindJSON(&novoSeguir); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar seguir"})
			return
		}

		// Executando a query com as informações do seguir inclusas.
		_, err := db.Exec("INSERT INTO seguidores (id_usuario_seguidor, id_usuario_seguido, data_seguindo) VALUES ($1, $2, NOW())", novoSeguir.ID_Usuario_Seguidor, novoSeguir.ID_Usuario_Seguido)

		// Verificando a causa de algum erro.
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar seguir"})
			return
		}

		// Caso haja sucesso, retorne uma mensagem de confirmação.
		c.JSON(200, gin.H{"message": "Seguir criado com sucesso!"})

	}

}

// Função com a finalidade de desfazer uma amizade.
func (a *Seguir) DesfazerAmizade(db *sql.DB) gin.HandlerFunc {

	// Trabalhando com rotas, usando o GIN (Framework Web do GoLang).
	return func(c *gin.Context) {

		// Criando um seguir novo.
		var novoSeguir Seguir

		// Criando o corpo JSON para o DELETE.
		if err := c.BindJSON(&novoSeguir); err != nil {

			c.JSON(400, gin.H{"message": "Erro ao desfazer seguir"})

			return
		}

		// Executando a query com as informações do seguir inclusas.
		_, err := db.Exec("DELETE FROM seguidores WHERE id_usuario_seguidor = $1 AND id_usuario_seguido = $2", novoSeguir.ID_Usuario_Seguidor, novoSeguir.ID_Usuario_Seguido)

		// Verificando a causa de algum erro.
		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao seguir amizade"})

			return

		}

		// Caso haja sucesso, retorne uma mensagem de confirmação.
		c.JSON(200, gin.H{"message": "Seguir desfeito com sucesso!"})

	}

}

// Função com a finalidade de contar todas as amizades de um usuário.
func (a *Seguir) ContarAmizades(db *sql.DB) gin.HandlerFunc {

	// Trabalhando com rotas, usando o GIN (Framework Web do GoLang).
	return func(c *gin.Context) {

		idUsuario := c.Param("id_usuario")

		row := db.QueryRow("SELECT COUNT(*) FROM seguidores WHERE id_usuario_seguidor = $1", idUsuario)

		var quantidade int

		err := row.Scan(&quantidade)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao contar amizades"})

			return

		}

		c.JSON(200, gin.H{"quantidade_amizades": quantidade})
	}

}

// Função com a finalidade de verificar determinada amizade com um outro usuário.
func (a *Seguir) VerificarAmizade(db *sql.DB) gin.HandlerFunc {

	// Trabalhando com rotas, usando o GIN (Framework Web do GoLang).
	return func(c *gin.Context) {
		
		var novoSeguir Seguir

		if err := c.BindJSON(&novoSeguir); err != nil {

			c.JSON(400, gin.H{"message": "Erro ao criar amizade"})

			return

		}

		row := db.QueryRow("SELECT EXISTS (SELECT 1 FROM seguidores WHERE id_usuario_seguidor = $1 AND id_usuario_seguido = $2)", novoSeguir.ID_Usuario_Seguidor, novoSeguir.ID_Usuario_Seguido)

		var existe bool
		
		err := row.Scan(&existe)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao verificar amizade"})

			return

		}

		c.JSON(200, gin.H{"amizade_existe": existe})
	}

}
