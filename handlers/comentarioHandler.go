package handlers

// Importando bibliotecas para a criação da classe e funções do comentário.
import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
)

// Estrutura do comentário.
type Comentario struct {
	ID_Comentario int    `json:"id_comentario"`
	Texto         string `json:"texto"`
	Data_Postagem string `json:"data_postagem"`
	ID_Postagem   int    `json:"id_postagem"`
	ID_Usuario    int    `json:"id_usuario"`
}

// Função com a finalidade de inserir comentário em determinada postagem utilizando o id da mesma.
func (p *Comentario) Comentar(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		id_postagem := c.Param("id_postagem")

		var novoComentario Comentario

		if err := c.BindJSON(&novoComentario); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar comentário"})
			return
		}

		_, err := db.Exec("INSERT INTO comentarios (texto, data_postagem, id_postagem, id_usuario) VALUES ($1, NOW(), $2, $3)", novoComentario.Texto, id_postagem, novoComentario.ID_Usuario)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar comentário"})
			return
		}

		c.JSON(200, gin.H{"message": "Comentário criada com sucesso!"})

	}
}

// Função com a finalidade de resgatar os comentários de determinada postagem utilizando o id da mesma.
func (u *Comentario) ComentariosDePostagem(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		id_postagem := c.Param("id_postagem")

		rows, err := db.Query("SELECT c.id_comentario, c.texto, c.data_postagem, c.id_postagem, u.nickname FROM comentarios c JOIN usuarios u ON c.id_usuario = u.id_usuario WHERE c.id_postagem = $1 ORDER BY c.data_postagem", id_postagem)
		
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao resgatar os comentários"})
			return
		}

		defer rows.Close()

		type ComentarioComNickname struct {
			Comentario
			Nickname string `json:"nickname"`
		}

		comentarios := []ComentarioComNickname{}

		for rows.Next() {

			var comentario ComentarioComNickname

			err := rows.Scan(&comentario.ID_Comentario, &comentario.Texto, &comentario.Data_Postagem, &comentario.ID_Postagem, &comentario.Nickname)

			if err != nil {
				fmt.Println("Error:", err)
				c.JSON(500, gin.H{"message": "Erro ao resgatar os comentários"})
				return
			}

			comentarios = append(comentarios, comentario)

		}

		c.JSON(200, gin.H{"comentarios": comentarios})

	}
}
