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

func ValidateTokenAndGetUserID(tokenString string) (int, error) {
    claims := &Claims{}

    tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })

    if err != nil || !tkn.Valid {
        return 0, err
    }

    return claims.ID_Usuario, nil
}

func GetUsuarioFromTokenHandler(db *sql.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        var reqBody struct {
            Token string `json:"token"`
        }

        if err := c.ShouldBindJSON(&reqBody); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"message": "Erro no corpo da solicitação"})
            return
        }

        idUsuario, err := ValidateTokenAndGetUserID(reqBody.Token)

        if err != nil {
            c.JSON(401, gin.H{"message": "Token inválido"})
            return
        }

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

func (u *Postagem) ValidateToken(tokenString string) (int, error) {
    claims := &Claims{}

    tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })

    if err != nil || !tkn.Valid {
        return 0, err
    }

    return claims.ID_Usuario, nil
}

func (u *Sessao) ValidateToken(tokenString string) (int, error) {
    claims := &Claims{}

    tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })

    if err != nil || !tkn.Valid {
        return 0, err
    }

    return claims.ID_Usuario, nil
}

