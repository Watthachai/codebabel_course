# Model-View-Controller (MVC) Pattern in Go API Development

การออกแบบโครงสร้าง API ตามหลักการของสถาปัตยกรรมแบบ MVC พร้อมแนวทางปฏิบัติที่ดีสำหรับ Go เวอร์ชันล่าสุด

## 📝 บทนำ

เมื่อโปรเจค API ของเราเริ่มใหญ่ขึ้น โค้ดใน `main.go` จะกลายเป็นไฟล์ยักษ์ที่เต็มไปด้วยโค้ดต่างๆ มากมาย ซึ่งทำให้การ maintain และ debug ทำได้ยากขึ้น การแก้ไขปัญหานี้ เราจะใช้สถาปัตยกรรม **MVC (Model-View-Controller)** มาช่วย

## 🏗️ MVC Architecture คืออะไร?

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │   Router    │    │ Controller  │
│  (Browser)  │◄──►│ (gin/fiber) │◄──►│  (Logic)    │
└─────────────┘    └─────────────┘    └─────────────┘
                        │
                        ▼
              ┌─────────────┐    ┌─────────────┐
              │    View     │◄──►│    Model    │
              │ (Response)  │    │   (Data)    │
              └─────────────┘    └─────────────┘
```

### องค์ประกอบหลัก 3 ส่วน:

1. **Model** 📊 - จัดการข้อมูลและ business logic
2. **View** 👁️ - จัดการการแสดงผล (JSON response)
3. **Controller** 🎮 - ประสานงานระหว่าง Model และ View

## 🚀 การปรับโครงสร้างโปรเจค

### โครงสร้างไฟล์เดิม (ก่อนปรับปรุง)

```
project/
├── main.go          // ทุกอย่างอยู่ในไฟล์เดียว 😵
└── go.mod
```

### โครงสร้างไฟล์ใหม่ (หลังปรับปรุง)

```
project/
├── main.go          // เฉพาะ router และ server setup
├── models/
│   └── article.go   // Article struct และ data logic
├── controllers/
│   └── article.go   // Article handlers และ business logic
├── views/           // (Optional สำหรับ template)
└── go.mod
```

## 📋 ขั้นตอนการ Refactor

### Step 1: สร้าง Model Package

สร้างโฟลเดอร์ `models/` และไฟล์ `article.go`

```go
// models/article.go
package models

import "time"

// Article struct สำหรับเก็บข้อมูลบทความ
type Article struct {
  ID          int       `json:"id"`
  Title       string    `json:"title"`
  Content     string    `json:"content"`
  Author      string    `json:"author"`
  PublishedAt time.Time `json:"published_at"`
  CreatedAt   time.Time `json:"created_at"`
  UpdatedAt   time.Time `json:"updated_at"`
}

// Articles เป็น slice สำหรับเก็บข้อมูลหลายๆ บทความ
type Articles []Article

// ตัวอย่างข้อมูล mock data
var ArticleData = Articles{
  {
    ID:          1,
    Title:       "Introduction to Go",
    Content:     "Go เป็นภาษาโปรแกรมมิ่งที่พัฒนาโดย Google...",
    Author:      "John Doe",
    PublishedAt: time.Now().AddDate(0, 0, -7),
    CreatedAt:   time.Now().AddDate(0, 0, -7),
    UpdatedAt:   time.Now().AddDate(0, 0, -1),
  },
  // เพิ่มข้อมูลอื่นๆ...
}

// GetAll ดึงข้อมูลบทความทั้งหมด
func (a Articles) GetAll() Articles {
  return a
}

// GetByID ดึงข้อมูลบทความโดย ID
func (a Articles) GetByID(id int) (*Article, error) {
  for _, article := range a {
    if article.ID == id {
      return &article, nil
    }
  }
  return nil, errors.New("article not found")
}

// Add เพิ่มบทความใหม่
func (a *Articles) Add(article Article) {
  article.ID = len(*a) + 1
  article.CreatedAt = time.Now()
  article.UpdatedAt = time.Now()
  *a = append(*a, article)
}
```

### Step 2: สร้าง Controller Package

สร้างโฟลเดอร์ `controllers/` และไฟล์ `article.go`

```go
// controllers/article.go
package controllers

import (
  "net/http"
  "strconv"

  "github.com/gin-gonic/gin"
  "your-project/models"
)

// ArticleController struct สำหรับจัดการ article endpoints
type ArticleController struct {
  articleData *models.Articles
}

// NewArticleController สร้าง controller instance ใหม่
func NewArticleController() *ArticleController {
  return &ArticleController{
    articleData: &models.ArticleData,
  }
}

// GetAll handler สำหรับดึงข้อมูลบทความทั้งหมด
// GET /articles
func (ac *ArticleController) GetAll(c *gin.Context) {
  articles := ac.articleData.GetAll()

  c.JSON(http.StatusOK, gin.H{
    "status": "success",
    "data":   articles,
    "count":  len(articles),
  })
}

// GetByID handler สำหรับดึงข้อมูลบทความตาม ID
// GET /articles/:id
func (ac *ArticleController) GetByID(c *gin.Context) {
  idParam := c.Param("id")
  id, err := strconv.Atoi(idParam)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{
      "status":  "error",
      "message": "Invalid article ID",
    })
    return
  }

  article, err := ac.articleData.GetByID(id)
  if err != nil {
    c.JSON(http.StatusNotFound, gin.H{
      "status":  "error",
      "message": "Article not found",
    })
    return
  }

  c.JSON(http.StatusOK, gin.H{
    "status": "success",
    "data":   article,
  })
}

// Create handler สำหรับสร้างบทความใหม่
// POST /articles
func (ac *ArticleController) Create(c *gin.Context) {
  var newArticle models.Article

  // Bind JSON request body to struct
  if err := c.ShouldBindJSON(&newArticle); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{
      "status":  "error",
      "message": "Invalid request body",
      "error":   err.Error(),
    })
    return
  }

  // Validate required fields
  if newArticle.Title == "" || newArticle.Content == "" {
    c.JSON(http.StatusBadRequest, gin.H{
      "status":  "error",
      "message": "Title and content are required",
    })
    return
  }

  // Add to data store
  ac.articleData.Add(newArticle)

  c.JSON(http.StatusCreated, gin.H{
    "status":  "success",
    "message": "Article created successfully",
    "data":    newArticle,
  })
}
```

### Step 3: ปรับปรุง main.go

```go
// main.go
package main

import (
  "log"

  "github.com/gin-gonic/gin"
  "your-project/controllers"
)

func main() {
  // สร้าง Gin router
  r := gin.Default()

  // เพิ่ม middleware
  r.Use(gin.Logger())
  r.Use(gin.Recovery())

  // สร้าง controller instances
  articleController := controllers.NewArticleController()

  // กำหนด API routes แบบจัดกลุ่ม
  api := r.Group("/api/v1")
  {
    articles := api.Group("/articles")
    {
      articles.GET("", articleController.GetAll)      // GET /api/v1/articles
      articles.GET("/:id", articleController.GetByID) // GET /api/v1/articles/:id
      articles.POST("", articleController.Create)     // POST /api/v1/articles
    }
  }

  // Health check endpoint
  r.GET("/health", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "status":  "ok",
      "message": "Server is running",
    })
  })

  // Start server
  log.Println("Server starting on port 8080...")
  if err := r.Run(":8080"); err != nil {
    log.Fatal("Failed to start server:", err)
  }
}
```

## 🔧 การปรับปรุงเพิ่มเติมสำหรับ Go เวอร์ชันล่าสุด (2025)

### 1. ใช้ Context กับ Timeout

```go
// controllers/article.go
func (ac *ArticleController) GetAll(c *gin.Context) {
  // เพิ่ม context timeout สำหรับ operations ที่ใช้เวลานาน
  ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
  defer cancel()

  // ใช้ ctx ในการเรียก database หรือ external services
  articles := ac.articleData.GetAll()

  c.JSON(http.StatusOK, gin.H{
    "status": "success",
    "data":   articles,
  })
}
```

### 2. เพิ่ม Error Handling และ Validation

```go
// models/article.go
import "github.com/go-playground/validator/v10"

type Article struct {
  ID      int    `json:"id"`
  Title   string `json:"title" validate:"required,min=1,max=200"`
  Content string `json:"content" validate:"required,min=10"`
  Author  string `json:"author" validate:"required"`
}

var validate = validator.New()

func (a *Article) Validate() error {
  return validate.Struct(a)
}
```

### 3. เพิ่ม Middleware สำหรับ CORS และ Security

```go
// main.go
import "github.com/gin-contrib/cors"

func main() {
  r := gin.Default()

  // CORS middleware
  r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000"},
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
    AllowHeaders:     []string{"Content-Type", "Authorization"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
  }))

  // Rate limiting (ถ้าใช้ gin-limiter)
  // r.Use(limiter.Middleware())
}
```

### 4. Environment Configuration

```go
// config/config.go
package config

import (
  "os"
  "strconv"
)

type Config struct {
  Port        string
  Environment string
  LogLevel    string
}

func LoadConfig() *Config {
  return &Config{
    Port:        getEnv("PORT", "8080"),
    Environment: getEnv("ENVIRONMENT", "development"),
    LogLevel:    getEnv("LOG_LEVEL", "info"),
  }
}

func getEnv(key, defaultValue string) string {
  if value := os.Getenv(key); value != "" {
    return value
  }
  return defaultValue
}
```

## 🧪 การทดสอบ API

### ทดสอบด้วย curl:

```bash
# ดึงข้อมูลทั้งหมด
curl -X GET http://localhost:8080/api/v1/articles

# ดึงข้อมูลบทความ ID 1
curl -X GET http://localhost:8080/api/v1/articles/1

# สร้างบทความใหม่
curl -X POST http://localhost:8080/api/v1/articles \
  -H "Content-Type: application/json" \
  -d '{
  "title": "New Article",
  "content": "This is a new article content",
  "author": "Jane Doe"
  }'
```

## 🎯 ประโยชน์ของ MVC Pattern

| ข้อดี                      | อธิบาย                             |
| -------------------------- | ---------------------------------- |
| **Separation of Concerns** | แยกหน้าที่การทำงานอย่างชัดเจน      |
| **Maintainable**           | ง่ายต่อการแก้ไขและเพิ่มฟีเจอร์     |
| **Testable**               | สามารถเขียน unit test แต่ละส่วนได้ |
| **Reusable**               | Controller และ Model ใช้ซ้ำได้     |
| **Scalable**               | รองรับการขยายโปรเจคในอนาคต         |

## 📊 การปรับปรุงเพิ่มเติม

### เพิ่ม Interface สำหรับ Repository Pattern

```go
// repositories/article_repository.go
package repositories

import "your-project/models"

type ArticleRepository interface {
  GetAll() ([]models.Article, error)
  GetByID(id int) (*models.Article, error)
  Create(article models.Article) error
  Update(id int, article models.Article) error
  Delete(id int) error
}

type InMemoryArticleRepository struct {
  data []models.Article
}

func NewInMemoryArticleRepository() ArticleRepository {
  return &InMemoryArticleRepository{
    data: make([]models.Article, 0),
  }
}

func (r *InMemoryArticleRepository) GetAll() ([]models.Article, error) {
  return r.data, nil
}

// Implement other methods...
```

### เพิ่ม Service Layer

```go
// services/article_service.go
package services

import (
  "your-project/models"
  "your-project/repositories"
)

type ArticleService struct {
  repo repositories.ArticleRepository
}

func NewArticleService(repo repositories.ArticleRepository) *ArticleService {
  return &ArticleService{repo: repo}
}

func (s *ArticleService) GetAllArticles() ([]models.Article, error) {
  return s.repo.GetAll()
}

func (s *ArticleService) CreateArticle(article models.Article) error {
  if err := article.Validate(); err != nil {
    return err
  }
  return s.repo.Create(article)
}
```

## 🔍 Best Practices สำหรับ Go API Development

1. **ใช้ interfaces** สำหรับ dependency injection
2. **Error handling** ที่สม่ำเสมอ
3. **Logging และ monitoring**
4. **API versioning** (/api/v1, /api/v2)
5. **Input validation และ sanitization**
6. **Rate limiting และ security middleware**
7. **Database connection pooling**
8. **Graceful shutdown**

การปรับโครงสร้างแบบ MVC ทำให้โค้ดของเราอ่านง่าย maintain ง่าย และพร้อมสำหรับการพัฒนาต่อยอดในอนาคต! 🚀
