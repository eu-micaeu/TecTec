package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/eu-micaeu/TecTec/handlers"
)

func PostagemRoutes(r *gin.Engine, db *sql.DB) {
	postHandler := handlers.Postagem{}

	r.POST("/publicar/:id_usuario", postHandler.Publicar(db))
	r.GET("/feed", postHandler.Feed(db))
	r.GET("/postagens/:nickname", postHandler.PostagensUsuario(db))
	r.GET("/postagem/:id_postagem", postHandler.GetPostagemById(db))
	r.DELETE("/excluir-postagem/:id_postagem", postHandler.ApagarPostagem(db))
}
