package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"
)

func PostagemRoutes(r *gin.Engine, db *sql.DB) {
	postHandler := handlers.Postagem{}

	r.POST("/publicar/:id_usuario", postHandler.Publicar(db))
	r.PUT("/curtir/:id_postagem", postHandler.Curtir(db))

}