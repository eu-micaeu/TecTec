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
	r.GET("/feed/:id_usuario", postHandler.Feed(db))
	r.GET("/postagens/:id_usuario", postHandler.PostagensUsuario(db))
}
