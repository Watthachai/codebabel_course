# การ Query ข้อมูลด้วยเทคนิคต่าง ๆ (Updated 2024)

> **บทเรียนนี้จะสอนการเข้าถึงข้อมูลในฐานข้อมูลทั้งแบบผลลัพธ์เดี่ยวและหลายข้อมูล พร้อมปรับปรุงให้เป็น Go version ล่าสุด**

## 📋 สารบัญ

- [ภาพรวมการ Query ข้อมูล](#ภาพรวมการ-query-ข้อมูล)
- [การดึงบทความเดี่ยว (Single Article)](#การดึงบทความเดี่ยว-single-article)
- [การดึงบทความทั้งหมด (All Articles)](#การดึงบทความทั้งหมด-all-articles)
- [การปรับปรุงจากเวอร์ชันเดิม](#การปรับปรุงจากเวอร์ชันเดิม)
- [ตัวอย่างการใช้งาน](#ตัวอย่างการใช้งาน)

---

## 🎯 ภาพรวมการ Query ข้อมูล

ในบทเรียนนี้เราจะจัดการการดึงข้อมูลออกมาจากฐานข้อมูลใน **2 รูปแบบหลัก**:

```
┌─────────────────────────────────────────────────────────┐
│                  Data Query Patterns                    │
├─────────────────────────────────────────────────────────┤
│  1. Single Article Query                                │
│     GET /api/v1/articles/{id}                           │
│     └── ดึงบทความเดียวตาม ID                              │
│                                                         │
│  2. Multiple Articles Query                             │
│     GET /api/v1/articles                                │
│     └── ดึงบทความทั้งหมด                                   │
└─────────────────────────────────────────────────────────┘
```

### 🔄 การใช้งาน ID ร่วมกัน

Path parameter `/api/v1/articles/{id}` ไม่ได้ใช้แค่สำหรับการดึงข้อมูลเท่านั้น แต่ยังใช้ร่วมกับ:

- **DELETE** `/api/v1/articles/{id}` - ลบบทความ
- **PUT/PATCH** `/api/v1/articles/{id}` - อัปเดตบทความ
- **GET** `/api/v1/articles/{id}` - อ่านบทความ

---

## 🔍 การดึงบทความเดี่ยว (Single Article)

### สร้าง Helper Method: `FindArticleByID`

เพื่อหลีกเลี่ยงการเขียนโค้ดซ้ำ เราจะสร้าง method ร่วมใช้งาน:

```go
// controllers/article_controller.go

// FindArticleByID - ค้นหาบทความจาก ID
func (a *ArticleController) FindArticleByID(c *fiber.Ctx) (models.Article, error) {
  var article models.Article

  // ดึง ID จาก URL parameter
  id := c.Params("id")

  // Query ข้อมูลจากฐานข้อมูล
  if err := a.DB.First(&article, id).Error; err != nil {
    return models.Article{}, err
  }

  return article, nil
}
```

### 🎯 เทคนิคการ Query ใน GORM (Updated 2024)

```go
// ┌─────────────────────────────────────────────────────────┐
// │              GORM Query Methods                         │
// ├─────────────────────────────────────────────────────────┤
// │  db.First(&user)           // หา record แรก             │
// │  db.Find(&users)           // หา records ทั้งหมด          │
// │  db.First(&user, 10)       // หาด้วย Primary Key = 10    │
// │  db.Where("name = ?", jin) // หาด้วยเงื่อนไข               │
// │     .First(&user)                                       │
// │  db.Where("name LIKE ?",   // หาด้วย Pattern Matching    │
// │     "%jin%").Find(&users)                               │
// └─────────────────────────────────────────────────────────┘
```

### การใช้งานใน Show Method

```go
// Show - แสดงบทความเดียว
func (a *ArticleController) Show(c *fiber.Ctx) error {
  // เรียกใช้ helper method
  article, err := a.FindArticleByID(c)
  if err != nil {
    return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
      "error": "Article not found",
      // ปรับปรุง: ใช้ structured error response
      "code":  "ARTICLE_NOT_FOUND",
      "details": err.Error(),
    })
  }

  // สร้าง response structure
  serializedArticle := responses.ArticleResponse{}
  copier.Copy(&serializedArticle, &article)

  return c.Status(fiber.StatusOK).JSON(fiber.Map{
    "success": true,
    "data": fiber.Map{
      "article": serializedArticle,
    },
    // ปรับปรุง: เพิ่ม metadata
    "meta": fiber.Map{
      "timestamp": time.Now(),
      "version": "v1",
    },
  })
}
```

---

## 📚 การดึงบทความทั้งหมด (All Articles)

### Index Method - ดึงข้อมูลทั้งหมด

```go
// Index - แสดงบทความทั้งหมด
func (a *ArticleController) Index(c *fiber.Ctx) error {
  var articles []models.Article

  // Query ข้อมูลทั้งหมด
  if err := a.DB.Find(&articles).Error; err != nil {
    return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
      "error": "Failed to fetch articles",
      "code":  "DATABASE_ERROR",
    })
  }

  // แปลงเป็น response format
  var serializedArticles []responses.ArticleResponse
  copier.Copy(&serializedArticles, &articles)

  return c.Status(fiber.StatusOK).JSON(fiber.Map{
    "success": true,
    "data": fiber.Map{
      "articles": serializedArticles,
    },
    "meta": fiber.Map{
      "total": len(serializedArticles),
      "timestamp": time.Now(),
    },
  })
}
```

---

## 🆕 การปรับปรุงจากเวอร์ชันเดิม

### 1. **Response Structure ที่ดีขึ้น**

```go
// เดิม
return c.JSON(articles)

// ใหม่ - Structured Response
return c.Status(fiber.StatusOK).JSON(fiber.Map{
  "success": true,
  "data": fiber.Map{
    "articles": serializedArticles,
  },
  "meta": fiber.Map{
    "total": len(serializedArticles),
    "timestamp": time.Now(),
  },
})
```

### 2. **Error Handling ที่ชัดเจนขึ้น**

```go
// เดิม
if err != nil {
  return c.Status(404).JSON(err.Error())
}

// ใหม่ - Structured Error
if err != nil {
  return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
    "error": "Article not found",
    "code":  "ARTICLE_NOT_FOUND",
    "details": err.Error(),
    "timestamp": time.Now(),
  })
}
```

### 3. **การใช้ Response DTOs**

```go
// responses/article_response.go
type ArticleResponse struct {
  ID          uint      `json:"id"`
  Title       string    `json:"title"`
  Content     string    `json:"content"`
  Author      string    `json:"author"`
  CreatedAt   time.Time `json:"created_at"`
  UpdatedAt   time.Time `json:"updated_at"`
  // ซ่อน sensitive fields เช่น DeletedAt
}
```

### 4. **การเพิ่ม Pagination Support**

```go
// Index method with pagination
func (a *ArticleController) Index(c *fiber.Ctx) error {
  page := c.QueryInt("page", 1)
  limit := c.QueryInt("limit", 10)
  offset := (page - 1) * limit

  var articles []models.Article
  var total int64

  // Count total records
  a.DB.Model(&models.Article{}).Count(&total)

  // Get paginated results
  if err := a.DB.Offset(offset).Limit(limit).Find(&articles).Error; err != nil {
    return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
      "error": "Failed to fetch articles",
    })
  }

  var serializedArticles []responses.ArticleResponse
  copier.Copy(&serializedArticles, &articles)

  return c.Status(fiber.StatusOK).JSON(fiber.Map{
    "success": true,
    "data": fiber.Map{
      "articles": serializedArticles,
    },
    "meta": fiber.Map{
      "current_page": page,
      "per_page": limit,
      "total": total,
      "last_page": int(math.Ceil(float64(total) / float64(limit))),
    },
  })
}
```

---

## 🧪 ตัวอย่างการใช้งาน

### 1. ดึงบทความเดี่ยว

```bash
# Request
GET /api/v1/articles/1

# Response
{
  "success": true,
  "data": {
  "article": {
    "id": 1,
    "title": "บทความตัวอย่าง",
    "content": "เนื้อหาบทความ...",
    "author": "ผู้เขียน",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
  },
  "meta": {
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "v1"
  }
}
```

### 2. ดึงบทความทั้งหมด (แบบ Pagination)

```bash
# Request
GET /api/v1/articles?page=1&limit=5

# Response
{
  "success": true,
  "data": {
  "articles": [
    {
    "id": 1,
    "title": "บทความ 1",
    "content": "เนื้อหา...",
    "author": "ผู้เขียน 1"
    },
    // ... more articles
  ]
  },
  "meta": {
  "current_page": 1,
  "per_page": 5,
  "total": 25,
  "last_page": 5
  }
}
```

### 3. กรณี Error - ไม่พบบทความ

```bash
# Request
GET /api/v1/articles/999

# Response
HTTP 404 Not Found
{
  "error": "Article not found",
  "code": "ARTICLE_NOT_FOUND",
  "details": "record not found",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🎯 สรุปประเด็นสำคัญ

### ✅ จุดเด่นของการปรับปรุง

- **Reusable Code**: สร้าง `FindArticleByID` ใช้ร่วมกัน
- **Better Error Handling**: Error response ที่มีโครงสร้าง
- **Pagination Support**: รองรับการแบ่งหน้า
- **Response Consistency**: รูปแบบ response ที่สม่ำเสมอ
- **Security**: ซ่อน sensitive fields ด้วย DTO

### 🔧 เทคโนโลยีที่ใช้

- **Go Fiber v2** (Web Framework)
- **GORM v2** (ORM)
- **Copier** (Struct Mapping)
- **Modern Go Practices** (2024)

> **💡 Pro Tip**: การออกแบบ API ที่ดีควรมีความสม่ำเสมอใน response format และ error handling เพื่อให้ frontend developer ใช้งานได้ง่าย
