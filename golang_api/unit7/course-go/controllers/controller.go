package controllers

import (
	"math"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type pagingResult struct {
	Page      int `json:"page"`
	Limit     int `json:"limit"`
	PrevPage  int `json:"prevpage"`
	NextPage  int `json:"nextpage"`
	Count     int `json:"count"`
	TotalPage int `json:"totalPage"`
}

type pagination struct {
	ctx     *gin.Context
	query   *gorm.DB
	records interface{}
}

func (p *pagination) paginate() *pagingResult {
	//1. get limit, page ?limit10&page=2

	page, _ := strconv.Atoi(p.ctx.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(p.ctx.DefaultQuery("limit", "12"))

	//2. count records
	ch := make(chan int)
	go p.countRecords(ch)

	//3. Find Records
	//limit, offset
	offset := (page - 1) * limit
	p.query.Limit((limit)).Offset(offset).Find(p.records)

	//4. total page
	count := <-ch
	totalPage := math.Ceil(float64(count) / float64(limit))

	//5. Find nextPage
	var nextPage int
	if page == int(totalPage) {
		nextPage = int(totalPage)
		nextPage = page - 1
	}

	//6. create pagingResult

	return &pagingResult{
		Page:      page,
		Limit:     limit,
		Count:     int(count),
		PrevPage:  page - 1,
		NextPage:  nextPage,
		TotalPage: int(totalPage),
	}
}

func (p *pagination) countRecords(ch chan int) {
	var count int64
	p.query.Model(p.records).Count(&count)

	ch <- int(count)
}
