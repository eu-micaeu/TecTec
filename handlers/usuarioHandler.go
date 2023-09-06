package handlers

import (
	"database/sql"
	"github.com/dgrijalva/jwt-go"
    "time"

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

type Claims struct {
    ID_Usuario int `json:"id_usuario"`
    jwt.StandardClaims
}

var jwtKey = []byte("my_secret_key")

func (u *Usuario) ValidateToken(tokenString string) (int, error) {
    claims := &Claims{}

    tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })

    if err != nil || !tkn.Valid {
        return 0, err
    }

    return claims.ID_Usuario, nil
}


func (u *Usuario) Login(db *sql.DB) gin.HandlerFunc {
    return func(c *gin.Context) {

        var usuario Usuario

        if err := c.BindJSON(&usuario); err != nil {
            c.JSON(400, gin.H{"message": "Erro ao fazer login"})
            return
        }

        row := db.QueryRow("SELECT id_usuario, nickname, senha FROM usuarios WHERE nickname = $1 AND senha = $2", usuario.Nickname, usuario.Senha)

        err := row.Scan(&usuario.ID_Usuario, &usuario.Nickname, &usuario.Senha)

        if err != nil {
            c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})
            return
        }

        expirationTime := time.Now().Add(5 * time.Minute)
        claims := &Claims{
            ID_Usuario: usuario.ID_Usuario,
            StandardClaims: jwt.StandardClaims{
                ExpiresAt: expirationTime.Unix(),
            },
        }

        token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
        tokenString, err := token.SignedString(jwtKey)
        if err != nil {
            c.JSON(500, gin.H{"message": "Erro ao gerar token"})
            return
        }

        c.JSON(200, gin.H{"message": "Login efetuado com sucesso!", "token": tokenString, "usuario": usuario})
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

        tknStr := c.Request.Header.Get("Authorization")
        id_usuario, err := u.ValidateToken(tknStr)

        if err != nil {
            c.JSON(401, gin.H{"message": "Token inválido"})
            return
        }

        var usuario Usuario

        row := db.QueryRow("SELECT nickname, senha, telefone, tecnologia, biografia FROM usuarios WHERE id_usuario = $1", id_usuario)

        err = row.Scan(&usuario.Nickname, &usuario.Senha, &usuario.Telefone, &usuario.Tecnologia, &usuario.Biografia)

        usuario.ID_Usuario = id_usuario

        if err != nil {
            c.JSON(404, gin.H{"message": "Usuário inexistente"})
            return
        }

        c.JSON(200, gin.H{"usuario": usuario})
    }
}


func (u *Usuario) AtualizarBiografia(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		tknStr := c.Request.Header.Get("Authorization")
        id_usuario, err := u.ValidateToken(tknStr)

        if err != nil {
            c.JSON(401, gin.H{"message": "Token inválido"})
            return
        }

		var usuario Usuario

		if err := c.BindJSON(&usuario); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao atualizar biografia"})
			return
		}
		
		_, err = db.Exec("UPDATE usuarios SET biografia = $1 WHERE id_usuario = $2", usuario.Biografia, id_usuario)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao atualizar biografia"})
			return
		}
		c.JSON(200, gin.H{"message": "Biografia atualizada com sucesso!"})
	}
}


