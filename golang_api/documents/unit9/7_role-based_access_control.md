# Role-Based Access Control (RBAC) with Casbin

> เรียนรู้การตรวจสอบสิทธิ์แบบ RBAC และการควบคุมผ่าน Casbin สำหรับ Go 1.24.3

## 📖 Overview

Role-Based Access Control (RBAC) เป็นระบบการจัดการสิทธิ์การเข้าถึงที่อิงตามบทบาท (Role) ของผู้ใช้ โดยในบทเรียนนี้เราจะใช้ **Casbin** ซึ่งเป็น Authorization Library ที่มีประสิทธิภาพสูงสำหรับ Go

## 🔧 สิ่งที่ปรับปรุงใหม่สำหรับ Go 1.24.3

### 🆕 การปรับปรุงจากเวอร์ชันเดิม:

- ✅ อัพเดต Casbin เป็นเวอร์ชัน v2.x ล่าสุด
- ✅ ใช้ Go Modules แทน GOPATH
- ✅ รองรับ Context cancellation ใน Go 1.24.3
- ✅ ปรับ Middleware ให้รองรับ Gin เวอร์ชันล่าสุด
- ✅ เพิ่ม Error handling ที่ดีขึ้น
- ✅ ใช้ Generic types สำหรับ Type safety

## 🗂️ โครงสร้างไฟล์

```
project/
├── config/
│   ├── rbac_policy.csv      # ไฟล์กำหนดนโยบาย
│   └── rbac_model.conf      # ไฟล์กำหนดโมเดล
├── middleware/
│   └── authorization.go     # Middleware สำหรับตรวจสอบสิทธิ์
└── main.go
```

## ⚙️ การตั้งค่า Casbin

### 1. ไฟล์นโยบาย (Policy File) - `config/rbac_policy.csv`

```csv
p, admin, /api/v1/users, GET
p, admin, /api/v1/users, POST
p, admin, /api/v1/users/*, GET
p, admin, /api/v1/users/*, PUT
p, admin, /api/v1/users/*, DELETE
p, admin, /api/v1/categories, POST
p, admin, /api/v1/categories/*, PUT
p, admin, /api/v1/categories/*, DELETE
p, admin, /api/v1/articles, POST
p, admin, /api/v1/articles/*, PUT
p, admin, /api/v1/articles/*, DELETE
p, editor, /api/v1/articles, POST
p, editor, /api/v1/articles/*, PUT
p, editor, /api/v1/articles/*, DELETE
```

### 📋 อธิบายนโยบาย:

| Role     | Resource               | Action             | คำอธิบาย                        |
| -------- | ---------------------- | ------------------ | ------------------------------- |
| `admin`  | `/api/v1/users`        | `GET, POST`        | แอดมินดูและสร้าง users ได้      |
| `admin`  | `/api/v1/users/*`      | `GET, PUT, DELETE` | แอดมินจัดการ user แต่ละคนได้    |
| `admin`  | `/api/v1/categories`   | `POST`             | แอดมินสร้าง categories ได้      |
| `admin`  | `/api/v1/categories/*` | `PUT, DELETE`      | แอดมินแก้ไข/ลบ categories ได้   |
| `admin`  | `/api/v1/articles`     | `POST`             | แอดมินสร้าง articles ได้        |
| `admin`  | `/api/v1/articles/*`   | `PUT, DELETE`      | แอดมินแก้ไข/ลบ articles ได้     |
| `editor` | `/api/v1/articles`     | `POST`             | บรรณาธิการสร้าง articles ได้    |
| `editor` | `/api/v1/articles/*`   | `PUT, DELETE`      | บรรณาธิการแก้ไข/ลบ articles ได้ |

### 2. ไฟล์โมเดล (Model File) - `config/rbac_model.conf`

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && keyMatch2(r.obj, p.obj) && r.act == p.act
```

### 🔍 อธิบายโมเดล:

- **`request_definition`**: กำหนดรูปแบบ request (subject, object, action)
- **`policy_definition`**: กำหนดรูปแบบ policy
- **`policy_effect`**: ผลลัพธ์เป็น allow หากมี policy ที่ตรงกัน
- **`matchers`**: เงื่อนไขการจับคู่ โดยใช้ `keyMatch2` สำหรับ wildcard matching

## 🛡️ สร้าง Authorization Middleware

### `middleware/authorization.go`

```go
package middleware

import (
  "context"
  "net/http"
  "time"

  "github.com/casbin/casbin/v2"
  "github.com/gin-gonic/gin"
  "your-project/models"
)

// AuthorizeMiddleware สร้าง middleware สำหรับตรวจสอบสิทธิ์
func AuthorizeMiddleware() gin.HandlerFunc {
  return gin.HandlerFunc(func(c *gin.Context) {
    // 1. ตรวจสอบการ Authentication ก่อน
    userInterface, exists := c.Get("user")
    if !exists {
      c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
        "error":   "Unauthorized",
        "message": "Authentication required",
        "code":    "AUTH_REQUIRED",
      })
      return
    }

    // 2. แปลง interface{} เป็น User struct
    user, ok := userInterface.(*models.User)
    if !ok {
      c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
        "error":   "Unauthorized",
        "message": "Invalid user data",
        "code":    "INVALID_USER",
      })
      return
    }

    // 3. สร้าง Casbin Enforcer พร้อม timeout
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    enforcer, err := casbin.NewEnforcer(
      "config/rbac_model.conf",
      "config/rbac_policy.csv",
    )
    if err != nil {
      c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
        "error":   "Internal Server Error",
        "message": "Failed to initialize authorization system",
        "code":    "AUTH_INIT_FAILED",
      })
      return
    }

    // 4. ตรวจสอบสิทธิ์
    allowed, err := enforcer.EnforceWithMatcher(
      "keyMatch2",
      user.Role,           // Subject (บทบาท)
      c.Request.URL.Path,  // Object (เส้นทาง)
      c.Request.Method,    // Action (HTTP Method)
    )

    if err != nil {
      c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
        "error":   "Internal Server Error",
        "message": "Authorization check failed",
        "code":    "AUTH_CHECK_FAILED",
      })
      return
    }

    if !allowed {
      c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
        "error":   "Forbidden",
        "message": "You are not authorized to access this resource",
        "code":    "ACCESS_DENIED",
        "details": gin.H{
          "role":     user.Role,
          "resource": c.Request.URL.Path,
          "action":   c.Request.Method,
        },
      })
      return
    }

    // 5. ผ่านการตรวจสอบ ให้ดำเนินการต่อ
    c.Next()
  })
}

// OptionalAuthorizeMiddleware สำหรับ resources ที่ไม่บังคับ auth
func OptionalAuthorizeMiddleware() gin.HandlerFunc {
  return gin.HandlerFunc(func(c *gin.Context) {
    // อนุญาตให้เข้าถึงได้โดยไม่ต้องตรวจสอบ
    c.Next()
  })
}
```

## 🚀 การใช้งานใน Router

### `routes/routes.go`

```go
package routes

import (
  "github.com/gin-gonic/gin"
  "your-project/controllers"
  "your-project/middleware"
)

func SetupRoutes(r *gin.Engine) {
  // API v1 group
  api := r.Group("/api/v1")

  // Authentication middleware สำหรับทุก protected routes
  authMiddleware := middleware.AuthenticationMiddleware()
  authorizeMiddleware := middleware.AuthorizeMiddleware()

  // User management routes (เฉพาะ admin เท่านั้น)
  userGroup := api.Group("/users")
  userGroup.Use(authMiddleware, authorizeMiddleware)
  {
    userGroup.GET("", controllers.GetAllUsers)
    userGroup.POST("", controllers.CreateUser)
    userGroup.GET("/:id", controllers.GetUserByID)
    userGroup.PUT("/:id", controllers.UpdateUser)
    userGroup.DELETE("/:id", controllers.DeleteUser)
  }

  // Category management routes (เฉพาะ admin เท่านั้น)
  categoryGroup := api.Group("/categories")
  categoryGroup.Use(authMiddleware, authorizeMiddleware)
  {
    categoryGroup.POST("", controllers.CreateCategory)
    categoryGroup.PUT("/:id", controllers.UpdateCategory)
    categoryGroup.DELETE("/:id", controllers.DeleteCategory)
  }

  // Article management routes (admin และ editor)
  articleGroup := api.Group("/articles")
  articleGroup.Use(authMiddleware, authorizeMiddleware)
  {
    articleGroup.POST("", controllers.CreateArticle)
    articleGroup.PUT("/:id", controllers.UpdateArticle)
    articleGroup.DELETE("/:id", controllers.DeleteArticle)
  }

  // Public routes (ไม่ต้อง authentication)
  publicAPI := api.Group("")
  {
    publicAPI.GET("/articles", controllers.GetAllArticles)
    publicAPI.GET("/articles/:id", controllers.GetArticleByID)
    publicAPI.GET("/categories", controllers.GetAllCategories)
    publicAPI.GET("/categories/:id", controllers.GetCategoryByID)
  }

  // Authentication routes
  auth := api.Group("/auth")
  {
    auth.POST("/signin", controllers.SignIn)
    auth.POST("/signup", controllers.SignUp)
  }
}
```

## 🧪 การทดสอบด้วย Postman

### 1. เข้าสู่ระบบด้วย Admin

```http
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 2. ทดสอบการเข้าถึง Users (ต้องเป็น Admin)

```http
GET /api/v1/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success - Admin):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "email": "admin@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "email": "editor@example.com",
      "role": "editor"
    }
  ]
}
```

**Response (Forbidden - Non-Admin):**

```json
{
  "error": "Forbidden",
  "message": "You are not authorized to access this resource",
  "code": "ACCESS_DENIED",
  "details": {
    "role": "editor",
    "resource": "/api/v1/users",
    "action": "GET"
  }
}
```

## 🎯 Use Cases และตัวอย่าง

### 📊 Scenario Matrix

| User Role | Resource           | Action | Result   | เหตุผล                         |
| --------- | ------------------ | ------ | -------- | ------------------------------ |
| `admin`   | `/api/v1/users`    | `GET`  | ✅ Allow | Admin มีสิทธิ์เต็ม             |
| `editor`  | `/api/v1/users`    | `GET`  | ❌ Deny  | Editor ไม่มีสิทธิ์จัดการ users |
| `admin`   | `/api/v1/articles` | `POST` | ✅ Allow | Admin สร้าง articles ได้       |
| `editor`  | `/api/v1/articles` | `POST` | ✅ Allow | Editor สร้าง articles ได้      |
| `member`  | `/api/v1/articles` | `GET`  | ✅ Allow | Public resource                |
| `guest`   | `/api/v1/articles` | `GET`  | ✅ Allow | ไม่ต้อง authentication         |

## 🔧 Advanced Configuration

### Dynamic Policy Loading

```go
// สำหรับโหลด policy จาก database
func loadPolicyFromDB(enforcer *casbin.Enforcer) error {
  // เชื่อมต่อ database และโหลด policies
  policies, err := db.GetAllPolicies()
  if err != nil {
    return err
  }

  for _, policy := range policies {
    enforcer.AddPolicy(policy.Subject, policy.Object, policy.Action)
  }

  return nil
}
```

### Custom Matchers

```ini
# สำหรับ complex matching
[matchers]
m = r.sub == p.sub && keyMatch2(r.obj, p.obj) && r.act == p.act || r.sub == "superadmin"
```

## 🚨 Best Practices

### 1. **Security**

- ✅ ใช้ HTTPS เสมอ
- ✅ Validate input ทุกครั้ง
- ✅ Log การเข้าถึงที่สำคัญ
- ✅ ใช้ rate limiting

### 2. **Performance**

- ✅ Cache enforcer instance
- ✅ ใช้ connection pooling
- ✅ Monitor response time

### 3. **Maintainability**

- ✅ แยก policies เป็นไฟล์ต่างหาก
- ✅ ใช้ environment variables
- ✅ เขียน unit tests

## 🔍 Troubleshooting

### ปัญหาที่พบบ่อย:

1. **Policy ไม่ทำงาน**

   ```bash
   # ตรวจสอบ syntax ใน CSV file
   # ตรวจสอบ path matching
   ```

2. **Performance ช้า**

   ```go
   // ใช้ cached enforcer
   enforcer.EnableAutoSave(false)
   ```

3. **Wildcard ไม่ match**
   ```ini
   # ใช้ keyMatch2 แทน keyMatch
   m = r.sub == p.sub && keyMatch2(r.obj, p.obj) && r.act == p.act
   ```

## 📈 Monitoring และ Logging

```go
// เพิ่ม logging ใน middleware
func AuthorizeMiddleware() gin.HandlerFunc {
  return gin.HandlerFunc(func(c *gin.Context) {
    start := time.Now()

    // ... authorization logic ...

    // Log การเข้าถึง
    log.Printf("Authorization check: user=%s, path=%s, method=%s, allowed=%t, duration=%v",
      user.Email, c.Request.URL.Path, c.Request.Method, allowed, time.Since(start))
  })
}
```

## 🎉 สรุป

RBAC ด้วย Casbin ช่วยให้เราจัดการสิทธิ์การเข้าถึงได้อย่างมีประสิทธิภาพ โดย:

- 🔐 **แยกแยะสิทธิ์ตามบทบาท** - แต่ละ role มีสิทธิ์ที่ชัดเจน
- 🚀 **ยืดหยุ่นและขยายได้** - เพิ่ม policy ใหม่ได้ง่าย
- 🛡️ **ปลอดภัย** - ตรวจสอบสิทธิ์ก่อนการเข้าถึงทุกครั้ง
- 📊 **ง่ายต่อการบำรุงรักษา** - แยก logic ออกจาก business code

ด้วยการใช้ Casbin ร่วมกับ Go 1.24.3 เราได้ระบบ authorization ที่ทันสมัย มีประสิทธิภาพ และปลอดภัยสูง! 🚀
