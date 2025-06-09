package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	Title      string `json:"title"`
	Body       string `json:"body"`
	Excerpt    string `json:"excerpt"`
	Image      string `json:"image"`
	CategoryID uint
	Category   Category
}
