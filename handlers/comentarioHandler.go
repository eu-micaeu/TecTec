package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type Comentario struct {
	ID_Comentario int    `json:"id_comentario"`
	Texto         string `json:"Texto"`
	Data_Postagem string `json:"data_postagem"`
	ID_Postagem   string `json:"id_postagem"`
}

func (p *Comentario) Comentar(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id_postagem := c.Param("id_postagem")
		var novoComentario Comentario
		if err := c.BindJSON(&novoComentario); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar comentário"})
			return
		}

		_, err := db.Exec("INSERT INTO comentarios (texto, data_postagem, id_postagem) VALUES ($1, NOW(), $2)", novoComentario.Texto, id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar comentário"})
			return
		}

		_, err = db.Exec("UPDATE postagens SET comentarios = comentarios + 1 WHERE id_postagem = $1", id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao atualizar a quantidade de comentarios"})
			return
		}

		c.JSON(200, gin.H{"message": "Comentário criada com sucesso!"})
	}
}
