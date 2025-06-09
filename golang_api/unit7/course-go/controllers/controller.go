package controllers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type pagination struct {
	ctx     *gin.Context
	query   *gorm.DB
	records interface{}
}

type pagingResult struct {
	Page      int `json:"page"`
	Limit     int `json:"limit"`
	PrevPage  int `json:"prevPage"`
	NextPage  int `json:"nextPage"`
	Count     int `json:"count"`
	TotalPage int `json:"totalPage"`
}

func (p *pagination) paginate() *pagingResult {
	page, _ := strconv.Atoi(p.ctx.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(p.ctx.DefaultQuery("limit", "12"))

	if page <= 0 {
		page = 1
	}
	if limit <= 0 {
		limit = 12
	}

	offset := (page - 1) * limit

	// Create a session for counting to avoid affecting the main query
	var totalCount int64
	countQuery := p.query.Session(&gorm.Session{})
	countQuery.Model(p.records).Count(&totalCount)

	// Execute the main query with pagination
	p.query.Offset(offset).Limit(limit).Find(p.records)

	totalPage := int((totalCount + int64(limit) - 1) / int64(limit))

	var prevPage, nextPage int
	if page > 1 {
		prevPage = page - 1
	}
	if page < totalPage {
		nextPage = page + 1
	}

	return &pagingResult{
		Page:      page,
		Limit:     limit,
		PrevPage:  prevPage,
		NextPage:  nextPage,
		Count:     int(totalCount),
		TotalPage: totalPage,
	}
}
