package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"
)

func UsuarioRoutes(r *gin.Engine, db *sql.DB) {
	userHandler := handlers.Usuario{}

	r.POST("/login", userHandler.Login(db))
	r.POST("/register", userHandler.Register(db))
	r.GET("/perfil/:id_usuario", userHandler.Perfil(db))
}
