package migrations

import (
	"course-go/config"
	"log"

	"github.com/go-gormigrate/gormigrate/v2"
)

func Migrate() {
	db := config.GetDB()
	m := gormigrate.New(
		db,
		gormigrate.DefaultOptions,
		[]*gormigrate.Migration{
			m1749201982CreateArticlesTable(),
			m1749380109CreateCategoriesTable(),
			m1749441241AddCategoryIDToArticles(),
			m1749452190CreateUsersTable(),
			m1749459240AddUserIDToArticles(),
		},
	)

	if err := m.Migrate(); err != nil {
		log.Fatalf("Could not migrate: %v", err)
	}
}
