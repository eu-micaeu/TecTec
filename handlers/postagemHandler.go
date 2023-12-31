package handlers

// Importando bibliotecas para a criação da classe e funções da postagem.
import (

	"database/sql"
	"github.com/gin-gonic/gin"

)

// Estrutura da postagem.
type Postagem struct {

	ID_Postagem   int    `json:"id_postagem"`
	Texto         string `json:"texto"`
	Data_Postagem string `json:"data_postagem"`
	Curtidas      string `json:"curtidas"`
	ID_Usuario    int    `json:"id_usuario"`
	Comentarios   int    `json:"comentarios"`

}

// Função com a finalidade de criar uma postagem.	
func (p *Postagem) Publicar(db *sql.DB) gin.HandlerFunc {
	
	return func(c *gin.Context) {

		id_usuario := c.Param("id_usuario")

		var novaPostagem Postagem

		if err := c.BindJSON(&novaPostagem); err != nil {

			c.JSON(400, gin.H{"message": "Erro ao criar postagem"})

			return

		}

		_, err := db.Exec("INSERT INTO postagens (texto, data_postagem, id_usuario) VALUES ($1, NOW(), $2)", novaPostagem.Texto, id_usuario)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao criar postagem"})

			return

		}

		c.JSON(200, gin.H{"message": "Postagem criada com sucesso!"})

	}

}

// Função com a finalidade de mostrar o feed de um usuário.
func (p *Postagem) Feed(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		idUsuario := c.Param("id_usuario")

		rows, err := db.Query("SELECT DISTINCT p.*, u.nickname FROM postagens p JOIN usuarios u ON p.id_usuario = u.id_usuario LEFT JOIN seguidores a ON a.id_usuario_seguido = p.id_usuario WHERE a.id_usuario_seguidor = $1 OR p.id_usuario = $1 ORDER BY p.data_postagem DESC", idUsuario)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})

			return

		}

		defer rows.Close()

		type PostagemComNickname struct {

			Postagem

			Nickname string `json:"nickname"`

		}

		postagens := []PostagemComNickname{}

		for rows.Next() {

			var postagem PostagemComNickname

			err := rows.Scan(&postagem.ID_Postagem, &postagem.Texto, &postagem.Data_Postagem, &postagem.Curtidas, &postagem.ID_Usuario, &postagem.Comentarios, &postagem.Nickname)

			if err != nil {

				c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})

				return

			}

			postagens = append(postagens, postagem)

		}

		c.JSON(200, gin.H{"message": "Feed resgatado com sucesso!", "postagens": postagens})

	}

}

// Função com a finalidade de mostrar o feed de um usuário.
func (u *Postagem) PostagensUsuario(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		nickname := c.Param("nickname")

		rows, err := db.Query("SELECT p.*, u.nickname FROM postagens p JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE u.nickname = $1 ORDER BY p.data_postagem DESC", nickname)
		
		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})

			return

		}

		defer rows.Close()

		type PostagemComNickname struct {

			Postagem

			Nickname   string `json:"nickname"`
			
		}

		postagens := []PostagemComNickname{}

		for rows.Next() {

			var postagem PostagemComNickname

			err := rows.Scan(&postagem.ID_Postagem, &postagem.Texto, &postagem.Data_Postagem, &postagem.Curtidas, &postagem.ID_Usuario, &postagem.Comentarios, &postagem.Nickname)

			if err != nil {

				c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})

				return

			}

			postagens = append(postagens, postagem)

		}

		c.JSON(200, gin.H{"message": "Feed resgatado com sucesso!", "postagens": postagens})

	}

}

// Função com a finalidade de apagar uma postagem utilizando o id da mesma.
func (p *Postagem) ApagarPostagem(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		id_postagem := c.Param("id_postagem")

		_, err := db.Exec("DELETE FROM comentarios WHERE id_postagem = $1", id_postagem)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao apagar os comentários da postagem"})

			return

		}

		_, err = db.Exec("DELETE FROM curtidas WHERE id_postagem = $1", id_postagem)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao apagar os comentários da postagem"})

			return

		}

		_, err = db.Exec("DELETE FROM postagens WHERE id_postagem = $1", id_postagem)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao apagar a postagem"})

			return

		}

		c.JSON(200, gin.H{"message": "Apagou com sucesso!"})

	}

}

// Função com a finalidade de pegar uma postagem utilizando o id da mesma.
func (u *Postagem) PegarPostagemPorIdDaPostagem(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		id_postagem := c.Param("id_postagem")

		type PostagemComNickname struct {

			Postagem

			Nickname string `json:"nickname"`

		}

		var postagem PostagemComNickname

		row := db.QueryRow("SELECT p.*, u.nickname FROM postagens p, usuarios u WHERE id_postagem = $1 AND u.id_usuario = p.id_usuario", id_postagem)

		err := row.Scan(&postagem.ID_Postagem, &postagem.Texto, &postagem.Data_Postagem, &postagem.Curtidas, &postagem.ID_Usuario, &postagem.Comentarios, &postagem.Nickname)

		if err != nil {

			c.JSON(404, gin.H{"message": "Postagem inexistente"})

			return

		}

		c.JSON(200, gin.H{"postagem": postagem})
	}

}

// Função com a finalidade de contar as postagens de um usuário.
func (a *Postagem) ContarPostagens(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		idUsuario := c.Param("id_usuario")

		query := "SELECT COUNT(*) FROM postagens WHERE id_usuario = $1"

		row := db.QueryRow(query, idUsuario)

		var quantidade int
		
		err := row.Scan(&quantidade)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao contar postagens"})

			return
			
		}

		c.JSON(200, gin.H{"quantidade_postagens": quantidade})
	}
}
