package routes

import (
	"github.com/babelcoder-dummy/intro-devops/api/controller"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	articleCtl := controller.Article{}
	articleGroup := app.Group("articles")
	articleGroup.Get("", articleCtl.FindAll)
	articleGroup.Post("", articleCtl.Create)
}
