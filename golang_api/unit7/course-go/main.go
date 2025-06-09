package main

import (
	"course-go/config"
	"course-go/migrations"
	"course-go/routes"
	"course-go/seed"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// /articles?categoryId=1
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.InitDB()
	defer config.CloseDB()
	migrations.Migrate()
	seed.Load()

	r := gin.Default()

	r.Static("/uploads", "./uploads")

	uploadDirs := [...]string{"articles", "users"}
	for _, dir := range uploadDirs {
		os.MkdirAll("uploads/"+dir, 0755)
	}

	routes.Serve(r)

	port := os.Getenv("PORT")

	r.Run(":" + port)
}
