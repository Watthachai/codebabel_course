package routes

import (
	"course-go/config"
	"course-go/controllers"

	"github.com/gin-gonic/gin"
)

func Serve(r *gin.Engine) {
	db := config.GetDB()
	articlesGroup := r.Group("/api/v1/articles")
	articlesController := controllers.Articles{DB: db}
	{
		articlesGroup.GET("", articlesController.FindAll)
		articlesGroup.GET("/:id", articlesController.FindOne)
		articlesGroup.POST("", articlesController.Create)
	}

}
