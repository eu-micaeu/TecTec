package handlers

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

type Curtida struct {
	ID_Curtida    int    `json:"id_curtida"`
	Data_Postagem string `json:"data_postagem"`
	ID_Postagem   int    `json:"id_postagem"`
	ID_Usuario    int    `json:"id_usuario"`
}

func (p *Curtida) Curtir(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		
		id_postagem := c.Param("id_postagem")

		id_usuario := c.Param("id_usuario")

		_, err := db.Exec("INSERT INTO curtidas (data_postagem, id_usuario, id_postagem) VALUES (NOW(), $1, $2)", id_usuario, id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao curtir postagem"})
			return
		}

		_, err = db.Exec("UPDATE postagens SET curtidas = curtidas + 1 WHERE id_postagem = $1", id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao descurtir postagem"})
			return
		}

		c.JSON(200, gin.H{"message": "Curtiu com sucesso!"})
	}
}

func (p *Curtida) Descurtir(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		id_postagem := c.Param("id_postagem")

		id_usuario := c.Param("id_usuario")

		_, err := db.Exec("DELETE FROM curtidas WHERE id_postagem = $1 AND id_usuario = $2", id_postagem, id_usuario)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao descurtir postagem"})
			return
		}

		_, err = db.Exec("UPDATE postagens SET curtidas = curtidas - 1 WHERE id_postagem = $1", id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao descurtir postagem"})
			return
		}

		c.JSON(200, gin.H{"message": "Descurtiu com sucesso!"})
	}
}

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
