package main

import (
	"fmt"
	"os"

	"github.com/babelcoder-dummy/intro-devops/api/config"
	"github.com/babelcoder-dummy/intro-devops/api/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.uber.org/zap"
	fibertrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gofiber/fiber.v2"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
	app := fiber.New()
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	if os.Getenv("APP_ENV") == "production" {
		tracer.Start()
		defer tracer.Stop()
		
		app.Use(fibertrace.Middleware(fibertrace.WithServiceName("api")))
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	config.SetupEnv()
	config.SetupDB()
	routes.Setup(app)

	logger.Info("the server has already started", zap.Uint64("port", config.Env.Port))
	app.Listen(fmt.Sprintf(":%d", config.Env.Port))
}
