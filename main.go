package main

import (
	"net/http"

	"github.com/eu-micaeu/TecTec/middlewares"
	"github.com/eu-micaeu/TecTec/internal/database"
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

	r.LoadHTMLGlob("views/*.html") 

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

	r.Static("/static", "./static")
	
	r.Run()
}

