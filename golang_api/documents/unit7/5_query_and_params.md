# Query Parameters และ Path Parameters ใน Gin Framework

เรียนรู้การจัดการ Query String และ Path Parameters ใน Gin Framework สำหรับการสร้าง REST API ที่มีประสิทธิภาพ

## 📋 สารบัญ

- [Query Parameters](#query-parameters)
- [Path Parameters](#path-parameters)
- [ตัวอย่างการใช้งานจริง](#ตัวอย่างการใช้งานจริง)
- [Best Practices](#best-practices)
- [การปรับปรุงโค้ดให้ทันสมัย](#การปรับปรุงโค้ดให้ทันสมัย)

## 🔍 Query Parameters

Query Parameters คือข้อมูลที่ส่งผ่าน URL หลังเครื่องหมาย `?` เช่น `?limit=3&page=1`

### การดึงข้อมูลจาก Query String

```go
func getArticles(c *gin.Context) {
  // ดึงค่า limit จาก query string
  limitStr := c.Query("limit")

  // ตั้งค่าเริ่มต้น
  results := articles

  // ตรวจสอบว่ามีการส่ง limit เข้ามาหรือไม่
  if limitStr != "" {
    // แปลง string เป็น int (ใหม่: ใช้ strconv.Atoi)
    limit, err := strconv.Atoi(limitStr)
    if err != nil {
      c.JSON(http.StatusBadRequest, gin.H{
        "error": "Invalid limit parameter",
      })
      return
    }

    // ตรวจสอบขอบเขตของ limit
    if limit > 0 && limit <= len(articles) {
      results = articles[:limit]
    }
  }

  c.JSON(http.StatusOK, gin.H{
    "articles": results,
    "total":    len(results),
  })
}
```

### 📊 Visualization: Query Parameters Flow

```
Request: GET /api/v1/articles?limit=3&category=tech

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client        │───▶│   Gin Router     │───▶│   Handler       │
│                 │    │                  │    │                 │
│ ?limit=3        │    │ c.Query("limit") │    │ Process & Filter│
│ &category=tech  │    │ c.Query("category")   │ Return JSON     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### ตัวอย่างการใช้ Query Parameters ขั้นสูง

```go
func getArticlesAdvanced(c *gin.Context) {
  // ดึงหลาย query parameters พร้อมกัน
  limitStr := c.DefaultQuery("limit", "10")  // ค่าเริ่มต้น 10
  pageStr := c.DefaultQuery("page", "1")     // ค่าเริ่มต้น 1
  category := c.Query("category")            // optional
  search := c.Query("search")               // optional

  // แปลงค่า string เป็น int
  limit, err := strconv.Atoi(limitStr)
  if err != nil || limit <= 0 {
    limit = 10 // fallback
  }

  page, err := strconv.Atoi(pageStr)
  if err != nil || page <= 0 {
    page = 1 // fallback
  }

  // Filter และ Pagination
  filtered := filterArticles(articles, category, search)
  total := len(filtered)

  // คำนวณ offset สำหรับ pagination
  offset := (page - 1) * limit
  if offset >= total {
    offset = 0
    page = 1
  }

  end := offset + limit
  if end > total {
    end = total
  }

  result := filtered[offset:end]

  c.JSON(http.StatusOK, gin.H{
    "articles": result,
    "pagination": gin.H{
      "page":       page,
      "limit":      limit,
      "total":      total,
      "totalPages": (total + limit - 1) / limit,
    },
  })
}
```

## 🛣️ Path Parameters

Path Parameters คือส่วนหนึ่งของ URL path ที่ใช้ระบุข้อมูลเฉพาะ เช่น `/articles/123` โดย `123` คือ ID

### การกำหนด Route และดึงข้อมูล

```go
// กำหนด route ใน main function
func setupRoutes() *gin.Engine {
  r := gin.Default()

  api := r.Group("/api/v1")
  {
    api.GET("/articles", getArticles)
    api.GET("/articles/:id", getArticleByID) // :id คือ path parameter
  }

  return r
}

// Handler สำหรับดึงข้อมูล article ตาม ID
func getArticleByID(c *gin.Context) {
  // ดึงค่า ID จาก path parameter
  idStr := c.Param("id")

  // แปลง string เป็น uint (ปรับปรุง: ใช้ uint แทน int)
  id, err := strconv.ParseUint(idStr, 10, 32)
  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{
      "error": "Invalid article ID format",
    })
    return
  }

  // ค้นหา article ตาม ID
  article := findArticleByID(uint(id))
  if article == nil {
    c.JSON(http.StatusNotFound, gin.H{
      "error": "Article not found",
    })
    return
  }

  c.JSON(http.StatusOK, gin.H{
    "article": article,
  })
}
```

### 📈 Visualization: Path Parameters Flow

```
Request: GET /api/v1/articles/123

URL Structure:
┌─────┬──────┬─────────────┬─────┐
│/api │ /v1  │ /articles   │ /123│
└─────┴──────┴─────────────┴─────┘
              ↑
            Path Parameter
             (id = 123)

Processing Flow:
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Route Match   │───▶│   Extract Param  │───▶│   Find Article  │
│ /articles/:id   │    │ c.Param("id")    │    │ Return Result   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 💡 ตัวอย่างการใช้งานจริง

### โครงสร้างข้อมูล Article (ปรับปรุงแล้ว)

```go
// Article struct พร้อม JSON tags และ validation
type Article struct {
  ID          uint      `json:"id" binding:"required"`
  Title       string    `json:"title" binding:"required,min=3"`
  Content     string    `json:"content" binding:"required"`
  Author      string    `json:"author" binding:"required"`
  Category    string    `json:"category"`
  Tags        []string  `json:"tags"`
  CreatedAt   time.Time `json:"created_at"`
  UpdatedAt   time.Time `json:"updated_at"`
  PublishedAt *time.Time `json:"published_at,omitempty"`
}

// ข้อมูลตัวอย่าง
var articles = []Article{
  {
    ID:        1,
    Title:     "Introduction to Go",
    Content:   "Go is a programming language...",
    Author:    "John Doe",
    Category:  "Programming",
    Tags:      []string{"go", "programming", "tutorial"},
    CreatedAt: time.Now().AddDate(0, 0, -10),
    UpdatedAt: time.Now().AddDate(0, 0, -5),
  },
  {
    ID:        2,
    Title:     "Advanced Go Patterns",
    Content:   "Learn advanced patterns in Go...",
    Author:    "Jane Smith",
    Category:  "Programming",
    Tags:      []string{"go", "advanced", "patterns"},
    CreatedAt: time.Now().AddDate(0, 0, -8),
    UpdatedAt: time.Now().AddDate(0, 0, -3),
  },
  // เพิ่มข้อมูลอื่นๆ...
}
```

### Helper Functions (ปรับปรุงแล้ว)

```go
// ค้นหา article ตาม ID พร้อม error handling
func findArticleByID(id uint) *Article {
  for _, article := range articles {
    if article.ID == id {
      return &article
    }
  }
  return nil
}

// Filter articles ตามเงื่อนไขต่างๆ
func filterArticles(articles []Article, category, search string) []Article {
  var filtered []Article

  for _, article := range articles {
    // Filter by category
    if category != "" && !strings.EqualFold(article.Category, category) {
      continue
    }

    // Filter by search term (title หรือ content)
    if search != "" {
      searchLower := strings.ToLower(search)
      titleMatch := strings.Contains(strings.ToLower(article.Title), searchLower)
      contentMatch := strings.Contains(strings.ToLower(article.Content), searchLower)
      if !titleMatch && !contentMatch {
        continue
      }
    }

    filtered = append(filtered, article)
  }

  return filtered
}
```

## 🧪 การทดสอบ API

### ใช้ Postman หรือ cURL

```bash
# ดึงข้อมูล articles ทั้งหมด
curl "http://localhost:8080/api/v1/articles"

# ดึงข้อมูล articles แบบ pagination
curl "http://localhost:8080/api/v1/articles?limit=5&page=2"

# ค้นหา articles ตาม category
curl "http://localhost:8080/api/v1/articles?category=Programming"

# ค้นหาด้วย search term
curl "http://localhost:8080/api/v1/articles?search=Go&limit=3"

# ดึงข้อมูล article ตาม ID
curl "http://localhost:8080/api/v1/articles/1"

# ทดสอบกรณี article ไม่มีอยู่
curl "http://localhost:8080/api/v1/articles/999"
```

### ตัวอย่าง Response

```json
// GET /api/v1/articles?limit=2&category=Programming
{
  "articles": [
    {
      "id": 1,
      "title": "Introduction to Go",
      "content": "Go is a programming language...",
      "author": "John Doe",
      "category": "Programming",
      "tags": ["go", "programming", "tutorial"],
      "created_at": "2025-01-01T10:00:00Z",
      "updated_at": "2025-01-06T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "total": 5,
    "totalPages": 3
  }
}
```

## ✨ Best Practices

### 1. Input Validation และ Error Handling

```go
func validateAndParseQuery(c *gin.Context) (limit, page int, err error) {
  limitStr := c.DefaultQuery("limit", "10")
  pageStr := c.DefaultQuery("page", "1")

  limit, err = strconv.Atoi(limitStr)
  if err != nil || limit <= 0 || limit > 100 {
    return 0, 0, fmt.Errorf("invalid limit: must be between 1 and 100")
  }

  page, err = strconv.Atoi(pageStr)
  if err != nil || page <= 0 {
    return 0, 0, fmt.Errorf("invalid page: must be greater than 0")
  }

  return limit, page, nil
}
```

### 2. Middleware สำหรับ Logging

```go
func queryLogger() gin.HandlerFunc {
  return gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
    return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s \"%s\" %s\"\n",
      param.ClientIP,
      param.TimeStamp.Format(time.RFC1123),
      param.Method,
      param.Path,
      param.Request.Proto,
      param.StatusCode,
      param.Latency,
      param.Request.UserAgent(),
      param.ErrorMessage,
    )
  })
}
```

### 3. Response Structure ที่สม่ำเสมอ

```go
type APIResponse struct {
  Success bool        `json:"success"`
  Data    interface{} `json:"data,omitempty"`
  Error   string      `json:"error,omitempty"`
  Meta    interface{} `json:"meta,omitempty"`
}

func successResponse(c *gin.Context, data interface{}, meta interface{}) {
  c.JSON(http.StatusOK, APIResponse{
    Success: true,
    Data:    data,
    Meta:    meta,
  })
}

func errorResponse(c *gin.Context, statusCode int, message string) {
  c.JSON(statusCode, APIResponse{
    Success: false,
    Error:   message,
  })
}
```

## 🔧 การปรับปรุงโค้ดให้ทันสมัย

### ปรับปรุงจากเวอร์ชันเดิม:

1. **ใช้ `strconv.ParseUint`** แทน `strconv.Atoi` สำหรับ ID
2. **เพิ่ม input validation** และ error handling
3. **ใช้ `gin.H`** แทนการสร้าง struct แบบ anonymous
4. **เพิ่ม pagination** และ metadata
5. **ใช้ `c.DefaultQuery`** สำหรับค่าเริ่มต้น
6. **เพิ่ม context timeout** สำหรับ production
7. **ใช้ structured logging** แทน print statements

### Go Version Compatibility:

- รองรับ Go 1.19+
- ใช้ generics สำหรับ type safety (Go 1.18+)
- รองรับ context.Context อย่างเต็มรูปแบบ

### Production-Ready Features:

- Rate limiting
- CORS support
- Health check endpoints
- Graceful shutdown
- Metrics และ monitoring

---

**🎯 สรุป:** การทำงานกับ Query Parameters และ Path Parameters ใน Gin Framework ช่วยให้เราสร้าง REST API ที่ยืดหยุ่นและใช้งานง่าย โดยสามารถรองรับการค้นหา กรองข้อมูล และ pagination ได้อย่างมีประสิทธิภาพ
