package handlers

import (
	"database/sql"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Claims struct {
    ID_Usuario int `json:"id_usuario"`
    jwt.StandardClaims
}

var jwtKey = []byte("my_secret_key")

func GetUsuarioFromTokenHandler(db *sql.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        var reqBody struct {
            Token string `json:"token"`
        }

        if err := c.ShouldBindJSON(&reqBody); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"message": "Erro no corpo da solicitação"})
            return
        }

        claims := &Claims{}

        tkn, err := jwt.ParseWithClaims(reqBody.Token, claims, func(token *jwt.Token) (interface{}, error) {
            return jwtKey, nil
        })

        if err != nil || !tkn.Valid {
            c.JSON(401, gin.H{"message": "Token inválido"})
            return
        }

        idUsuario := claims.ID_Usuario

        var usuario Usuario

        row := db.QueryRow("SELECT id_usuario, nickname, senha, telefone, tecnologia, biografia FROM usuarios WHERE id_usuario = $1", idUsuario)

        err = row.Scan(&usuario.ID_Usuario, &usuario.Nickname, &usuario.Senha, &usuario.Telefone, &usuario.Tecnologia, &usuario.Biografia)

        if err != nil {
            c.JSON(404, gin.H{"message": "Usuário inexistente"})
            return
        }

        c.JSON(200, gin.H{"usuario": usuario})
    }
}


