package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"
)

func UsuarioRoutes(r *gin.Engine, db *sql.DB) {
	userHandler := handlers.Usuario{}

	r.POST("/login", userHandler.Entrar(db))

	r.POST("/register", userHandler.Registrar(db))

	r.GET("/perfil/:nickname", userHandler.PegarInformacoesDoUsuarioAtravesDoNickname(db))

	r.GET("/usuarios/:id_usuario", userHandler.PegarInformacoesDeTodosOsUsuariosMenosAsMinhas(db))

	r.POST("/perfil-token", userHandler.PegarInformacoesDoUsuarioAtravesDoToken(db))

	r.POST("/sair", userHandler.Sair(db))

}
