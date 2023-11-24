package handlers

// Importando bibliotecas para a criação da classe e funções da curtida.
import (

	"database/sql"
	"github.com/gin-gonic/gin"

)

// Estrutura da curtida.
type Curtida struct {

	ID_Curtida    int    `json:"id_curtida"`
	Data_Postagem string `json:"data_postagem"`
	ID_Postagem   int    `json:"id_postagem"`
	ID_Usuario    int    `json:"id_usuario"`

}

// Função com a finalidade de curtir determinada postagem e criar uma curtida.
func (p *Curtida) Curtir(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {
		
		id_postagem := c.Param("id_postagem")

		id_usuario := c.Param("id_usuario")

		_, err := db.Exec("INSERT INTO curtidas (data_postagem, id_usuario, id_postagem) VALUES (NOW(), $1, $2)", id_usuario, id_postagem)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao curtir postagem"})

			return

		}

		c.JSON(200, gin.H{"message": "Curtiu com sucesso!"})

	}

}

// Função com a finalidade de descurtir determinada postagem e criar uma curtida.
func (p *Curtida) Descurtir(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		id_postagem := c.Param("id_postagem")

		id_usuario := c.Param("id_usuario")

		_, err := db.Exec("DELETE FROM curtidas WHERE id_postagem = $1 AND id_usuario = $2", id_postagem, id_usuario)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao descurtir postagem"})

			return

		}

		c.JSON(200, gin.H{"message": "Descurtiu com sucesso!"})

	}

}

// Função com a finalidade de retornar as postagens que determinado usuário curtiu usando o id do mesmo.
func (p *Curtida) PostagensCurtidas(db *sql.DB) gin.HandlerFunc {
	
	return func(c *gin.Context) {

		idUsuario := c.Param("id_usuario")

		rows, err := db.Query("SELECT p.* FROM postagens p INNER JOIN curtidas c ON p.id_postagem = c.id_postagem WHERE c.id_usuario = $1", idUsuario)

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao resgatar as postagens curtidas"})

			return

		}

		defer rows.Close()

		postagens := []Postagem{}

		for rows.Next() {

			var postagem Postagem

			err := rows.Scan(&postagem.ID_Postagem, &postagem.Texto, &postagem.Data_Postagem, &postagem.Curtidas, &postagem.ID_Usuario, &postagem.Comentarios)

			if err != nil {

				c.JSON(500, gin.H{"message": "Erro ao resgatar as postagens"})

				return

			}

			postagens = append(postagens, postagem)

		}

		c.JSON(200, gin.H{"message": "Postagens curtidas resgatadas com sucesso!", "postagens": postagens})
		
	}

}
