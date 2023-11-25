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

	r.GET("/usuarios/:nickname", userHandler.PegarInformacoesDeTodosOsUsuariosMenosAsMinhas(db))

	r.POST("/perfil-token", userHandler.PegarInformacoesDoUsuarioAtravesDoToken(db))

	r.POST("/sair", userHandler.Sair(db))

	friedHandler := handlers.Seguir{}

	r.POST("/criar_amizade", friedHandler.CriarAmizade(db))

	r.DELETE("/desfazer_amizade", friedHandler.DesfazerAmizade(db))

	r.GET("/contar_amizades/:id_usuario", friedHandler.ContarAmizades(db))

	r.POST("/verificar_amizade", friedHandler.VerificarAmizade(db))

}
