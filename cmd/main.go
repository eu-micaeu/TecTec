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

	routes.SeguidorRoutes(r, db)

	r.LoadHTMLGlob("./views/*.html")

	r.GET("/", func(c *gin.Context) {

		c.HTML(http.StatusOK, "carregamento.html", nil)

	})

	r.GET("/login", func(c *gin.Context) {

		c.HTML(http.StatusOK, "login.html", nil)

	})

	r.GET("/cadastro", func(c *gin.Context) {

		c.HTML(http.StatusOK, "cadastro.html", nil)

	})

	r.GET("/home", func(c *gin.Context) {

		c.HTML(http.StatusOK, "home.html", nil)

	})

	r.GET("/perfil", func(c *gin.Context) {

		c.HTML(http.StatusOK, "perfil.html", nil)

	})

	r.GET("/perfilVisitado", func(c *gin.Context) {

		c.HTML(http.StatusOK, "perfilVisitado.html", nil)

	})

	r.GET("/comentario", func(c *gin.Context) {

		c.HTML(http.StatusOK, "comentario.html", nil)

	})
	
	r.GET("/pesquisar",func(c *gin.Context){

		c.HTML(http.StatusOK,"pesquisar.html",nil)

	})

	r.GET("/golang",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-golang.html",nil)

	})

	r.GET("/java",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-java.html",nil)

	})

	r.GET("/c",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-c.html",nil)

	})

	r.GET("/postgreSQL",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-postgresql.html",nil)

	})

	r.GET("/docker",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-docker.html",nil)

	})

	r.GET("/typescript",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-typescript.html",nil)

	})

	r.GET("/hadoop",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-hadoop.html",nil)

	})

	r.GET("/html",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-html.html",nil)

	})

	r.GET("/css",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-css.html",nil)

	})

	r.GET("/javaSpring",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-javaSpringBoot.html",nil)

	})

	r.GET("/javascript",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-javascript.html",nil)

	})

	r.GET("/github",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-github.html",nil)

	})

	r.GET("/mysql",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-mysql.html",nil)

	})

	r.GET("/r",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-R.html",nil)

	})

	r.GET("/noSQL",func(c *gin.Context){

		c.HTML(http.StatusOK,"tecnologia-noSQL.html",nil)

	})

	r.Static("./static", "./static")

	r.Run()
}
