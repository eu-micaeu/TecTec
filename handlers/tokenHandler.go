package handlers

import (

	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
    ID_Usuario int `json:"id_usuario"`
    jwt.StandardClaims
}

var jwtKey = []byte("my_secret_key")