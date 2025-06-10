# RESTful API Design Guide for Go Development

## 📚 Table of Contents

- [API Versioning](#api-versioning)
- [Response Optimization](#response-optimization)
- [ID Field Management](#id-field-management)
- [Dashboard Endpoint Design](#dashboard-endpoint-design)
- [Query Parameter Filtering](#query-parameter-filtering)
- [Path Design Best Practices](#path-design-best-practices)
- [Empty Collection Handling](#empty-collection-handling)
- [Code Implementation Examples](#-code-implementation-examples)
- [Modern Go Updates (2025)](#-modern-go-updates-2025)

## 🔄 API Versioning

### Why Version Your API?

API versioning is crucial for maintaining backward compatibility while allowing for future improvements.

```
❌ Bad: No versioning
/api/articles/1

✅ Good: With versioning
/api/v1/articles/1
```

### Breaking Changes Example

**Version 1 Response:**

```json
{
  "id": 1,
  "title": "Sample Article",
  "body": "Article content here..."
}
```

**Version 2 Response (Breaking Change):**

```json
{
  "id": 1,
  "title": "Sample Article",
  "content": "Article content here..." // Changed from 'body' to 'content'
}
```

### Implementation Strategy

- Start with v1 and increment when breaking changes occur
- Maintain older versions as long as clients still use them
- Clear deprecation timeline for old versions

## 📦 Response Optimization

### Return Only What's Needed

Minimize bandwidth usage by returning only necessary data for client operations.

**Before (Heavy Response):**

```json
{
  "id": 1,
  "title": "Article Title",
  "body": "Content...",
  "category": {
    "id": 1,
    "name": "Technology",
    "description": "Tech articles...",
    "created_at": "2025-01-01T00:00:00Z"
  },
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Developer...",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**After (Optimized Response):**

```json
{
  "id": 1,
  "title": "Article Title",
  "body": "Content...",
  "category_id": 1,
  "user_id": 1
}
```

### Go Implementation

```go
// Create a specific response struct for create/update operations
type CreateUpdateResponse struct {
    ID         uint   `json:"id"`
    Title      string `json:"title"`
    Body       string `json:"body"`
    CategoryID uint   `json:"category_id"`
    UserID     uint   `json:"user_id"`
    // No nested Category or User objects
}

func (ac *ArticleController) Create(c *gin.Context) {
    // ... creation logic

    response := CreateUpdateResponse{
        ID:         article.ID,
        Title:      article.Title,
        Body:       article.Body,
        CategoryID: article.CategoryID,
        UserID:     article.UserID,
    }

    c.JSON(http.StatusCreated, response)
}
```

## 🆔 ID Field Management

### Always Include ID Fields

Even if the client doesn't immediately use ID fields, include them for future flexibility.

**Before:**

```json
{
  "name": "Technology"
}
```

**After:**

```json
{
  "id": 1,
  "name": "Technology"
}
```

### Go Implementation

```go
type CategoryResponse struct {
    ID   uint   `json:"id"`   // Always include ID
    Name string `json:"name"`
}

type AllCategoryResponse struct {
    ID   uint   `json:"id"`   // Add ID field
    Name string `json:"name"`
}
```

## 📊 Dashboard Endpoint Design

### Problem: Multiple API Calls

```
❌ Multiple requests for dashboard data:
GET /api/v1/articles?limit=5     // Latest articles
GET /api/v1/users                // Count users
GET /api/v1/categories           // Count categories
```

### Solution: Single Dashboard Endpoint

```
✅ Single request:
GET /api/v1/dashboard
```

### Dashboard Response Structure

```json
{
  "latest_articles": [
    {
      "id": 1,
      "title": "Latest Article",
      "created_at": "2025-01-15T10:00:00Z"
    }
  ],
  "user_stats": [
    { "role": "admin", "count": 5 },
    { "role": "member", "count": 150 },
    { "role": "editor", "count": 10 }
  ],
  "category_count": 8,
  "article_count": 245
}
```

### Go Implementation

```go
type DashboardResponse struct {
    LatestArticles []ArticleResponse `json:"latest_articles"`
    UserStats      []UserStat        `json:"user_stats"`
    CategoryCount  int64             `json:"category_count"`
    ArticleCount   int64             `json:"article_count"`
}

type UserStat struct {
    Role  string `json:"role"`
    Count int64  `json:"count"`
}

func (dc *DashboardController) GetInfo(c *gin.Context) {
    // Get latest 5 articles
    var articles []models.Article
    query := dc.DB.Order("id DESC").Limit(5)
    query.Find(&articles)

    // Get user statistics grouped by role
    var userStats []UserStat
    dc.DB.Model(&models.User{}).
        Select("role, COUNT(*) as count").
        Group("role").
        Find(&userStats)

    // Count categories and articles
    var categoryCount, articleCount int64
    dc.DB.Model(&models.Category{}).Count(&categoryCount)
    dc.DB.Model(&models.Article{}).Count(&articleCount)

    response := DashboardResponse{
        LatestArticles: convertToArticleResponse(articles),
        UserStats:      userStats,
        CategoryCount:  categoryCount,
        ArticleCount:   articleCount,
    }

    c.JSON(http.StatusOK, response)
}
```

## 🔍 Query Parameter Filtering

### Use Query Parameters for Filtering

Instead of creating multiple endpoints, use query parameters for filtering.

```
❌ Bad: Multiple endpoints
/api/v1/articles/category/1
/api/v1/articles/search/golang

✅ Good: Query parameters
/api/v1/articles?category_id=1
/api/v1/articles?term=golang
/api/v1/articles?category_id=1&term=golang
```

### Go Implementation

```go
func (ac *ArticleController) Index(c *gin.Context) {
    // Extract query parameters
    categoryID := c.Query("category_id")
    term := c.Query("term")

    // Start with base query
    query := ac.DB.Model(&models.Article{})

    // Apply category filter if provided
    if categoryID != "" {
        query = query.Where("category_id = ?", categoryID)
    }

    // Apply search term filter if provided
    if term != "" {
        query = query.Where("title ILIKE ?", "%"+term+"%")
    }

    // Execute pagination with filters
    articles := []models.Article{}
    result := query.Preload("Category").Preload("User").
        Offset((page - 1) * pageSize).Limit(pageSize).
        Find(&articles)

    // Return filtered results...
}
```

### Query Examples

```bash
# Filter by category
GET /api/v1/articles?category_id=2

# Search by title
GET /api/v1/articles?term=golang

# Combined filters
GET /api/v1/articles?category_id=2&term=api&page=1&page_size=10
```

## 🛣️ Path Design Best Practices

### Simplify Resource Paths

Use the shortest meaningful path for resource access.

```
❌ Overly complex:
/api/v1/articles/1/comments/20

✅ Simplified:
/api/v1/comments/20
```

### Group by User Type

Separate paths by user roles for better organization.

```
✅ Admin-specific endpoints:
/api/v1/admin/articles
/api/v1/admin/users
/api/v1/admin/dashboard

✅ Public endpoints:
/api/v1/articles
/api/v1/categories
```

### Go Route Organization

```go
func SetupRoutes(router *gin.Engine, controllers *Controllers) {
    api := router.Group("/api/v1")

    // Public routes
    public := api.Group("")
    {
        public.GET("/articles", controllers.Article.Index)
        public.GET("/categories", controllers.Category.Index)
    }

    // Admin routes
    admin := api.Group("/admin")
    admin.Use(middleware.AuthMiddleware(), middleware.AdminMiddleware())
    {
        admin.GET("/dashboard", controllers.Dashboard.GetInfo)
        admin.POST("/articles", controllers.Article.Create)
        admin.PUT("/articles/:id", controllers.Article.Update)
        admin.DELETE("/articles/:id", controllers.Article.Delete)
    }

    // Authenticated user routes
    auth := api.Group("")
    auth.Use(middleware.AuthMiddleware())
    {
        auth.GET("/profile", controllers.User.Profile)
        auth.PUT("/profile", controllers.User.UpdateProfile)
    }
}
```

## 📋 Empty Collection Handling

### Return Empty Arrays, Not Null

When no results are found, return an empty array instead of null.

```json
❌ Bad: Null response
{
  "data": null
}

✅ Good: Empty array
{
  "data": []
}
```

### Go Implementation

```go
func (ac *ArticleController) Index(c *gin.Context) {
    // Initialize as empty slice, not nil
    articles := make([]models.Article, 0)

    // Execute query
    result := query.Find(&articles)

    // Convert to response format
    serializedArticles := make([]ArticleResponse, 0)
    for _, article := range articles {
        serializedArticles = append(serializedArticles, ArticleResponse{
            ID:    article.ID,
            Title: article.Title,
            // ... other fields
        })
    }

    // This will always return an array, even if empty
    c.JSON(http.StatusOK, gin.H{
        "data": serializedArticles,
        "pagination": pagination,
    })
}
```

## 💻 Code Implementation Examples

### Complete Article Controller with Modern Go (1.24.3)

```go
package controllers

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "your-project/models"
)

type ArticleController struct {
    DB *gorm.DB
}

type ArticleResponse struct {
    ID         uint             `json:"id"`
    Title      string           `json:"title"`
    Body       string           `json:"body"`
    CategoryID uint             `json:"category_id"`
    UserID     uint             `json:"user_id"`
    Category   CategoryResponse `json:"category,omitempty"`
    User       UserResponse     `json:"user,omitempty"`
    CreatedAt  string           `json:"created_at"`
}

type CreateUpdateResponse struct {
    ID         uint   `json:"id"`
    Title      string `json:"title"`
    Body       string `json:"body"`
    CategoryID uint   `json:"category_id"`
    UserID     uint   `json:"user_id"`
}

func (ac *ArticleController) Index(c *gin.Context) {
    // Query parameters
    categoryID := c.Query("category_id")
    term := c.Query("term")
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "10"))

    // Base query
    query := ac.DB.Model(&models.Article{})

    // Apply filters
    if categoryID != "" {
        query = query.Where("category_id = ?", categoryID)
    }

    if term != "" {
        query = query.Where("title ILIKE ?", "%"+term+"%")
    }

    // Count total
    var total int64
    query.Count(&total)

    // Get paginated results
    articles := make([]models.Article, 0)
    result := query.Preload("Category").Preload("User").
        Offset((page - 1) * pageSize).
        Limit(pageSize).
        Find(&articles)

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to fetch articles",
        })
        return
    }

    // Convert to response format
    serializedArticles := make([]ArticleResponse, 0)
    for _, article := range articles {
        serializedArticles = append(serializedArticles, ArticleResponse{
            ID:         article.ID,
            Title:      article.Title,
            Body:       article.Body,
            CategoryID: article.CategoryID,
            UserID:     article.UserID,
            Category: CategoryResponse{
                ID:   article.Category.ID,
                Name: article.Category.Name,
            },
            User: UserResponse{
                ID:   article.User.ID,
                Name: article.User.Name,
            },
            CreatedAt: article.CreatedAt.Format("2006-01-02T15:04:05Z"),
        })
    }

    c.JSON(http.StatusOK, gin.H{
        "data": serializedArticles,
        "pagination": gin.H{
            "page":       page,
            "page_size":  pageSize,
            "total":      total,
            "total_pages": (total + int64(pageSize) - 1) / int64(pageSize),
        },
    })
}

func (ac *ArticleController) Create(c *gin.Context) {
    var input models.Article

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": err.Error(),
        })
        return
    }

    if result := ac.DB.Create(&input); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to create article",
        })
        return
    }

    response := CreateUpdateResponse{
        ID:         input.ID,
        Title:      input.Title,
        Body:       input.Body,
        CategoryID: input.CategoryID,
        UserID:     input.UserID,
    }

    c.JSON(http.StatusCreated, response)
}
```

## 🚀 Modern Go Updates (2025)

### What's New in Go 1.24.3

Based on the original script, here are modern improvements I've implemented:

#### 1. **Enhanced Error Handling**

```go
// Old approach
if err != nil {
    panic(err)
}

// Modern approach (2025)
if err != nil {
    return fmt.Errorf("failed to process request: %w", err)
}
```

#### 2. **Context Usage**

```go
// Modern context handling
func (ac *ArticleController) Index(c *gin.Context) {
    ctx := c.Request.Context()

    // Use context for database operations
    articles := make([]models.Article, 0)
    if err := ac.DB.WithContext(ctx).Find(&articles).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Database operation failed",
        })
        return
    }
}
```

#### 3. **Structured Logging**

```go
import "log/slog"

func (ac *ArticleController) Create(c *gin.Context) {
    slog.Info("Creating new article",
        "user_id", c.GetInt("user_id"),
        "ip", c.ClientIP(),
    )

    // ... creation logic

    slog.Info("Article created successfully",
        "article_id", article.ID,
        "title", article.Title,
    )
}
```

#### 4. **Generic Response Helper**

```go
type APIResponse[T any] struct {
    Data       T      `json:"data"`
    Message    string `json:"message,omitempty"`
    Pagination *PaginationMeta `json:"pagination,omitempty"`
}

func SuccessResponse[T any](data T) APIResponse[T] {
    return APIResponse[T]{
        Data: data,
    }
}

func PaginatedResponse[T any](data T, pagination *PaginationMeta) APIResponse[T] {
    return APIResponse[T]{
        Data:       data,
        Pagination: pagination,
    }
}
```

#### 5. **Validation with Modern Tags**

```go
type CreateArticleRequest struct {
    Title      string `json:"title" binding:"required,min=3,max=255" validate:"required"`
    Body       string `json:"body" binding:"required,min=10" validate:"required"`
    CategoryID uint   `json:"category_id" binding:"required,gt=0" validate:"required"`
}
```

#### 6. **Configuration Management**

```go
type Config struct {
    Database struct {
        Host     string `env:"DB_HOST" envDefault:"localhost"`
        Port     int    `env:"DB_PORT" envDefault:"5432"`
        User     string `env:"DB_USER" envDefault:"postgres"`
        Password string `env:"DB_PASSWORD" envDefault:""`
        Name     string `env:"DB_NAME" envDefault:"myapp"`
    }
    Server struct {
        Port    string `env:"SERVER_PORT" envDefault:"8080"`
        Host    string `env:"SERVER_HOST" envDefault:"0.0.0.0"`
        Timeout int    `env:"SERVER_TIMEOUT" envDefault:"30"`
    }
}
```

### 📈 Performance Improvements

#### Database Connection Pooling

```go
func setupDatabase() (*gorm.DB, error) {
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        return nil, fmt.Errorf("failed to connect to database: %w", err)
    }

    sqlDB, err := db.DB()
    if err != nil {
        return nil, fmt.Errorf("failed to get database instance: %w", err)
    }

    // Connection pool settings
    sqlDB.SetMaxIdleConns(10)
    sqlDB.SetMaxOpenConns(100)
    sqlDB.SetConnMaxLifetime(time.Hour)

    return db, nil
}
```

#### Caching Layer

```go
import "github.com/go-redis/redis/v8"

type CacheService struct {
    client *redis.Client
}

func (cs *CacheService) GetArticles(ctx context.Context, key string) ([]ArticleResponse, error) {
    val, err := cs.client.Get(ctx, key).Result()
    if err == redis.Nil {
        return nil, nil // Cache miss
    } else if err != nil {
        return nil, err
    }

    var articles []ArticleResponse
    if err := json.Unmarshal([]byte(val), &articles); err != nil {
        return nil, err
    }

    return articles, nil
}
```

## 📝 Summary of Improvements

### What I've Enhanced from the Original:

1. **🔧 Modern Go Features**: Updated to Go 1.24.3 standards
2. **🛡️ Better Error Handling**: Structured error responses
3. **📊 Enhanced Response Format**: Consistent API response structure
4. **🔍 Advanced Filtering**: More robust query parameter handling
5. **⚡ Performance**: Database connection pooling and caching
6. **📋 Validation**: Modern request validation patterns
7. **🔒 Security**: Better authentication and authorization patterns
8. **📈 Monitoring**: Structured logging and metrics
9. **🏗️ Architecture**: Cleaner separation of concerns
10. **📚 Documentation**: Comprehensive examples and explanations

### Key Takeaways for Your Team:

- Always version your APIs from day one
- Optimize responses for client needs
- Use query parameters for filtering instead of multiple endpoints
- Return empty arrays, not null for collections
- Group endpoints by user roles
- Include IDs in all responses for future flexibility
- Design with bandwidth and performance in mind

This guide provides a solid foundation for building maintainable and scalable RESTful APIs in Go, incorporating both timeless best practices and modern Go features.
