package handlers

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type Usuario struct {
	ID_Usuario int    `json:"id_usuario"`
	Nickname   string `json:"nickname"`
	Senha      string `json:"senha"`
	Telefone   string `json:"telefone"`
	Tecnologia string `json:"tecnologia"`
}

func (u *Usuario) Login(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		var usuario Usuario
		
		if err := c.BindJSON(&usuario); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao fazer login"})
			return
		}

		row := db.QueryRow("SELECT id_usuario, nickname, senha, telefone, tecnologia FROM usuarios WHERE nickname = $1 AND senha = $2", usuario.Nickname, usuario.Senha)

		err := row.Scan(&usuario.ID_Usuario, &usuario.Nickname, &usuario.Senha, &usuario.Telefone, &usuario.Tecnologia)

		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})
			return
		}
		
		c.JSON(200, gin.H{"message": "Login efetuado com sucesso!", "usuario": usuario})

	}
}
