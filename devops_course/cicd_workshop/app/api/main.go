package main

import (
	"fmt"

	"github.com/babelcoder-dummy/intro-devops/api/config"
	"github.com/babelcoder-dummy/intro-devops/api/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	config.SetupEnv()
	config.SetupDB()
	routes.Setup(app)

	app.Listen(fmt.Sprintf(":%d", config.Env.Port))
}
