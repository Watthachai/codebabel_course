# หลักการของ Authorization ใน Go API

การจัดการสิทธิ์การเข้าถึงทรัพยากรในเซิร์ฟเวอร์ด้วย Authorization และการสร้าง User Controller แบบครบครัน

## 📋 สารบัญ

- [ภาพรวมของระบบ Authorization](#ภาพรวมของระบบ-authorization)
- [สถาปัตยกรรมระบบ User Roles](#สถาปัตยกรรมระบบ-user-roles)
- [การสร้าง User Controller](#การสร้าง-user-controller)
- [การใช้งาน Middleware Authentication](#การใช้งาน-middleware-authentication)
- [การทดสอบระบบ](#การทดสอบระบบ)
- [การปรับปรุงสำหรับ Go 1.24.3](#การปรับปรุงสำหรับ-go-1243)

## 🎯 ภาพรวมของระบบ Authorization

ระบบ Authorization ของเราประกอบด้วยการจัดการผู้ใช้งาน 3 ระดับ:

```mermaid
graph TD
  A[Admin] --> B[สามารถทำทุกอย่างในระบบ]
  C[Editor] --> D[อ่าน แก้ไข สร้าง และลบบทความ]
  E[Member] --> F[อ่านบทความเท่านั้น]
```

### 🔐 โครงสร้าง User Roles

| Role       | สิทธิ์การใช้งาน    | คำอธิบาย                                |
| ---------- | ------------------ | --------------------------------------- |
| **Admin**  | Full Access        | จัดการระบบทั้งหมด รวมถึงการจัดการผู้ใช้ |
| **Editor** | Content Management | จัดการบทความและเนื้อหา                  |
| **Member** | Read-Only          | อ่านเนื้อหาเท่านั้น                     |

## 🛠 การสร้าง User Controller

### API Endpoints ที่ได้พัฒนา

```go
// User Management Routes (Admin Only)
POST   /api/v1/users           // สร้างผู้ใช้ใหม่
GET    /api/v1/users           // ดูรายการผู้ใช้ทั้งหมด (พร้อม pagination)
GET    /api/v1/users/:id       // ดูข้อมูลผู้ใช้รายบุคคล
PATCH  /api/v1/users/:id       // แก้ไขข้อมูลผู้ใช้
DELETE /api/v1/users/:id       // ลบผู้ใช้
PATCH  /api/v1/users/:id/promote  // เลื่อนระดับเป็น Editor
PATCH  /api/v1/users/:id/demote   // ลดระดับเป็น Member
```

### 📝 Form Validation

#### CreateUserForm

```go
type CreateUserForm struct {
  Email    string `json:"email" binding:"required,email"`
  Password string `json:"password" binding:"required,min=8"`
  Name     string `json:"name" binding:"required"`
}
```

#### UpdateUserForm

```go
type UpdateUserForm struct {
  Email    string `json:"email" binding:"omitempty,email"`
  Password string `json:"password" binding:"omitempty,min=8"`
  Name     string `json:"name"`
}
```

> **💡 หมายเหตุ:** `omitempty` หมายความว่า หากไม่ได้ส่งค่ามา จะไม่ทำการ validate แต่หากส่งมา จะต้องผ่านการ validate ตามเงื่อนไขที่กำหนด

### 🔧 การปรับปรุงสำหรับ Go 1.24.3

#### 1. การใช้ Context แบบใหม่

```go
// เวอร์ชันเก่า
user := c.Get("user").(*models.User)

// เวอร์ชันใหม่ Go 1.24.3
user, exists := c.Get("user")
if !exists {
  c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
  return
}
userModel, ok := user.(*models.User)
if !ok {
  c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user context"})
  return
}
```

#### 2. การจัดการ Error ที่ดีขึ้น

```go
// เพิ่ม Error Handling ที่ครอบคลุมมากขึ้น
func (ctrl *UserController) FindAll(c *gin.Context) {
  var users []models.User

  // ใช้ Context กับ Database Query
  ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
  defer cancel()

  if err := database.DB.WithContext(ctx).Find(&users).Error; err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{
      "error": "Failed to retrieve users",
      "details": err.Error(),
    })
    return
  }

  // Pagination logic...
}
```

#### 3. การใช้ Generics (Go 1.18+)

```go
// Helper function สำหรับ Response
func JSONResponse[T any](c *gin.Context, status int, data T) {
  c.JSON(status, gin.H{
    "status": status,
    "data":   data,
    "timestamp": time.Now().Unix(),
  })
}

// การใช้งาน
JSONResponse(c, http.StatusOK, users)
```

## 🔐 Middleware Authentication

### การใช้งาน Group Middleware

```go
// แทนที่การเขียนแบบเก่า
userGroup := router.Group("/api/v1/users")
userGroup.GET("/", auth.Authenticate, userController.FindAll)
userGroup.POST("/", auth.Authenticate, userController.Create)
// ... ต่อไปเรื่อยๆ

// ใช้แบบใหม่ที่สะดวกกว่า
userGroup := router.Group("/api/v1/users")
userGroup.Use(auth.Authenticate) // Apply ให้ทุก route ใน group
{
  userGroup.GET("/", userController.FindAll)
  userGroup.POST("/", userController.Create)
  userGroup.GET("/:id", userController.FindByID)
  userGroup.PATCH("/:id", userController.Update)
  userGroup.DELETE("/:id", userController.Delete)
  userGroup.PATCH("/:id/promote", userController.Promote)
  userGroup.PATCH("/:id/demote", userController.Demote)
}
```

### 🛡️ Authorization Check

```go
func checkAdminRole(c *gin.Context) (*models.User, error) {
  userInterface, exists := c.Get("user")
  if !exists {
    return nil, errors.New("user not found in context")
  }

  user, ok := userInterface.(*models.User)
  if !ok {
    return nil, errors.New("invalid user type")
  }

  if user.Role != "admin" {
    return nil, errors.New("insufficient permissions")
  }

  return user, nil
}

// การใช้งานใน Controller
func (ctrl *UserController) FindAll(c *gin.Context) {
  user, err := checkAdminRole(c)
  if err != nil {
    c.JSON(http.StatusForbidden, gin.H{
      "error": "Access denied",
      "message": "Admin role required",
    })
    return
  }

  // ดำเนินการต่อ...
}
```

## 🔢 HTTP Status Codes ที่ใช้

| Status Code                 | ความหมาย                 | เมื่อไหร่ใช้           |
| --------------------------- | ------------------------ | ---------------------- |
| `200 OK`                    | สำเร็จ                   | GET, PATCH operations  |
| `201 Created`               | สร้างสำเร็จ              | POST operations        |
| `204 No Content`            | ลบสำเร็จ                 | DELETE operations      |
| `400 Bad Request`           | ข้อมูลไม่ถูกต้อง         | Validation errors      |
| `401 Unauthorized`          | ไม่ได้ล็อกอิน            | Missing/invalid token  |
| `403 Forbidden`             | ไม่มีสิทธิ์              | Wrong role/permissions |
| `404 Not Found`             | ไม่พบข้อมูล              | User doesn't exist     |
| `500 Internal Server Error` | ข้อผิดพลาดของเซิร์ฟเวอร์ | Database/server errors |

## 🧪 การทดสอบระบบ

### 1. การเตรียม Test Data

```go
// database/seeder.go (ปรับปรุงสำหรับ Go 1.24.3)
func SeedUsers() error {
  // สร้าง Admin
  adminPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
  admin := models.User{
    Email:    "admin@example.com",
    Password: string(adminPassword),
    Name:     "Admin User",
    Role:     "admin",
    Avatar:   "https://via.placeholder.com/150",
  }

  if err := database.DB.Create(&admin).Error; err != nil {
    return fmt.Errorf("failed to create admin: %w", err)
  }

  // สร้าง Normal Users (50 คน)
  users := make([]models.User, 0, 50)
  roles := []string{"editor", "member"}

  for i := 0; i < 50; i++ {
    hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
    user := models.User{
      Email:    faker.Email(),
      Password: string(hashedPassword),
      Name:     faker.Name(),
      Role:     roles[rand.Intn(len(roles))],
      Avatar:   fmt.Sprintf("https://picsum.photos/150?random=%d", i),
    }
    users = append(users, user)
  }

  return database.DB.CreateInBatches(users, 100).Error
}
```

### 2. การทดสอบด้วย Postman

#### Step 1: Login เพื่อรับ Token

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Step 2: ใช้ Token ในการเรียก API

```bash
GET /api/v1/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔄 การปรับปรุงเพิ่มเติม

### 1. Logging System

```go
import "go.uber.org/zap"

// เพิ่ม Structured Logging
func (ctrl *UserController) Create(c *gin.Context) {
  logger, _ := zap.NewProduction()
  defer logger.Sync()

  sugar := logger.Sugar()
  sugar.Infow("Creating new user",
    "admin_id", user.ID,
    "timestamp", time.Now(),
  )

  // Logic...
}
```

### 2. Rate Limiting

```go
import "golang.org/x/time/rate"

// เพิ่ม Rate Limiting สำหรับ API
func RateLimitMiddleware() gin.HandlerFunc {
  limiter := rate.NewLimiter(rate.Every(time.Minute), 100) // 100 requests per minute

  return func(c *gin.Context) {
    if !limiter.Allow() {
      c.JSON(http.StatusTooManyRequests, gin.H{
        "error": "Rate limit exceeded",
      })
      c.Abort()
      return
    }
    c.Next()
  }
}
```

### 3. Input Sanitization

```go
import "html"

// ป้องกัน XSS
func sanitizeInput(input string) string {
  return html.EscapeString(strings.TrimSpace(input))
}

// ใช้ใน Controller
form.Name = sanitizeInput(form.Name)
form.Email = sanitizeInput(form.Email)
```

## 📊 Performance Optimization

### 1. Database Connection Pooling

```go
// config/database.go
func SetupDatabase() {
  sqlDB, _ := db.DB()

  // Go 1.24.3 optimizations
  sqlDB.SetMaxIdleConns(10)
  sqlDB.SetMaxOpenConns(100)
  sqlDB.SetConnMaxLifetime(time.Hour)
  sqlDB.SetConnMaxIdleTime(time.Minute * 10)
}
```

### 2. Caching

```go
import "github.com/go-redis/redis/v8"

// เพิ่ม Redis Cache
func (ctrl *UserController) FindByID(c *gin.Context) {
  id := c.Param("id")
  cacheKey := fmt.Sprintf("user:%s", id)

  // ลองหาใน Cache ก่อน
  cached := redisClient.Get(ctx, cacheKey).Val()
  if cached != "" {
    c.JSON(http.StatusOK, gin.H{"data": cached})
    return
  }

  // หาจาก Database และ Cache ผลลัพธ์
  // ...
}
```

## 🎯 สรุป

ระบบ Authorization ที่พัฒนาขึ้นมีคุณสมบัติหลัก:

✅ **Security Features:**

- JWT Token Authentication
- Role-based Access Control
- Password Hashing with bcrypt
- Input Validation & Sanitization

✅ **Modern Go Practices (1.24.3):**

- Context-aware Database Operations
- Proper Error Handling
- Structured Logging
- Generic Types Support

✅ **API Best Practices:**

- RESTful Design
- Consistent Response Format
- Proper HTTP Status Codes
- Comprehensive Documentation

✅ **Performance Optimizations:**

- Database Connection Pooling
- Redis Caching
- Rate Limiting
- Batch Operations

การปรับปรุงนี้ทำให้ระบบมีความปลอดภัย, ประสิทธิภาพ และสามารถบำรุงรักษาได้ง่ายขึ้นอย่างมาก เหมาะสำหรับการพัฒนาแอปพลิเคชันระดับ Production ในปัจจุบัน
