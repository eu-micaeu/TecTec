package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type Postagem struct {
	ID_Postagem   int    `json:"id_postagem"`
	Texto         string `json:"texto"`
	Data_Postagem string `json:"data_postagem"`
	Curtidas      string `json:"curtidas"`
	ID_Usuario    int    `json:"id_usuario"`
	Comentarios   string `json:"comentarios"`
}

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

func (p *Postagem) Curtir(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id_postagem := c.Param("id_postagem")

		_, err := db.Exec("UPDATE postagens SET curtidas = curtidas + 1 WHERE id_postagem = $1", id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao curtir postagem"})
			return
		}

		c.JSON(200, gin.H{"message": "Curtiu com sucesso!"})
	}
}

func (u *Postagem) Feed(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		id_usuario := c.Param("id_usuario")

		rows, err := db.Query("SELECT * FROM postagens WHERE id_usuario != $1 ORDER BY data_postagem DESC", id_usuario)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})
			return
		}
		defer rows.Close()

		postagens := []Postagem{}

		for rows.Next() {
			var postagem Postagem
			err := rows.Scan(&postagem.ID_Postagem, &postagem.Texto, &postagem.Data_Postagem, &postagem.Curtidas, &postagem.ID_Usuario, &postagem.Comentarios)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})
				return
			}
			postagens = append(postagens, postagem)
		}

		c.JSON(200, gin.H{"message": "Feed resgatado com sucesso!", "postagens": postagens})
	}
}

