package migrations

import (
	"course-go/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1749459240AddUserIDToArticles() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1749459240",
		Migrate: func(tx *gorm.DB) error {
			return tx.AutoMigrate(&models.Article{})
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropColumn(&models.Article{}, "user_id")
		},
	}
}
