package routes

import (
	"course-go/controllers"

	"github.com/gin-gonic/gin"
)

func Serve(r *gin.Engine) {

	articlesGroup := r.Group("/api/v1/articles")
	articlesController := controllers.Articles{}
	{
		articlesGroup.GET("", articlesController.FindAll)
		articlesGroup.GET("/:id", articlesController.FindOne)
		articlesGroup.POST("", articlesController.Create)
	}

}
