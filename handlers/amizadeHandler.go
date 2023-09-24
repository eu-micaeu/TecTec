package handlers

// Importando bibliotecas para a criação da classe e funções do usuário.
import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

// Estrutura da amizade.
type Amizade struct {
	ID_Amizade          int    `json:"id_amizade"`
	ID_Usuario_Seguidor int    `json:"id_usuario"`
	ID_Usuario_Seguido  int    `json:"id_usuario_seguindo"`
	Data_Seguindo       string `json:"data_seguindo"`
}

// Função com a finalidade de criar uma amizade.
func (a *Amizade) CriarAmizade(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		var novaAmizade Amizade

		if err := c.BindJSON(&novaAmizade); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar amizade"})
			return
		}

		_, err := db.Exec("INSERT INTO seguidores (id_usuario_seguidor, id_usuario_seguido, data_seguindo) VALUES ($1, $2, NOW())", novaAmizade.ID_Usuario_Seguidor, novaAmizade.ID_Usuario_Seguido)

		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar amizade"})
			return
		}

		c.JSON(200, gin.H{"message": "Amizade criada com sucesso!"})
	}
}

// Função com a finalidade de desfazer uma amizade.
func (a *Amizade) DesfazerAmizade(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		var novaAmizade Amizade

		if err := c.BindJSON(&novaAmizade); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao desfazer amizade"})
			return
		}

		_, err := db.Exec("DELETE FROM seguidores WHERE id_usuario_seguidor = $1 AND id_usuario_seguido = $2", novaAmizade.ID_Usuario_Seguidor, novaAmizade.ID_Usuario_Seguido)

		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao desfazer amizade"})
			return
		}

		c.JSON(200, gin.H{"message": "Amizade desfeita com sucesso!"})
	}
}

// Função com a finalidade de mostrar todas as amizades de um usuário.
func (a *Amizade) MostrarAmizades(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idUsuario := c.Param("id_usuario")

		rows, err := db.Query("SELECT u.id_usuario, u.nickname, u.tecnologia FROM amizades a JOIN usuarios u ON a.id_usuario_seguindo = u.id_usuario WHERE a.id_usuario = $1", idUsuario)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao buscar amizades"})
			return
		}
		defer rows.Close()

		var amigos []Usuario

		for rows.Next() {
			var amigo Usuario
			if err := rows.Scan(&amigo.ID_Usuario, &amigo.Nickname, &amigo.Tecnologia); err != nil {
				c.JSON(500, gin.H{"message": "Erro ao buscar amizades"})
				return
			}
			amigos = append(amigos, amigo)
		}

		c.JSON(200, gin.H{"amigos": amigos})
	}
}

// Função com a finalidade de contar todas as amizades de um usuário.
func (a *Amizade) ContarAmizades(db *sql.DB) gin.HandlerFunc {
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

func (a *Amizade) VerificarAmizade(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var amizade Amizade

		if err := c.BindJSON(&amizade); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar amizade"})
			return
		}

		row := db.QueryRow("SELECT EXISTS (SELECT 1 FROM seguidores WHERE id_usuario_seguidor = $1 AND id_usuario_seguido = $2)", amizade.ID_Usuario_Seguidor, amizade.ID_Usuario_Seguido)

		var existe bool
		err := row.Scan(&existe)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao verificar amizade"})
			return
		}

		c.JSON(200, gin.H{"amizade_existe": existe})
	}
}
