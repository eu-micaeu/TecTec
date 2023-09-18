package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"
)

func AmizadeRoutes(r *gin.Engine, db *sql.DB) {
	friedHandler := handlers.Amizade{}

	r.POST("/criar_amizade", friedHandler.CriarAmizade(db))
	r.GET("/mostrar_amizades/:id_usuario", friedHandler.MostrarAmizades(db))
	r.GET("/contar_amizades/:id_usuario", friedHandler.ContarAmizades(db))
	r.GET("/sugerir_amizades/:id_usuario", friedHandler.SugerirAmigos(db))
}
