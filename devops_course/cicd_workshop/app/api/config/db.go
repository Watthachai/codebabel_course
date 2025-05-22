package config

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var DB *redis.Client

func SetupDB() {
	opts, err := redis.ParseURL(Env.DatabaseURL)
	if err != nil {
		log.Fatalln(err)
	}

	DB = redis.NewClient(opts)

	if err := DB.Ping(context.Background()).Err(); err != nil {
		log.Fatalln(err)
	}
}
