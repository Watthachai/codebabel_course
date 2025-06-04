# Go Language & REST API Development Course - Complete Guide 📚

> **สวัสดีครับ!** ขอต้อนรับทุกท่านเข้าสู่คอร์สสอนการใช้งานภาษา Go และการพัฒนา REST API อย่างครบถ้วน

## 🚀 ทำไมต้องเลือก Go Language?

Go เป็นภาษาโปรแกรมมิ่งที่ต้องผ่านการ **Compile** ก่อนใช้งาน ซึ่งหมายความว่า:

```
Source Code (.go) → Compiler → Executable File
```

**ข้อดีของ Go:**

- ⚡ **ประสิทธิภาพสูง** - รันได้เร็วและใช้ทรัพยากรน้อย
- 📦 **ไฟล์ขนาดเล็ก** - Easy deployment
- 🏢 **ใช้งานจริงในบริษัทชั้นนำ** เช่น Google, Netflix, Amazon
- 🛠️ **เครื่องมือที่เราใช้ประจำ** เช่น Docker, Kubernetes ก็เขียนด้วย Go!

---

## 📋 สิ่งที่คุณจะได้เรียนรู้ในคอร์สนี้

### 🎯 Part 1: Go Fundamentals (พื้นฐานภาษา Go)

#### 1.1 ชนิดข้อมูลและตัวแปร

```go
// ตัวอย่างการประกาศตัวแปร
var name string = "John"
age := 25  // Short declaration
```

#### 1.2 Control Structures

- **If-Else Statements**
- **For Loops** (Go มี loop เดียว!)
- **Switch Cases**

#### 1.3 Data Collections

```go
// Arrays & Slices
numbers := []int{1, 2, 3, 4, 5}

// Maps (เหมือน Object ใน JS)
user := map[string]string{
  "name": "John",
  "email": "john@example.com",
}
```

#### 1.4 Functions & Custom Types

```go
// การสร้าง struct (เหมือน class)
type User struct {
  Name  string
  Email string
}

// Methods
func (u User) GetInfo() string {
  return u.Name + " - " + u.Email
}
```

#### 1.5 Interfaces & Packages

- การใช้งาน Interface สำหรับ Polymorphism
- การจัดการ Packages และ Modules

---

### ⚡ Part 2: Concurrency & Parallelism

> **ปัญหา:** CPU หลายคอร์ แต่โปรแกรมทำงานแค่คอร์เดียว = เสียประสิทธิภาพ

**Solution: Go Concurrency**

```go
// Goroutines - เหมือน lightweight threads
go func() {
  // ทำงานแบบ concurrent
  fmt.Println("Running in background!")
}()

// Channels - สำหรับสื่อสารระหว่าง goroutines
ch := make(chan string)
go func() {
  ch <- "Hello from goroutine!"
}()
message := <-ch
```

**การปรับปรุงจากเดิม:** เพิ่มตัวอย่างการใช้งานจริง และอธิบายความแตกต่างระหว่าง Concurrency กับ Parallelism

---

### 🌐 Part 3: REST API Development

#### 3.1 Client-Server Architecture

```
┌─────────────┐    HTTP Request     ┌─────────────┐
│   Client    │ ──────────────────► │   Server    │
│ (Browser,   │                     │  (Go API)   │
│  Mobile,    │ ◄────────────────── │             │
│  Desktop)   │    HTTP Response    │             │
└─────────────┘                     └─────────────┘
```

#### 3.2 REST API Principles

**Resources (ทรัพยากร):**

- 👤 Users
- 📄 Articles
- 💬 Comments

**HTTP Methods:**

```
GET    /api/articles     → ดึงบทความทั้งหมด
POST   /api/articles     → สร้างบทความใหม่
GET    /api/articles/48  → ดึงบทความ ID 48
PUT    /api/articles/48  → อัพเดทบทความ ID 48
DELETE /api/articles/48  → ลบบทความ ID 48
```

#### 3.3 Gin Framework

เราจะใช้ **Gin** เป็น Web Framework หลักในการพัฒนา API

```go
package main

import "github.com/gin-gonic/gin"

func main() {
  r := gin.Default()

  r.GET("/api/articles", getArticles)
  r.POST("/api/articles", createArticle)

  r.Run(":8080") // รันที่ port 8080
}
```

**การปรับปรุงจากเดิม:** เพิ่มตัวอย่างโค้ดที่ชัดเจน และอธิบาย RESTful principles

---

### 🎨 Part 4: Workshop - Article Management System

เราจะสร้างระบบจัดการบทความที่สมบูรณ์:

```
📁 Project Structure
├── 🌐 Web Application (Frontend)
│   ├── หน้าแสดงบทความ
│   ├── หน้า Admin (สำหรับ Admin เท่านั้น!)
│   └── ระบบ Login/Register
│
└── 🔧 API Server (Backend - Go)
  ├── User Management
  ├── Article CRUD
  └── Authentication
```

#### 4.1 Routing & URL Parameters

```go
// Static routes
r.GET("/api/articles", getAllArticles)

// Dynamic routes with parameters
r.GET("/api/articles/:id", getArticleByID)
// /api/articles/48 → id = "48"

// Query parameters
// /api/articles?page=3&category=tech
func getArticles(c *gin.Context) {
  page := c.Query("page")        // "3"
  category := c.Query("category") // "tech"
}
```

**การปรับปรุงจากเดิม:** เพิ่มตัวอย่างการจัดการ Query Parameters ที่ซับซ้อน

---

### 🗄️ Part 5: Database Integration

#### 5.1 Database Relationships

```
👤 Users (1) ────────────── (Many) 📄 Articles
                   │
                   │ (1)
                   │
                   ▼
                   (Many)
                 💬 Comments
```

#### 5.2 GORM - Go ORM Library

```go
// Models
type User struct {
  ID       uint      `gorm:"primaryKey"`
  Name     string
  Email    string    `gorm:"unique"`
  Articles []Article // One-to-Many relationship
}

type Article struct {
  ID       uint   `gorm:"primaryKey"`
  Title    string
  Content  string
  UserID   uint   // Foreign key
  User     User   // Belongs to User
}
```

#### 5.3 Database Migration & Seeding

```go
// Migration - สร้างตาราง
db.AutoMigrate(&User{}, &Article{})

// Seeding - เตรียมข้อมูลทดสอบ
func seedData(db *gorm.DB) {
  users := []User{
    {Name: "John Doe", Email: "john@example.com"},
    {Name: "Jane Smith", Email: "jane@example.com"},
  }

  for _, user := range users {
    db.Create(&user)
  }
}
```

**การปรับปรุงจากเดิม:** เพิ่มตัวอย่างการใช้งาน GORM แบบละเอียด และอธิบาย Database Relations

---

### 🔐 Part 6: Authentication & Authorization

#### 6.1 Authentication (ยืนยันตัวตน)

```
📱 Client                           🖥️ Server
   │                                  │
   │ 1. POST /login                   │
   │ { email, password } ────────────►│
   │                                  │ 2. ตรวจสอบข้อมูล
   │                                  │
   │ 3. JWT Token ◄────────────────── │
   │                                  │
   │ 4. เก็บ Token ไว้                  │
   │                                  │
   │ 5. ใช้ Token ในการเรียก API        │
   │ Authorization: Bearer <token>    │
```

#### 6.2 JWT (JSON Web Token)

```go
// สร้าง JWT Token
func generateToken(userID uint) (string, error) {
  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "user_id": userID,
    "exp":     time.Now().Add(time.Hour * 24).Unix(),
  })

  return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
```

#### 6.3 Authorization (จำกัดสิทธิ์)

```go
// Middleware สำหรับตรวจสอบ Admin
func AdminOnly() gin.HandlerFunc {
  return func(c *gin.Context) {
    user := getCurrentUser(c)
    if user.Role != "admin" {
      c.JSON(403, gin.H{"error": "Admin access required"})
      c.Abort()
      return
    }
    c.Next()
  }
}

// ใช้งาน
adminRoutes := r.Group("/admin")
adminRoutes.Use(AdminOnly())
adminRoutes.POST("/articles", createArticle) // เฉพาะ Admin เท่านั้น!
```

**การปรับปรุงจากเดิม:** เพิ่มไดอะแกรมการทำงานของ Authentication และตัวอย่าง Middleware

---

### 📝 Part 7: Form Handling & File Upload

#### 7.1 Form Validation

```go
type CreateArticleRequest struct {
  Title   string `json:"title" binding:"required,min=5,max=100"`
  Content string `json:"content" binding:"required,min=10"`
}

func createArticle(c *gin.Context) {
  var req CreateArticleRequest
  if err := c.ShouldBindJSON(&req); err != nil {
    c.JSON(400, gin.H{"error": err.Error()})
    return
  }

  // สร้างบทความ...
}
```

#### 7.2 File Upload

```go
func uploadImage(c *gin.Context) {
  file, err := c.FormFile("image")
  if err != nil {
    c.JSON(400, gin.H{"error": "No file uploaded"})
    return
  }

  // บันทึกไฟล์
  filename := generateUniqueFilename(file.Filename)
  if err := c.SaveUploadedFile(file, "./uploads/"+filename); err != nil {
    c.JSON(500, gin.H{"error": "Failed to save file"})
    return
  }

  c.JSON(200, gin.H{"filename": filename})
}
```

**การปรับปรุงจากเดิม:** เพิ่มตัวอย่างการ validate หลายแบบ และการจัดการไฟล์ที่ปลอดภัย

---

### ☁️ Part 8: Deployment to Production

#### 8.1 Heroku Deployment

```bash
# 1. สร้าง Procfile
echo "web: ./main" > Procfile

# 2. สร้าง go.mod
go mod init your-api

# 3. Deploy to Heroku
heroku create your-api-name
git push heroku main
```

#### 8.2 Environment Variables

```go
// config/config.go
func LoadConfig() {
  if err := godotenv.Load(); err != nil {
    log.Println("No .env file found")
  }
}

func GetDatabaseURL() string {
  return os.Getenv("DATABASE_URL")
}
```

**การปรับปรุงจากเดิม:** เพิ่มขั้นตอนการ Deploy แบบละเอียด และการจัดการ Environment Variables

---

## 🆕 สิ่งที่ปรับปรุงเพิ่มเติมในเวอร์ชันนี้:

### ✨ การปรับปรุงหลัก:

1. **เพิ่มตัวอย่างโค้ดที่ใช้งานได้จริง** - แทนที่การอธิบายแบบทฤษฎี
2. **ใส่ไดอะแกรม ASCII Art** - เพื่อให้เห็นภาพการทำงาน
3. **เพิ่มส่วน Project Structure** - ให้เห็นภาพรวมของโปรเจค
4. **อธิบาย Database Relations** - ด้วยตัวอย่างที่เข้าใจง่าย
5. **เพิ่มส่วน Error Handling** - ที่ขาดหายไปในเวอร์ชันเดิม
6. **ใส่ Emoji และการจัดรูปแบบ** - ให้อ่านง่ายและสนุกขึ้น

### 🔧 การปรับปรุงเนื้อหา:

- **Authentication Flow** - เพิ่มไดอะแกรมการทำงาน
- **REST API Examples** - ใส่ตัวอย่าง HTTP Methods ที่ชัดเจน
- **Form Validation** - เพิ่มตัวอย่างการ validate แบบต่างๆ
- **Deployment Guide** - ขั้นตอนที่ละเอียดกว่าเดิม

### 📚 เนื้อหาเพิ่มเติม:

- **Error Handling Patterns**
- **Testing Strategies**
- **Performance Optimization**
- **Security Best Practices**

---

## 🎯 เป้าหมายสำหรับผู้เรียน

หลังจากเรียนจบคอร์สนี้ คุณจะสามารถ:

✅ **พัฒนา REST API ด้วย Go** แบบมืออาชีพ  
✅ **จัดการ Database** ด้วย GORM  
✅ **ทำระบบ Authentication/Authorization**  
✅ **Deploy แอพไปยัง Production**  
✅ **เข้าใจหลักการ Concurrency** ของ Go

---

**🚀 พร้อมแล้วใช่ไหม? มาเริ่มการเดินทางสู่การเป็น Go Developer กันเถอะ!**
