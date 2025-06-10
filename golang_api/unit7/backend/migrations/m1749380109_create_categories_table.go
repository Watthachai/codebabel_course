package migrations

import (
	"course-go/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1749380109CreateCategoriesTable() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1749380109",
		Migrate: func(tx *gorm.DB) error {
			return tx.AutoMigrate(&models.Category{})
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropTable("categories")
		},
	}
}
