# Grouping Routes in Go with Gin Framework

> เรียนรู้หลักการจัดกลุ่ม Routes ที่เกี่ยวข้องกันตาม Feature ผ่านการใช้ Route Groups ใน Gin

## 📚 สารบัญ

- [การแยก Routes ออกจาก main.go](#การแยก-routes-ออกจาก-maingo)
- [การสร้าง Package สำหรับ Routes](#การสร้าง-package-สำหรับ-routes)
- [Route Groups และ API Versioning](#route-groups-และ-api-versioning)
- [การจำลองข้อมูล Articles](#การจำลองข้อมูล-articles)
- [การส่งข้อมูล JSON Response](#การส่งข้อมูล-json-response)
- [Updates สำหรับ Go เวอร์ชันใหม่](#updates-สำหรับ-go-เวอร์ชันใหม่)

---

## 🎯 ปัญหาที่เราต้องแก้ไข

ในปัจจุบัน เรามี route เพียงแค่ 1 ตัวใน `main.go`:

```go
r.GET("/", func(c *gin.Context) {
  c.String(http.StatusOK, "Hello Thailand")
})
```

แต่ในโปรเจ็กต์จริง เราจะมี routes มากมาย (อาจจะ 10-100 routes) ดังนั้นเราต้อง:

1. **แยก routes ออกจาก main.go**
2. **จัดกลุ่ม routes ที่เกี่ยวข้องกัน**
3. **สร้าง API versioning**

---

## 🏗️ การแยก Routes ออกจาก main.go

### ขั้นตอนที่ 1: สร้าง Package ใหม่

สร้างโฟลเดอร์และไฟล์ตามโครงสร้างนี้:

```
project/
├── main.go
└── routes/
  └── routes.go
```

### ขั้นตอนที่ 2: สร้าง routes/routes.go

```go
package routes

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

// SetupRoutes ตั้งค่า routes ทั้งหมดของ application
func SetupRoutes(r *gin.Engine) {
  r.GET("/", func(c *gin.Context) {
    c.String(http.StatusOK, "Hello Thailand")
  })
}
```

### ขั้นตอนที่ 3: แก้ไข main.go

```go
package main

import (
  "your-module-name/routes" // แทนที่ด้วยชื่อ module จริงของคุณ
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()

  // เรียกใช้ function จาก routes package
  routes.SetupRoutes(r)

  r.Run(":8080")
}
```

> 💡 **หมายเหตุ**: ชื่อ function `SetupRoutes` ขึ้นต้นด้วยตัวใหญ่เพื่อให้สามารถเรียกใช้จาก package อื่นได้ (Public function)

---

## 🎯 Route Groups และ API Versioning

### ทำไมต้องใช้ API Versioning?

เมื่อ API ของเรามีการพัฒนาไปเรื่อยๆ เราอาจต้องเปลี่ยน:

- รูปแบบของ response data
- URL structure
- Business logic

แต่ client เก่าที่ใช้ API อยู่แล้วจะยังคงต้องการข้อมูลรูปแบบเดิม

**ตัวอย่าง URL structure:**

```
/api/v1/articles     <- version 1 (เก่า)
/api/v2/articles     <- version 2 (ใหม่)
```

### การใช้ Route Groups

```go
package routes

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
  // สร้าง route group สำหรับ API v1
  v1 := r.Group("/api/v1")
  {
    // สร้าง sub-group สำหรับ articles
    articlesGroup := v1.Group("/articles")
    {
      articlesGroup.GET("", getAllArticles)           // GET /api/v1/articles
      articlesGroup.GET("/:id", getArticleByID)       // GET /api/v1/articles/1
      articlesGroup.POST("", createArticle)           // POST /api/v1/articles
      articlesGroup.PATCH("/:id", updateArticle)      // PATCH /api/v1/articles/1
      articlesGroup.DELETE("/:id", deleteArticle)     // DELETE /api/v1/articles/1
    }
  }
}
```

### 📋 RESTful API Routes สำหรับ Articles

| HTTP Method | URL                    | ความหมาย                   |
| ----------- | ---------------------- | -------------------------- |
| `GET`       | `/api/v1/articles`     | ดึงข้อมูล articles ทั้งหมด |
| `GET`       | `/api/v1/articles/:id` | ดึงข้อมูล article ตาม ID   |
| `POST`      | `/api/v1/articles`     | สร้าง article ใหม่         |
| `PATCH`     | `/api/v1/articles/:id` | อัพเดท article บางส่วน     |
| `DELETE`    | `/api/v1/articles/:id` | ลบ article ตาม ID          |

---

## 📝 การจำลองข้อมูล Articles

### สร้าง Article Struct

```go
// Article โครงสร้างข้อมูลของบทความ
type Article struct {
  ID    int    `json:"id"`           // เพิ่ม ID field
  Title string `json:"title"`       // ต้องเป็นตัวใหญ่เพื่อ export
  Body  string `json:"body"`        // ต้องเป็นตัวใหญ่เพื่อ export
}
```

> 🔑 **สำคัญ**: Field names ต้องขึ้นต้นด้วยตัวใหญ่ เพื่อให้ JSON encoder สามารถเข้าถึงได้

### สร้างข้อมูลจำลอง

```go
// ข้อมูลจำลองสำหรับทดสอบ
var articles = []Article{
  {ID: 1, Title: "Title 1", Body: "Body 1"},
  {ID: 2, Title: "Title 2", Body: "Body 2"},
  {ID: 3, Title: "Title 3", Body: "Body 3"},
  {ID: 4, Title: "Title 4", Body: "Body 4"},
  {ID: 5, Title: "Title 5", Body: "Body 5"},
}
```

---

## 📤 การส่งข้อมูล JSON Response

### Handler Function สำหรับ GET /api/v1/articles

```go
func getAllArticles(c *gin.Context) {
  // ส่งข้อมูล JSON กลับไป
  c.JSON(http.StatusOK, gin.H{
    "articles": articles,
  })
}
```

### ผลลัพธ์ที่ได้

```json
{
  "articles": [
    {
      "id": 1,
      "title": "Title 1",
      "body": "Body 1"
    },
    {
      "id": 2,
      "title": "Title 2",
      "body": "Body 2"
    }
    // ... articles อื่นๆ
  ]
}
```

---

## 🚀 Updates สำหรับ Go เวอร์ชันใหม่ (2025)

### 🆕 การปรับปรุงที่ได้ทำเพิ่มเติม:

#### 1. **Context Handling ที่ดีขึ้น**

```go
// เวอร์ชันเก่า
func getAllArticles(c *gin.Context) {
  c.JSON(http.StatusOK, gin.H{"articles": articles})
}

// เวอร์ชันใหม่ - มี error handling
func getAllArticles(c *gin.Context) {
  // ตรวจสอบ context timeout
  select {
  case <-c.Request.Context().Done():
    c.JSON(http.StatusRequestTimeout, gin.H{"error": "Request timeout"})
    return
  default:
    c.JSON(http.StatusOK, gin.H{
      "status": "success",
      "data":   articles,
      "count":  len(articles),
    })
  }
}
```

#### 2. **Structured Logging**

```go
import (
  "log/slog"
  "os"
)

func init() {
  // ใช้ structured logging แทน log.Println
  logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
  slog.SetDefault(logger)
}

func getAllArticles(c *gin.Context) {
  slog.Info("Getting all articles",
    "user_agent", c.GetHeader("User-Agent"),
    "ip", c.ClientIP(),
  )

  c.JSON(http.StatusOK, gin.H{
    "articles": articles,
  })
}
```

#### 3. **Input Validation**

```go
import "github.com/go-playground/validator/v10"

type CreateArticleRequest struct {
  Title string `json:"title" validate:"required,min=1,max=200"`
  Body  string `json:"body" validate:"required,min=1"`
}

var validate = validator.New()

func createArticle(c *gin.Context) {
  var req CreateArticleRequest

  if err := c.ShouldBindJSON(&req); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
  }

  if err := validate.Struct(req); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
  }

  // สร้าง article ใหม่...
}
```

#### 4. **Middleware สำหรับ CORS และ Security**

```go
import (
  "github.com/gin-contrib/cors"
  "github.com/gin-contrib/secure"
)

func SetupRoutes(r *gin.Engine) {
  // CORS middleware
  r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000", "https://yourdomain.com"},
    AllowMethods:     []string{"GET", "POST", "PATCH", "DELETE"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
  }))

  // Security middleware
  r.Use(secure.New(secure.Config{
    SSLRedirect:          true,
    STSSeconds:           315360000,
    STSIncludeSubdomains: true,
    FrameDeny:            true,
    ContentTypeNosniff:   true,
    BrowserXssFilter:     true,
  }))

  // Routes...
}
```

#### 5. **Response ที่สอดคล้องกับ API Standards**

```go
type APIResponse struct {
  Status  string      `json:"status"`
  Message string      `json:"message,omitempty"`
  Data    interface{} `json:"data,omitempty"`
  Error   string      `json:"error,omitempty"`
  Meta    *Meta       `json:"meta,omitempty"`
}

type Meta struct {
  Total       int `json:"total"`
  Count       int `json:"count"`
  PerPage     int `json:"per_page"`
  CurrentPage int `json:"current_page"`
}

func getAllArticles(c *gin.Context) {
  response := APIResponse{
    Status:  "success",
    Message: "Articles retrieved successfully",
    Data:    articles,
    Meta: &Meta{
      Total:       len(articles),
      Count:       len(articles),
      PerPage:     10,
      CurrentPage: 1,
    },
  }

  c.JSON(http.StatusOK, response)
}
```

---

## 🧪 การทดสอบ

### ทดสอบด้วย curl:

```bash
# ทดสอบ GET all articles
curl -X GET http://localhost:8080/api/v1/articles

# ทดสอบ GET article by ID
curl -X GET http://localhost:8080/api/v1/articles/1

# ทดสอบ POST new article
curl -X POST http://localhost:8080/api/v1/articles \
  -H "Content-Type: application/json" \
  -d '{"title":"New Article","body":"This is a new article"}'
```

---

## 📋 สรุป

การใช้ Route Groups ใน Gin ช่วยให้เราสามารถ:

✅ **จัดระเบียบ code** - แยก routes ตาม feature  
✅ **API Versioning** - รองรับการพัฒนาในอนาคต  
✅ **Code Reusability** - ใช้ middleware ร่วมกันในกลุ่ม  
✅ **Maintainability** - ง่ายต่อการดูแลรักษา

การปรับปรุงสำหรับ Go เวอร์ชันใหม่จะเน้นไปที่ **security**, **performance**, และ **developer experience** ที่ดีขึ้น พร้อมกับ error handling ที่ครอบคลุมมากขึ้น

> 🎉 **ขั้นตอนต่อไป**: ลองสร้าง routes สำหรับ feature อื่นๆ เช่น users, categories หรือ comments โดยใช้หลักการเดียวกัน!
