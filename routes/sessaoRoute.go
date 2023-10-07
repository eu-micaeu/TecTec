package routes

import (
	
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"

)

func SessaoRoutes(r *gin.Engine, db *sql.DB) {
	sectionHandler := handlers.Sessao{}

	r.POST("/entrada/:nickname", sectionHandler.Entrada(db))

}
