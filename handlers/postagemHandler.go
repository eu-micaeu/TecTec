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

		tknStr := c.Request.Header.Get("Authorization")
        _, err := p.ValidateToken(tknStr)

        if err != nil {
            c.JSON(401, gin.H{"message": "Token inválido"})
            return
        }

		id_usuario := c.Param("id_usuario")
		var novaPostagem Postagem
		if err := c.BindJSON(&novaPostagem); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar postagem"})
			return
		}
		_, err = db.Exec("INSERT INTO postagens (texto, data_postagem, id_usuario) VALUES ($1, NOW(), $2)", novaPostagem.Texto, id_usuario)
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

func (p *Postagem) Feed(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		tknStr := c.Request.Header.Get("Authorization")
        _, err := p.ValidateToken(tknStr)

        if err != nil {
            c.JSON(401, gin.H{"message": "Token inválido"})
            return
        }

		rows, err := db.Query("SELECT p.*, u.nickname FROM postagens p JOIN usuarios u ON p.id_usuario = u.id_usuario ORDER BY p.data_postagem DESC")

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

func (u *Postagem) PostagensUsuario(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		nickname := c.Param("nickname")

		rows, err := db.Query("SELECT p.*, u.nickname, u.biografia FROM postagens p JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE u.nickname = $1 ORDER BY p.data_postagem DESC", nickname)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})
			return
		}
		defer rows.Close()

		type PostagemComNickname struct {
			Postagem
			Nickname string `json:"nickname"`
			Biografia string `json:"biografia"`
		}

		postagens := []PostagemComNickname{}

		for rows.Next() {
			var postagem PostagemComNickname
			err := rows.Scan(&postagem.ID_Postagem, &postagem.Texto, &postagem.Data_Postagem, &postagem.Curtidas, &postagem.ID_Usuario, &postagem.Comentarios, &postagem.Nickname, &postagem.Biografia)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})
				return
			}
			postagens = append(postagens, postagem)
		}

		c.JSON(200, gin.H{"message": "Feed resgatado com sucesso!", "postagens": postagens})
	}
}

func (p *Postagem) ApagarPostagem(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id_postagem := c.Param("id_postagem")

		_, err := db.Exec("DELETE FROM postagens WHERE id_postagem = $1", id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao apagar a postagem"})
			return
		}

		c.JSON(200, gin.H{"message": "Apagou com sucesso!"})
	}
}

func (u *Postagem) ComentariosDaPostagem(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		id_postagem := c.Param("id_postagem")

		rows, err := db.Query("SELECT c.* FROM postagens p JOIN comentarios c ON p.id_postagem = c.id_postagem WHERE p.id_postagem = $1 ORDER BY p.data_postagem DESC", id_postagem)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})
			return
		}
		defer rows.Close()

		type ComentariosDaPostagem struct {
			Comentario
		}

		comentarios := []ComentariosDaPostagem{}

		for rows.Next() {
			var comentario ComentariosDaPostagem
			err := rows.Scan(&comentario.Comentario.ID_Comentario, &comentario.Comentario.Texto, &comentario.Comentario.Data_Postagem, &comentario.Comentario.ID_Postagem)
			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao resgatar o feed"})
				return
			}
			comentarios = append(comentarios, comentario)
		}

		c.JSON(200, gin.H{"message": "Post resgatado com sucesso!", "comentários": comentarios})
	}
}