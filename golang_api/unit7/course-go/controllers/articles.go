package controllers

import (
	"course-go/models"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

type Articles struct {
	DB *gorm.DB
}

type createArticleForm struct {
	Title   string                `form:"title" binding:"required"`
	Body    string                `form:"body" binding:"required"`
	Excerpt string                `form:"excerpt" binding:"required"`
	Image   *multipart.FileHeader `form:"image"`
}

type articleResponse struct {
	ID      uint   `json:"id"`
	Title   string `json:"title"`
	Excerpt string `json:"excerpt"`
	Body    string `json:"body"`
	Image   string `json:"image"`
}

type articlesPaging struct {
	Items  []articleResponse `json:"items"`
	Paging *pagingResult     `json:"paging"`
}

func (a *Articles) FindAll(ctx *gin.Context) {
	var articles []models.Article

	paging := pagingResource(ctx, a.DB, &articles)

	var serializedArticle []articleResponse
	copier.Copy(&serializedArticle, &articles)
	ctx.JSON(http.StatusOK, gin.H{"articles": articlesPaging{Items: serializedArticle, Paging: paging}})
}

func (a *Articles) FindOne(ctx *gin.Context) {
	article, err := a.FindArticleByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})

		return
	}

	serializedArticle := articleResponse{}
	copier.Copy(&serializedArticle, &article)
	ctx.JSON(http.StatusOK, gin.H{"article": serializedArticle})
}

func (a *Articles) Create(ctx *gin.Context) {
	// Debug: Print headers and form data
	fmt.Printf("Content-Type: %s\n", ctx.GetHeader("Content-Type"))
	fmt.Printf("Request Method: %s\n", ctx.Request.Method)

	var form createArticleForm
	if err := ctx.ShouldBind(&form); err != nil {
		fmt.Printf("Binding Error: %v\n", err)
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"error":        err.Error(),
			"content_type": ctx.GetHeader("Content-Type"),
		})
		return
	}

	fmt.Printf("Form data - Title: %s, Body: %s, Excerpt: %s\n", form.Title, form.Body, form.Excerpt)
	if form.Image != nil {
		fmt.Printf("Image filename: %s\n", form.Image.Filename)
	}

	var article models.Article
	copier.Copy(&article, &form)

	if err := a.DB.Create(&article).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	a.setArticleImage(ctx, &article)
	serializedArticle := articleResponse{}
	copier.Copy(&serializedArticle, &article)

	ctx.JSON(http.StatusCreated, gin.H{"article": serializedArticle})
}

func (a *Articles) setArticleImage(ctx *gin.Context, article *models.Article) error {
	file, err := ctx.FormFile("image")
	if err != nil || file == nil {
		return err
	}

	if article.Image != "" {
		article.Image = strings.Replace(article.Image, os.Getenv("HOST"), "", 1)
		pwd, _ := os.Getwd()
		os.Remove(pwd + article.Image)
	}

	path := "uploads/articles/" + strconv.Itoa(int(article.ID))
	os.MkdirAll(path, 0755)
	filename := path + "/" + file.Filename
	if err := ctx.SaveUploadedFile(file, filename); err != nil {
		return err
	}

	article.Image = os.Getenv("HOST") + "/" + filename
	a.DB.Save(article)

	return nil
}

func (a *Articles) FindArticleByID(ctx *gin.Context) (*models.Article, error) {
	var article models.Article
	id := ctx.Param("id")

	if err := a.DB.First(&article, id).Error; err != nil {
		return nil, err
	}
	return &article, nil

}
