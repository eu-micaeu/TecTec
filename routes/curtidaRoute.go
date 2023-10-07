package routes

import (

	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"
	
)

func CurtidaRoutes(r *gin.Engine, db *sql.DB) {
	likeHandler := handlers.Curtida{}

	r.POST("/curtir/:id_usuario/:id_postagem", likeHandler.Curtir(db))

	r.DELETE("/descurtir/:id_usuario/:id_postagem", likeHandler.Descurtir(db))

	r.GET("/postagens-curtidas/:id_usuario", likeHandler.PostagensCurtidas(db))

}
