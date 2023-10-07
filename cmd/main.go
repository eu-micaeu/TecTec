package main

import (
	"net/http"

	"github.com/eu-micaeu/TecTec/database"
	"github.com/eu-micaeu/TecTec/middlewares"
	"github.com/eu-micaeu/TecTec/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middlewares.CorsMiddleware())

	db, err := database.NewDB()
	if err != nil {
		panic(err)
	}

	routes.UsuarioRoutes(r, db)
	routes.PostagemRoutes(r, db)
	routes.ComentarioRoutes(r, db)
	routes.SessaoRoutes(r, db)
	routes.CurtidaRoutes(r, db)
	routes.AmizadeRoutes(r, db)

	r.LoadHTMLGlob("./views/*.html")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "carregamento.html", nil)
	})

	r.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", nil)
	})

	r.GET("/register", func(c *gin.Context) {
		c.HTML(http.StatusOK, "register.html", nil)
	})

	r.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.html", nil)
	})

	r.GET("/post", func(c *gin.Context) {
		c.HTML(http.StatusOK, "post.html", nil)
	})

	r.GET("/perfil", func(c *gin.Context) {
		c.HTML(http.StatusOK, "perfil.html", nil)
	})

	r.GET("/perfil-visitado", func(c *gin.Context) {
		c.HTML(http.StatusOK, "perfil-visitado.html", nil)
	})

	r.GET("/comentario", func(c *gin.Context) {
		c.HTML(http.StatusOK, "comentario.html", nil)
	})
	
	r.GET("/pesquisar",func(c *gin.Context){
		c.HTML(http.StatusOK,"pesquisar.html",nil)
	})

	r.GET("/golang",func(c *gin.Context){
		c.HTML(http.StatusOK,"golang.html",nil)
	})

	r.GET("/java",func(c *gin.Context){
		c.HTML(http.StatusOK,"java.html",nil)
	})

	r.GET("/c",func(c *gin.Context){
		c.HTML(http.StatusOK,"c.html",nil)
	})

	r.GET("/postgreSQL",func(c *gin.Context){
		c.HTML(http.StatusOK,"postgreSQL.html",nil)
	})


	r.Static("./static", "./static")

	r.Run()
}
