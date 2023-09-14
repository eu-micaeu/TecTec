package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"
)

func TokenRoutes(r *gin.Engine, db *sql.DB) {
	r.POST("/perfil-token", handlers.GetUsuarioFromTokenHandler(db))
}
