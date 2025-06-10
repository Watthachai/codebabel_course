package migrations

import (
	"course-go/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1749452190CreateUsersTable() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1749452190",
		Migrate: func(tx *gorm.DB) error {
			// GORM v2 - AutoMigrate ไม่ต้องเรียก .Error เพิ่ม
			return tx.AutoMigrate(&models.User{})
		},
		Rollback: func(tx *gorm.DB) error {
			// GORM v2 - ใช้ Migrator().DropTable แทน DropTable
			return tx.Migrator().DropTable(&models.User{})
		},
	}
}
