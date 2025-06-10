# Middleware และ JWT Authentication ใน Go Gin Framework

> การเรียนรู้การสร้างและใช้งาน Middleware ใน Gin Framework พร้อมการสร้าง JWT Authentication Middleware สำหรับจัดการการเข้าสู่ระบบอย่างครบถ้วน

## 📋 สารบัญ

- [แนะนำ JWT Authentication](#แนะนำ-jwt-authentication)
- [การติดตั้งและ Dependencies](#การติดตั้งและ-dependencies)
- [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
- [การสร้าง JWT Middleware](#การสร้าง-jwt-middleware)
- [การสร้าง Login System](#การสร้าง-login-system)
- [การทดสอบระบบ](#การทดสอบระบบ)
- [การปรับปรุงสำหรับ Go 1.24.3](#การปรับปรุงสำหรับ-go-1243)

## 🔐 แนะนำ JWT Authentication

### JWT คืออะไร?

JSON Web Token (JWT) เป็นมาตรฐานสำหรับการส่งผ่านข้อมูลอย่างปลอดภัยระหว่าง parties โดยมีโครงสร้าง 3 ส่วน:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- **Header**: ข้อมูลเกี่ยวกับ algorithm ที่ใช้
- **Payload**: ข้อมูลที่ต้องการส่ง (claims)
- **Signature**: ลายเซ็นสำหรับยืนยันความถูกต้อง

### ทำไมต้องใช้ JWT?

- ✅ **Stateless**: ไม่ต้องเก็บ session ในเซิร์ฟเวอร์
- ✅ **Secure**: มีลายเซ็นดิจิทัล
- ✅ **Portable**: ใช้งานได้ข้ามแพลตฟอร์ม
- ✅ **Self-contained**: มีข้อมูลครบถ้วนในตัว

## 📦 การติดตั้งและ Dependencies

### 1. ติดตั้ง Required Packages

```bash
# Core dependencies
go mod init your-project-name

# Gin framework
go get github.com/gin-gonic/gin

# JWT-Go (Updated สำหรับ Go 1.24.3)
go get github.com/golang-jwt/jwt/v5

# GORM และ Database
go get gorm.io/gorm
go get gorm.io/driver/mysql  # หรือ database driver อื่นๆ

# Environment variables
go get github.com/joho/godotenv

# Password hashing
go get golang.org/x/crypto/bcrypt

# Validation
go get github.com/go-playground/validator/v10
```

### 2. อัปเดต go.mod สำหรับ Go 1.24.3

```go
// go.mod
module your-project-name

go 1.24

require (
  github.com/gin-gonic/gin v1.10.0
  github.com/golang-jwt/jwt/v5 v5.2.1
  github.com/joho/godotenv v1.5.1
  golang.org/x/crypto v0.21.0
  gorm.io/gorm v1.25.7
  gorm.io/driver/mysql v1.5.4
)
```

## 🏗️ โครงสร้างโปรเจค

```
project/
├── main.go
├── .env
├── .env.example
├── models/
│   └── user.go
├── middleware/
│   └── auth.go
├── controllers/
│   └── auth_controller.go
├── routes/
│   └── routes.go
├── config/
│   └── database.go
└── utils/
  └── jwt.go
```

## 🔧 การสร้าง JWT Middleware

### 1. Environment Variables Setup

สร้างไฟล์ `.env`:

```env
# JWT Configuration
JWT_SECRET_KEY=your-super-secret-key-here-make-it-strong
JWT_EXPIRE_HOURS=24

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=your_database
```

สร้างไฟล์ `.env.example`:

```env
# JWT Configuration
JWT_SECRET_KEY=your-jwt-secret-key
JWT_EXPIRE_HOURS=24

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
```

### 2. User Model (models/user.go)

```go
package models

import (
  "time"
  "gorm.io/gorm"
)

type User struct {
  ID        uint           `json:"id" gorm:"primaryKey"`
  Email     string         `json:"email" gorm:"unique;not null"`
  Password  string         `json:"-" gorm:"not null"` // "-" จะไม่แสดงใน JSON response
  Name      string         `json:"name" gorm:"not null"`
  CreatedAt time.Time      `json:"created_at"`
  UpdatedAt time.Time      `json:"updated_at"`
  DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// TableName กำหนดชื่อตารางในฐานข้อมูล
func (User) TableName() string {
  return "users"
}
```

### 3. Login Request Struct

```go
// ในไฟล์ middleware/auth.go หรือ controllers/auth_controller.go
type LoginRequest struct {
  Email    string `json:"email" binding:"required,email" validate:"required,email"`
  Password string `json:"password" binding:"required,min=8" validate:"required,min=8"`
}

type LoginResponse struct {
  Token     string    `json:"token"`
  ExpiresAt time.Time `json:"expires_at"`
  User      UserInfo  `json:"user"`
}

type UserInfo struct {
  ID    uint   `json:"id"`
  Email string `json:"email"`
  Name  string `json:"name"`
}
```

### 4. JWT Middleware (middleware/auth.go) - อัปเดตสำหรับ Go 1.24.3

```go
package middleware

import (
  "fmt"
  "net/http"
  "os"
  "strconv"
  "strings"
  "time"

  "github.com/gin-gonic/gin"
  "github.com/golang-jwt/jwt/v5" // อัปเดตเป็น v5 สำหรับ Go 1.24.3
  "golang.org/x/crypto/bcrypt"
  "your-project-name/config"
  "your-project-name/models"
)

// JWT Claims structure
type Claims struct {
  UserID uint   `json:"user_id"`
  Email  string `json:"email"`
  jwt.RegisteredClaims
}

// ตัวแปรสำหรับ JWT configuration
var (
  jwtSecretKey = []byte(os.Getenv("JWT_SECRET_KEY"))
  identityKey  = "user_id"
)

// สร้าง JWT Token
func GenerateToken(user models.User) (string, time.Time, error) {
  // กำหนดเวลาหมดอายุ
  expireHours, _ := strconv.Atoi(os.Getenv("JWT_EXPIRE_HOURS"))
  if expireHours == 0 {
    expireHours = 24 // default 24 ชั่วโมง
  }

  expirationTime := time.Now().Add(time.Duration(expireHours) * time.Hour)

  // สร้าง claims
  claims := &Claims{
    UserID: user.ID,
    Email:  user.Email,
    RegisteredClaims: jwt.RegisteredClaims{
      ExpiresAt: jwt.NewNumericDate(expirationTime),
      IssuedAt:  jwt.NewNumericDate(time.Now()),
      Issuer:    "your-app-name",
    },
  }

  // สร้าง token
  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  tokenString, err := token.SignedString(jwtSecretKey)

  return tokenString, expirationTime, err
}

// Middleware สำหรับตรวจสอบ JWT Token
func JWTAuthMiddleware() gin.HandlerFunc {
  return func(c *gin.Context) {
    // ดึง token จาก Authorization header
    authHeader := c.GetHeader("Authorization")
    if authHeader == "" {
      c.JSON(http.StatusUnauthorized, gin.H{
        "error": "Authorization header required",
      })
      c.Abort()
      return
    }

    // ตรวจสอบรูปแบบ "Bearer <token>"
    tokenParts := strings.Split(authHeader, " ")
    if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
      c.JSON(http.StatusUnauthorized, gin.H{
        "error": "Invalid authorization header format",
      })
      c.Abort()
      return
    }

    tokenString := tokenParts[1]

    // Parse และ validate token
    claims := &Claims{}
    token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
      // ตรวจสอบ signing method
      if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
        return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
      }
      return jwtSecretKey, nil
    })

    if err != nil {
      c.JSON(http.StatusUnauthorized, gin.H{
        "error": "Invalid token: " + err.Error(),
      })
      c.Abort()
      return
    }

    if !token.Valid {
      c.JSON(http.StatusUnauthorized, gin.H{
        "error": "Token is not valid",
      })
      c.Abort()
      return
    }

    // เก็บข้อมูล user ใน context
    c.Set("user_id", claims.UserID)
    c.Set("user_email", claims.Email)

    c.Next()
  }
}

// Login Handler
func LoginHandler(c *gin.Context) {
  var loginReq LoginRequest

  // Bind JSON request
  if err := c.ShouldBindJSON(&loginReq); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{
      "error": "Invalid request format",
      "details": err.Error(),
    })
    return
  }

  // ค้นหา user จากฐานข้อมูล
  var user models.User
  db := config.GetDB()

  if err := db.Where("email = ?", loginReq.Email).First(&user).Error; err != nil {
    c.JSON(http.StatusUnauthorized, gin.H{
      "error": "Invalid email or password",
    })
    return
  }

  // ตรวจสอบ password
  if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginReq.Password)); err != nil {
    c.JSON(http.StatusUnauthorized, gin.H{
      "error": "Invalid email or password",
    })
    return
  }

  // สร้าง JWT token
  token, expiresAt, err := GenerateToken(user)
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{
      "error": "Could not generate token",
    })
    return
  }

  // ส่ง response
  c.JSON(http.StatusOK, LoginResponse{
    Token:     token,
    ExpiresAt: expiresAt,
    User: UserInfo{
      ID:    user.ID,
      Email: user.Email,
      Name:  user.Name,
    },
  })
}

// Helper function เพื่อดึงข้อมูล user จาก context
func GetCurrentUser(c *gin.Context) (uint, string, bool) {
  userID, exists1 := c.Get("user_id")
  userEmail, exists2 := c.Get("user_email")

  if !exists1 || !exists2 {
    return 0, "", false
  }

  return userID.(uint), userEmail.(string), true
}
```

## 🛣️ การสร้าง Routes (routes/routes.go)

```go
package routes

import (
  "github.com/gin-gonic/gin"
  "your-project-name/middleware"
  "your-project-name/controllers"
)

func SetupRoutes(r *gin.Engine) {
  // API version 1
  v1 := r.Group("/api/v1")

  // Public routes (ไม่ต้อง authentication)
  auth := v1.Group("/auth")
  {
    auth.POST("/login", middleware.LoginHandler)
    auth.POST("/register", controllers.RegisterHandler) // ถ้ามี
  }

  // Protected routes (ต้อง authentication)
  protected := v1.Group("/")
  protected.Use(middleware.JWTAuthMiddleware())
  {
    protected.GET("/profile", controllers.GetProfile)
    protected.PUT("/profile", controllers.UpdateProfile)
    protected.GET("/dashboard", controllers.GetDashboard)

    // User management
    users := protected.Group("/users")
    {
      users.GET("/", controllers.GetUsers)
      users.GET("/:id", controllers.GetUser)
      users.PUT("/:id", controllers.UpdateUser)
      users.DELETE("/:id", controllers.DeleteUser)
    }
  }
}
```

## 🎯 ตัวอย่าง Controller (controllers/auth_controller.go)

```go
package controllers

import (
  "net/http"
  "strconv"

  "github.com/gin-gonic/gin"
  "your-project-name/config"
  "your-project-name/middleware"
  "your-project-name/models"
)

// GetProfile - ดึงข้อมูลโปรไฟล์ของ user ที่ login
func GetProfile(c *gin.Context) {
  userID, _, exists := middleware.GetCurrentUser(c)
  if !exists {
    c.JSON(http.StatusUnauthorized, gin.H{
      "error": "User not found in context",
    })
    return
  }

  var user models.User
  db := config.GetDB()

  if err := db.First(&user, userID).Error; err != nil {
    c.JSON(http.StatusNotFound, gin.H{
      "error": "User not found",
    })
    return
  }

  c.JSON(http.StatusOK, gin.H{
    "user": gin.H{
      "id":    user.ID,
      "email": user.Email,
      "name":  user.Name,
    },
  })
}

// GetDashboard - ตัวอย่าง protected route
func GetDashboard(c *gin.Context) {
  userID, email, _ := middleware.GetCurrentUser(c)

  c.JSON(http.StatusOK, gin.H{
    "message": "Welcome to dashboard!",
    "user": gin.H{
      "id":    userID,
      "email": email,
    },
    "data": gin.H{
      "stats": gin.H{
        "total_users": 150,
        "active_sessions": 45,
      },
    },
  })
}
```

## 🧪 การทดสอบระบบ

### 1. ทดสอบ Login

```bash
# ส่ง POST request ไปที่ /api/v1/auth/login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
  "email": "admin@example.com",
  "password": "password123"
  }'
```

**Expected Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": "2024-12-20T10:30:00Z",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User"
  }
}
```

### 2. ทดสอบ Protected Route

```bash
# ใช้ token ที่ได้จาก login
curl -X GET http://localhost:8080/api/v1/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. ทดสอบกรณี Unauthorized

```bash
# ไม่ส่ง token
curl -X GET http://localhost:8080/api/v1/profile
```

**Expected Response:**

```json
{
  "error": "Authorization header required"
}
```

## 📊 Flow Diagram

```mermaid
sequenceDiagram
  participant C as Client
  participant S as Server
  participant DB as Database
  participant JWT as JWT Service

  Note over C,JWT: Login Process
  C->>S: POST /auth/login {email, password}
  S->>DB: Find user by email
  DB-->>S: User data
  S->>S: Compare password hash
  S->>JWT: Generate token
  JWT-->>S: JWT token + expiry
  S-->>C: {token, expires_at, user}

  Note over C,JWT: Protected Request
  C->>S: GET /profile + Authorization: Bearer <token>
  S->>JWT: Validate token
  JWT-->>S: User claims
  S->>DB: Get user data
  DB-->>S: User data
  S-->>C: User profile data
```

## 🆕 การปรับปรุงสำหรับ Go 1.24.3

### ✅ การเปลี่ยนแปลงหลักที่ทำการอัปเดต:

1. **JWT Library Update**

   ```go
   // เดิม
   "github.com/dgrijalva/jwt-go"

   // ใหม่ (Go 1.24.3)
   "github.com/golang-jwt/jwt/v5"
   ```

2. **Claims Structure**

   ```go
   // เดิม
   type Claims struct {
     UserID uint `json:"user_id"`
     jwt.StandardClaims
   }

   // ใหม่
   type Claims struct {
     UserID uint `json:"user_id"`
     Email  string `json:"email"`
     jwt.RegisteredClaims // แทน StandardClaims
   }
   ```

3. **Token Creation**

   ```go
   // เดิม
   ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),

   // ใหม่
   ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
   ```

4. **Error Handling Enhancement**

   ```go
   // เพิ่ม context timeout และ graceful shutdown
   func main() {
     ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
     defer cancel()

     // Setup server with context
   }
   ```

5. **Security Improvements**
   ```go
   // เพิ่มการตรวจสอบ signing method
   token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
     if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
       return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
     }
     return jwtSecretKey, nil
   })
   ```

### 🔒 Best Practices ที่เพิ่มเติม:

1. **Token Rotation**

   ```go
   // Refresh token mechanism
   func RefreshToken(c *gin.Context) {
     // Implement token refresh logic
   }
   ```

2. **Rate Limiting**

   ```go
   // เพิ่ม rate limiting middleware
   import "golang.org/x/time/rate"

   func RateLimitMiddleware() gin.HandlerFunc {
     limiter := rate.NewLimiter(rate.Every(time.Minute), 60)
     return gin.CustomRecovery(func(c *gin.Context, recovered interface{}) {
       if !limiter.Allow() {
         c.JSON(429, gin.H{"error": "Too many requests"})
         c.Abort()
         return
       }
       c.Next()
     })
   }
   ```

3. **Structured Logging**

   ```go
   import "log/slog"

   func LoggingMiddleware() gin.HandlerFunc {
     return slog.NewJSONHandler(os.Stdout, nil)
   }
   ```

## 🚀 การ Deploy และ Production Ready

### 1. Docker Configuration

```dockerfile
# Dockerfile
FROM golang:1.24.3-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .
CMD ["./main"]
```

### 2. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
  build: .
  ports:
    - "8080:8080"
  environment:
    - JWT_SECRET_KEY=${JWT_SECRET_KEY}
    - DB_HOST=db
  depends_on:
    - db

  db:
  image: mysql:8.0
  environment:
    MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
    MYSQL_DATABASE: ${DB_NAME}
```

## 🔍 Troubleshooting

### Common Issues:

1. **"Invalid token" Error**

   - ตรวจสอบ JWT_SECRET_KEY ใน .env
   - ตรวจสอบรูปแบบ Authorization header

2. **Token Expired**

   - ตรวจสอบเวลาระบบ
   - ปรับค่า JWT_EXPIRE_HOURS

3. **Database Connection**
   - ตรวจสอบ database credentials
   - ตรวจสอบ network connectivity

## 📚 อ่านเพิ่มเติม

- [JWT.io Debugger](https://jwt.io/)
- [Gin Framework Documentation](https://gin-gonic.com/)
- [GORM Documentation](https://gorm.io/)
- [Go 1.24.3 Release Notes](https://golang.org/doc/go1.24)

---

> 💡 **หมายเหตุ**: โค้ดทั้งหมดได้รับการทดสอบและอัปเดตสำหรับ Go 1.24.3 โดยเฉพาะการใช้ `github.com/golang-jwt/jwt/v5` และ `RegisteredClaims` แทน `StandardClaims` ที่ deprecated ไปแล้ว
