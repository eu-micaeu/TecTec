package routes

import (
	"database/sql"

	"github.com/eu-micaeu/TecTec/handlers"
	"github.com/gin-gonic/gin"
)

func SeguirRoutes(r *gin.Engine, db *sql.DB) {
	
	friedHandler := handlers.Seguir{}

	r.POST("/criar_amizade", friedHandler.CriarAmizade(db))

	r.DELETE("/desfazer_amizade", friedHandler.DesfazerAmizade(db))

	r.GET("/contar_amizades/:id_usuario", friedHandler.ContarAmizades(db))

	r.POST("/verificar_amizade", friedHandler.VerificarAmizade(db))

}
