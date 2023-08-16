package main

import (
	"net/http"

	"github.com/eu-micaeu/TecTec/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middlewares.CorsMiddleware())

	r.LoadHTMLGlob("views/*.html") 

	r.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", nil)
	})

	r.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.html", nil)
	})

	r.Static("/static", "./static")
	
	r.Run()
}

