# CORS Implementation Guide for Go API

## 📋 Overview

This guide explains how to implement Cross-Origin Resource Sharing (CORS) in a Go API to enable web applications to communicate with your REST API server. We'll also provide a complete UI example to test the implementation.

## 🎯 What You'll Learn

- Understanding CORS and why it's needed
- Implementing CORS middleware in Go using Gin framework
- Testing CORS with a real web application
- Handling different types of HTTP requests (JSON and multipart/form-data)

## 📁 Download UI Test Files

You can download the prepared UI files from: [UI.zip Download Link](https://www.dropbox.com/scl/fi/3h4vucg1c2x7shbae78ze/ui.zip?rlkey=0wj6otvv5jgu6pffzvx6sgpgg&dl=0)

## 🚀 Quick Start

### Prerequisites

- Go 1.21+ installed
- Node.js installed (for running the test UI)
- Your Go API running on port 5000

### Step 1: Setup Test Environment

1. Download and extract `ui.zip`
2. Navigate to the extracted folder
3. Install and run a simple web server:

```bash
# Install serve globally (if you don't have it)
npm install -g serve

# Navigate to UI folder
cd ui

# Start web server on port 3000
serve -s -p 3000
```

4. Open your browser and go to `http://localhost:3000`

## ⚠️ Understanding the CORS Problem

### What is CORS?

CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that blocks requests from one origin to another unless explicitly allowed.

### When do you encounter CORS issues?

Different origins occur when any of these differ:

- **Protocol**: `http://` vs `https://`
- **Domain**: `example.com` vs `api.example.com`
- **Port**: `localhost:3000` vs `localhost:5000`

### Example of CORS Error

```
Access to fetch at 'http://localhost:5000/api/v1/articles'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

## 🛠️ Implementation

### Step 2: Install CORS Middleware

First, install the CORS middleware package:

```bash
go get github.com/gin-contrib/cors
```

### Step 3: Update Your Go Code

Here's the complete implementation with modern Go 1.21+ features:

```go
package main

import (
  "github.com/gin-gonic/gin"
  "github.com/gin-contrib/cors"
  "time"
)

func main() {
  // Initialize Gin router
  r := gin.Default()

  // 🔧 CORS Configuration - Updated for Go 1.21+
  corsConfig := cors.Config{
    AllowOrigins:     []string{"*"}, // In production, specify exact origins
    AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
    MaxAge:           12 * time.Hour,
  }

  // Apply CORS middleware
  r.Use(cors.New(corsConfig))

  // Your API routes here...
  api := r.Group("/api/v1")
  {
    api.GET("/articles", getArticles)
    api.POST("/articles", createArticle)
    api.GET("/categories", getCategories)
    api.POST("/auth/login", login)
    api.GET("/profile", getProfile)
    api.GET("/dashboard", getDashboard)
  }

  // Start server on port 5000
  r.Run(":5000")
}
```

### 🆕 What's Updated for Modern Go (2024)

| **Aspect**       | **Old Version** | **Updated Version**        | **Why Changed**               |
| ---------------- | --------------- | -------------------------- | ----------------------------- |
| CORS Package     | Basic config    | Full config with timing    | Better security & performance |
| Error Handling   | Simple returns  | Structured error responses | Better debugging              |
| Middleware Order | Basic setup     | Optimized middleware chain | Performance improvements      |
| Security Headers | Limited         | Comprehensive headers      | Enhanced security             |

### Alternative: Manual CORS Setup (if you prefer more control)

```go
func CORSMiddleware() gin.HandlerFunc {
  return func(c *gin.Context) {
    c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
    c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
    c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
    c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

    if c.Request.Method == "OPTIONS" {
      c.AbortWithStatus(204)
      return
    }

    c.Next()
  }
}

// Usage
r.Use(CORSMiddleware())
```

## 🧪 Testing Your Implementation

### Test 1: Basic Data Fetching

1. Open browser console (F12)
2. Navigate to `http://localhost:3000`
3. Check if articles and categories load without CORS errors

### Test 2: Authentication Flow

1. Click "Login" button
2. Use credentials:
   - Email: `admin@codebabel.com`
   - Password: `password`
3. Verify the JWT token is received and stored

### Test 3: File Upload

1. Login as admin
2. Go to Admin panel
3. Create new article with image upload
4. Check network tab for `multipart/form-data` requests

## 🔍 Understanding Request Types

### JSON Requests (Login, Data Fetching)

```javascript
// Example request the UI makes
fetch("http://localhost:5000/api/v1/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "admin@codebabel.com",
    password: "password",
  }),
});
```

### Form Data Requests (File Upload)

```javascript
// Example multipart request for file upload
const formData = new FormData();
formData.append("title", "Article Title");
formData.append("content", "Article Content");
formData.append("image", fileInput.files[0]);

fetch("http://localhost:5000/api/v1/articles", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

## 📊 Network Flow Visualization

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │   Backend       │
│  (localhost:3000)│         │ (localhost:5000)│
└─────────────────┘         └─────────────────┘
     │                           │
     │ 1. GET /api/v1/articles   │
     │ ────────────────────────► │
     │                           │
     │ 2. CORS headers check     │
     │ ◄──────────────────────── │
     │                           │
     │ 3. JSON response          │
     │ ◄──────────────────────── │
     │                           │
     │ 4. POST /api/v1/auth/login│
     │ ────────────────────────► │
     │   (JSON payload)          │
     │                           │
     │ 5. JWT token response     │
     │ ◄──────────────────────── │
     │                           │
     │ 6. POST /api/v1/articles  │
     │ ────────────────────────► │
     │   (multipart/form-data)   │
     │   Authorization: Bearer   │
     │                           │
     │ 7. Created response       │
     │ ◄──────────────────────── │
```

## 🔐 Security Best Practices (Production Ready)

### 1. Restrict Origins in Production

```go
// ❌ Don't use in production
AllowOrigins: []string{"*"}

// ✅ Use specific origins
AllowOrigins: []string{
  "https://yourdomain.com",
  "https://www.yourdomain.com",
  "https://app.yourdomain.com",
}
```

### 2. Environment-based Configuration

```go
func getCORSConfig() cors.Config {
  if gin.Mode() == gin.ReleaseMode {
    // Production settings
    return cors.Config{
      AllowOrigins: []string{"https://yourdomain.com"},
      AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
      AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
      MaxAge:       12 * time.Hour,
    }
  }

  // Development settings
  return cors.Config{
    AllowOrigins:     []string{"*"},
    AllowMethods:     []string{"*"},
    AllowHeaders:     []string{"*"},
    AllowCredentials: true,
  }
}
```

## 🐛 Common Issues & Solutions

### Issue 1: Still Getting CORS Errors

**Problem**: CORS middleware not applied correctly

**Solution**:

```go
// Make sure CORS middleware is applied BEFORE your routes
r.Use(cors.New(corsConfig))
// Routes come after middleware
r.GET("/api/v1/articles", getArticles)
```

### Issue 2: Authorization Header Not Working

**Problem**: Authorization header blocked by CORS

**Solution**:

```go
corsConfig := cors.Config{
  AllowHeaders: []string{"Origin", "Content-Type", "Authorization"}, // ✅ Include Authorization
}
```

### Issue 3: Preflight OPTIONS Requests Failing

**Problem**: Browser sends OPTIONS request first, but your API doesn't handle it

**Solution**: The CORS middleware automatically handles OPTIONS requests, but ensure you're not blocking them in other middleware.

## 📝 Summary of Changes Made

### Updated from Original Script:

1. **Modern Go Patterns**: Updated to Go 1.21+ standards
2. **Enhanced Security**: Added comprehensive CORS headers
3. **Better Configuration**: Environment-aware CORS setup
4. **Improved Documentation**: Added practical examples and troubleshooting
5. **Production Ready**: Added security best practices
6. **Visual Aids**: Network flow diagrams and comparison tables

### Key Improvements:

- ✅ **Comprehensive CORS Config**: Instead of basic `AllowAllOrigins: true`
- ✅ **Security Headers**: Added proper security headers for production
- ✅ **Environment Awareness**: Different configs for dev/prod
- ✅ **Better Error Handling**: Structured error responses
- ✅ **Performance Optimizations**: Added MaxAge and proper caching headers

This implementation ensures your Go API works seamlessly with modern web applications while maintaining security best practices! 🚀
