package routes

import (

	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"

)

func ComentarioRoutes(r *gin.Engine, db *sql.DB) {
	commentHandler := handlers.Comentario{}

	r.POST("/comentar/:id_postagem", commentHandler.Comentar(db))

	r.GET("/comentarios/:id_postagem", commentHandler.ComentariosDeDeterminadaPostagem(db))

}
