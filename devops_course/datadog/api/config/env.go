package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type EnvMapping struct {
	Port        uint64
	DatabaseURL string
}

var Env EnvMapping

func SetupEnv() {
	if os.Getenv("APP_ENV") != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	port, err := strconv.ParseUint(os.Getenv("PORT"), 10, 64)
	if err != nil {
		port = 3000
	}

	Env = EnvMapping{
		Port:        port,
		DatabaseURL: os.Getenv("DATABASE_URL"),
	}
}
