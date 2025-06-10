# Deployment Guide for Go API

การเตรียมความพร้อมและการส่งมอบโค้ดสู่ Production Environment สำหรับ Go API ในปี 2024

## 📋 Table of Contents

- [Overview](#overview)
- [Local Deployment](#local-deployment)
- [Cloud Platform Alternatives](#cloud-platform-alternatives)
- [Environment Variables Setup](#environment-variables-setup)
- [Building and Running](#building-and-running)
- [Modern Deployment Strategies](#modern-deployment-strategies)
- [Best Practices](#best-practices)

## 🎯 Overview

การ Deploy Go API ในปัจจุบันมีหลายวิธีการและแพลตฟอร์มให้เลือกใช้ หลังจากที่ Heroku เปลี่ยนนโยบายเป็นบริการแบบเสียเงิน เราจึงมีทางเลือกใหม่ๆ ที่น่าสนใจมากมาย

### สิ่งที่เปลี่ยนแปลงจากคอร์สเดิม:

- ✅ อัปเดต Go เป็น version 1.24.3 (ล่าสุด)
- ✅ เพิ่มทางเลือกแพลตฟอร์มฟรีแทน Heroku
- ✅ ปรับปรุงการจัดการ Environment Variables
- ✅ เพิ่มการใช้ Docker สำหรับ Containerization
- ✅ ใช้ Go Modules แทน GOPATH
- ✅ เพิ่ม Security Best Practices

## 🏠 Local Deployment

### 1. Environment Variables Configuration

ในการพัฒนาจริง เราจะแยกการตั้งค่าระหว่าง Development และ Production

#### สำหรับ macOS/Linux:

```bash
# สร้าง secret key ด้วย UUID
export SECRET_KEY=$(uuidgen)
export HOST=localhost:5000
export PORT=5000
export APP_ENV=production
export GIN_MODE=release
export DATABASE_URL="your_database_connection_string"
```

#### สำหรับ Windows (PowerShell):

```powershell
$env:SECRET_KEY=[System.Guid]::NewGuid().ToString()
$env:HOST="localhost:5000"
$env:PORT="5000"
$env:APP_ENV="production"
$env:GIN_MODE="release"
$env:DATABASE_URL="your_database_connection_string"
```

### 2. อัปเดต main.go สำหรับ Production

```go
package main

import (
  "log"
  "os"

  "github.com/joho/godotenv"
)

func main() {
  // โหลด .env เฉพาะใน development
  if os.Getenv("APP_ENV") != "production" {
    if err := godotenv.Load(); err != nil {
      log.Println("No .env file found")
    }
  }

  // ตั้งค่า Gin mode
  if os.Getenv("GIN_MODE") == "release" {
    gin.SetMode(gin.ReleaseMode)
  }

  // เริ่มต้น server
  startServer()
}
```

### 3. Building และ Running

```bash
# Build สำหรับ production
go mod tidy
go build -o app .

# รันโปรแกรม
./app
```

## ☁️ Cloud Platform Alternatives

เนื่องจาก Heroku ไม่ฟรีแล้ว นี่คือทางเลือกที่แนะนำในปี 2024:

### 🆓 Free Tier Platforms

#### 1. **Railway** (แนะนำ #1)

```bash
# ติดตั้ง Railway CLI
npm install -g @railway/cli

# Login และ deploy
railway login
railway init
railway up
```

**ข้อดี:**

- ✅ Free tier ใจกว้าง (500 ชั่วโมง/เดือน)
- ✅ รองรับ Go โดยตรง
- ✅ Database ในตัว
- ✅ Simple deployment

#### 2. **Render**

```yaml
# render.yaml
services:
  - type: web
  name: go-api
  env: go
  buildCommand: go build -o app .
  startCommand: ./app
```

#### 3. **Fly.io**

```bash
# ติดตั้ง flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

#### 4. **Vercel** (สำหรับ Serverless)

```json
{
  "functions": {
    "api/*.go": {
      "runtime": "@vercel/go"
    }
  }
}
```

### 💰 Paid but Affordable Options

1. **DigitalOcean App Platform** - $5/เดือน
2. **Google Cloud Run** - Pay per use
3. **AWS Lambda + API Gateway** - Serverless
4. **Azure Container Instances**

## 🐳 Modern Deployment with Docker

### Dockerfile (Multi-stage build)

```dockerfile
# Build stage
FROM golang:1.24.3-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Production stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]
```

### Docker Compose สำหรับ Local Development

```yaml
version: '3.8'

services:
  api:
  build: .
  ports:
    - "8080:8080"
  environment:
    - DATABASE_URL=postgres://user:password@db:5432/mydb
    - GIN_MODE=debug
  depends_on:
    - db

  db:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: mydb
    POSTGRES_USER: user
    POSTGRES_PASSWORD: password
  volumes:
    - postgres_data:/var/lib/postgresql/data
  ports:
    - "5432:5432"

volumes:
  postgres_data:
```

## 🔧 Go 1.24.3 Specific Updates

### 1. Go.mod Configuration

```go
module your-api

go 1.24

require (
  github.com/gin-gonic/gin v1.9.1
  github.com/joho/godotenv v1.5.1
  gorm.io/gorm v1.25.5
  gorm.io/driver/postgres v1.5.4
)
```

### 2. Updated Error Handling

```go
// ใช้ errors.Join (Go 1.20+)
import "errors"

func handleMultipleErrors(err1, err2 error) error {
  if err1 != nil || err2 != nil {
    return errors.Join(err1, err2)
  }
  return nil
}
```

### 3. Context Improvements

```go
// ใช้ context.WithTimeout แบบใหม่
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()
```

## 🛡️ Security Best Practices

### 1. Environment Variables Validation

```go
func validateEnv() {
  required := []string{
    "DATABASE_URL",
    "SECRET_KEY",
    "PORT",
  }

  for _, env := range required {
    if os.Getenv(env) == "" {
      log.Fatalf("Required environment variable %s is not set", env)
    }
  }
}
```

### 2. Secure Headers Middleware

```go
func SecurityMiddleware() gin.HandlerFunc {
  return gin.HandlerFunc(func(c *gin.Context) {
    c.Header("X-Frame-Options", "DENY")
    c.Header("Content-Security-Policy", "default-src 'self'")
    c.Header("X-Content-Type-Options", "nosniff")
    c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
    c.Header("X-Permitted-Cross-Domain-Policies", "none")
    c.Next()
  })
}
```

## 📊 Monitoring และ Logging

### 1. Structured Logging

```go
import "log/slog"

func setupLogger() {
  if os.Getenv("GIN_MODE") == "release" {
    slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
  } else {
    slog.SetDefault(slog.New(slog.NewTextHandler(os.Stdout, nil)))
  }
}
```

### 2. Health Check Endpoint

```go
func healthCheck(c *gin.Context) {
  c.JSON(200, gin.H{
    "status": "healthy",
    "timestamp": time.Now().Unix(),
    "version": os.Getenv("APP_VERSION"),
  })
}
```

## 🚀 CI/CD Pipeline Example

### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
  branches: [main]

jobs:
  deploy:
  runs-on: ubuntu-latest

  steps:
    - uses: actions/checkout@v4

    - name: Set up Go
      uses: actions/setup-go@v4
      with:
      go-version: "1.24.3"

    - name: Run tests
      run: go test -v ./...

    - name: Build
      run: go build -v .

    - name: Deploy to Railway
      uses: railway/github-action@v1
      with:
      token: ${{ secrets.RAILWAY_TOKEN }}
```

## ✅ Deployment Checklist

### Pre-deployment

- [ ] อัปเดต Go เป็น version 1.24.3
- [ ] ตรวจสอบ go.mod dependencies
- [ ] รัน `go mod tidy`
- [ ] ทดสอบ unit tests
- [ ] ตรวจสอบ security vulnerabilities
- [ ] เตรียม environment variables

### During deployment

- [ ] สร้าง production database
- [ ] ตั้งค่า environment variables
- [ ] Deploy code
- [ ] รัน database migrations
- [ ] ทดสอบ health check endpoint

### Post-deployment

- [ ] ตรวจสอบ logs
- [ ] ทดสอบ API endpoints
- [ ] ตรวจสอบ performance
- [ ] ตั้งค่า monitoring และ alerts

## 🎉 Summary

การ Deploy Go API ในปี 2024 มีทางเลือกมากมายและเครื่องมือที่ดีขึ้น ไม่ว่าจะเป็น:

1. **Railway** - ทางเลือกที่ดีที่สุดแทน Heroku
2. **Docker** - Standard สำหรับ containerization
3. **Go 1.24.3** - Performance และ security ที่ดีขึ้น
4. **Modern CI/CD** - Automated deployment pipeline

แนะนำให้เริ่มต้นด้วย Railway สำหรับโปรเจคเล็กๆ และเมื่อโปรเจคใหญ่ขึ้นค่อยพิจารณาย้ายไป Cloud providers อื่นๆ ตามความต้องการ

**Happy Deploying! 🚀**
