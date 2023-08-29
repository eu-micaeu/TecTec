package handlers

import (
	"database/sql"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Usuario struct {
	ID_Usuario int    `json:"id_usuario"`
	Nickname   string `json:"nickname"`
	Senha      string `json:"senha"`
	Telefone   string `json:"telefone"`
	Tecnologia string `json:"tecnologia"`
	Biografia  string `json:"biografia"`
}

func (u *Usuario) Login(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		var usuario Usuario

		if err := c.BindJSON(&usuario); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao fazer login"})
			return
		}

		row := db.QueryRow("SELECT nickname, senha FROM usuarios WHERE nickname = $1 AND senha = $2", usuario.Nickname, usuario.Senha)

		err := row.Scan(&usuario.Nickname, &usuario.Senha)

		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})
			return
		}

		c.JSON(200, gin.H{"message": "Login efetuado com sucesso!"})
	}
}

func (u *Usuario) Register(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var novoUsuario Usuario
		if err := c.BindJSON(&novoUsuario); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar usuário"})
			return
		}
		_, err := db.Exec("INSERT INTO usuarios (nickname, senha, telefone, tecnologia, biografia) VALUES ($1, $2, $3, $4, '')", novoUsuario.Nickname, novoUsuario.Senha, novoUsuario.Telefone, novoUsuario.Tecnologia)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar usuário"})
			return
		}

		c.JSON(200, gin.H{"message": "Usuário criado com sucesso!"})
	}
}

func (u *Usuario) Perfil(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		id_usuario := c.Param("id_usuario")

		var usuario Usuario

		row := db.QueryRow("SELECT nickname, senha, telefone, tecnologia, biografia FROM usuarios WHERE id_usuario = $1", id_usuario)

		err := row.Scan(&usuario.Nickname, &usuario.Senha, &usuario.Telefone, &usuario.Tecnologia, &usuario.Biografia)

		id_usuario_int, _ := strconv.Atoi(id_usuario)

		usuario.ID_Usuario = id_usuario_int

		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário inexistente"})
			return
		}

		c.JSON(200, gin.H{"usuario": usuario})
	}
}
