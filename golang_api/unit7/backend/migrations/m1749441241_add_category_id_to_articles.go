package migrations

import (
	"course-go/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1749441241AddCategoryIDToArticles() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1749441241",
		Migrate: func(tx *gorm.DB) error {
			err := tx.AutoMigrate(&models.Article{})
			if err != nil {
				return err
			}

			var articles []models.Article
			tx.Unscoped().Find(&articles)
			for _, article := range articles {
				article.CategoryID = 2
				tx.Save(&article)
			}

			return nil
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropColumn(&models.Article{}, "category_id")
		},
	}
}
