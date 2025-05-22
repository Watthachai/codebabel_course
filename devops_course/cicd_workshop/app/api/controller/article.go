package controller

import (
	"context"
	"encoding/json"

	"github.com/babelcoder-dummy/intro-devops/api/config"
	"github.com/babelcoder-dummy/intro-devops/api/dto"
	"github.com/babelcoder-dummy/intro-devops/api/model"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type Article struct {
}

func (a *Article) FindAll(c *fiber.Ctx) error {
	data := config.DB.HGetAll(context.Background(), "articles").Val()
	var articles []model.Article

	for _, v := range data {
		var article model.Article
		json.Unmarshal([]byte(v), &article)
		articles = append(articles, article)
	}

	return c.JSON(articles)
}

func (a *Article) Create(c *fiber.Ctx) error {
	form := new(dto.CreateArticle)

	if err := c.BodyParser(form); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	id := uuid.NewString()
	data := model.Article{
		ID:      id,
		Title:   form.Title,
		Content: form.Content,
	}
	article, _ := json.Marshal(data)
	if err := config.DB.HSet(context.Background(), "articles", id, article).Err(); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(data)
}
