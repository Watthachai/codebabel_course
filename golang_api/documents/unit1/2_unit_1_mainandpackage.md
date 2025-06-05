# Unit 1: Main Function และ Package ใน Go

## 📚 บทนำ

ในหัวข้อก่อนหน้านี้เราได้เรียนรู้วิธีการติดตั้งและใช้งานภาษา Go แล้ว ในหัวข้อนี้เราจะมาเจาะลึกเรื่องโครงสร้างพื้นฐานของโปรแกรม Go ที่ประกอบด้วย **Package** และ **Main Function**

## 🎯 สิ่งที่จะได้เรียนรู้

- โครงสร้างพื้นฐานของไฟล์ Go
- การทำงานของ Package System
- Main Function และความสำคัญ
- การ Import และใช้งาน Package

## 🚀 การสร้างไฟล์ Go พื้นฐาน

### การตั้งชื่อไฟล์

```go
// ตัวอย่างชื่อไฟล์ Go
main.go
app.go
server.go
hello-world.go
```

> 📝 **หมายเหตุ**: ไฟล์ Go จะต้องมีนามสกุล `.go` เท่านั้น

### โครงสร้างไฟล์หลัก (Entry Point)

```go
package main

import "fmt"

func main() {
  fmt.Println("Hello, Go 2025!")
}
```

## 📦 Package System ใน Go

### 1. Package คืออะไร?

**Package** คือกลุ่มของไฟล์ Go ที่อยู่ในโฟลเดอร์เดียวกัน และมีหน้าที่เฉพาะเจาะจง

```
📁 myproject/
├── 📄 main.go           (package main)
├── 📁 articles/
│   ├── 📄 article.go    (package articles)
│   ├── 📄 handler.go    (package articles)
│   └── 📄 service.go    (package articles)
├── 📁 users/
│   ├── 📄 user.go       (package users)
│   └── 📄 auth.go       (package users)
└── 📁 utils/
  └── 📄 helper.go     (package utils)
```

### 2. Package main - Entry Point

```go
package main  // ← บรรทัดนี้บอกว่าเป็น package หลัก

import "fmt"

func main() {  // ← function หลักที่จะรันก่อน
  fmt.Println("Program starts here!")
}
```

**🔍 สิ่งสำคัญ:**

- `package main` = โปรแกรมสามารถรันได้
- `func main()` = จุดเริ่มต้นการทำงาน
- Go จะหา package main และ func main() เพื่อเริ่มโปรแกรม

### 3. การ Import Package

#### Built-in Packages (Go 2025)

```go
package main

import (
  "fmt"          // สำหรับ print/format
  "log"          // สำหรับ logging
  "net/http"     // สำหรับ HTTP server/client
  "encoding/json" // สำหรับ JSON operations
  "context"      // สำหรับ context management (Go 1.7+)
  "time"         // สำหรับ time operations
)

func main() {
  // ใช้ fmt package
  fmt.Println("Hello World")

  // ใช้ time package
  now := time.Now()
  fmt.Printf("Current time: %v\n", now)

  // ใช้ log package
  log.Println("This is a log message")
}
```

#### Custom Packages

```go
// 📄 articles/article.go
package articles

type Article struct {
  ID    int    `json:"id"`
  Title string `json:"title"`
  Body  string `json:"body"`
}

func GetArticles() []Article {
  return []Article{
    {ID: 1, Title: "Go Basics", Body: "Learning Go..."},
    {ID: 2, Title: "Advanced Go", Body: "Deep dive..."},
  }
}
```

```go
// 📄 main.go
package main

import (
  "fmt"
  "myproject/articles"  // ← import custom package
)

func main() {
  articles := articles.GetArticles()
  for _, article := range articles {
    fmt.Printf("Article: %s\n", article.Title)
  }
}
```

## 🆕 การปรับปรุงจากเวอร์ชันเดิม (Go 2025 Updates)

### 1. Go Modules (เปลี่ยนจากเดิม)

```bash
# เดิม: ใช้ GOPATH
# ปัจจุบัน: ใช้ Go Modules
go mod init myproject
```

### 2. Improved Error Handling

```go
// Go 2025 - Enhanced error handling
package main

import (
  "fmt"
  "errors"
)

func divide(a, b float64) (float64, error) {
  if b == 0 {
    return 0, errors.New("division by zero")
  }
  return a / b, nil
}

func main() {
  result, err := divide(10, 0)
  if err != nil {
    fmt.Printf("Error: %v\n", err)
    return
  }
  fmt.Printf("Result: %.2f\n", result)
}
```

### 3. Generics Support (Go 1.18+)

```go
package main

import "fmt"

// Generic function - ใหม่ใน Go 2025
func PrintSlice[T any](slice []T) {
  for _, item := range slice {
    fmt.Println(item)
  }
}

func main() {
  numbers := []int{1, 2, 3, 4, 5}
  names := []string{"Alice", "Bob", "Charlie"}

  PrintSlice(numbers)  // ใช้กับ int slice
  PrintSlice(names)    // ใช้กับ string slice
}
```

## 📊 Visualization: Go Program Flow

```
┌─────────────────────────────────────┐
│          Go Program Structure       │
└─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│           package main              │
│  ┌─────────────────────────────┐    │
│  │         import (...)        │    │
│  │    - fmt                    │    │
│  │    - custom packages        │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │       func main() {         │    │
│  │         // Entry point      │    │
│  │         // Code here        │    │
│  │       }                     │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

## 🔧 ตัวอย่างโปรเจ็กต์สมบูรณ์

```go
// 📄 main.go
package main

import (
  "encoding/json"
  "fmt"
  "log"
  "net/http"
)

type Response struct {
  Message string `json:"message"`
  Status  string `json:"status"`
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
  response := Response{
    Message: "Server is running on Go 2025!",
    Status:  "OK",
  }

  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(response)
}

func main() {
  http.HandleFunc("/health", healthCheck)

  fmt.Println("🚀 Server starting on port 8080...")
  log.Fatal(http.ListenAndServe(":8080", nil))
}
```

## 📝 สรุปสิ่งที่เปลี่ยนแปลงจากเดิม

| หัวข้อ                 | เดิม        | Go 2025                    |
| ---------------------- | ----------- | -------------------------- |
| **Package Management** | GOPATH      | Go Modules                 |
| **Error Handling**     | พื้นฐาน     | Enhanced with context      |
| **Type System**        | No Generics | Full Generics Support      |
| **Performance**        | Good        | Optimized GC & Runtime     |
| **Standard Library**   | Limited     | Expanded with new packages |

## 🎯 Best Practices 2025

1. **ใช้ Go Modules เสมอ**

   ```bash
   go mod init project-name
   ```

2. **จัดระเบียบ Package**

   - ตั้งชื่อ package ให้สื่อความหมาย
   - แยก business logic ออกจาก main

3. **Error Handling**

   - จัดการ error ทุกครั้ง
   - ใช้ context สำหรับ timeout/cancellation

4. **Code Documentation**
   ```go
   // GetUserByID retrieves user information by ID
   // Returns user data and error if user not found
   func GetUserByID(id int) (*User, error) {
     // implementation
   }
   ```

ด้วยการเปลี่ยนแปลงเหล่านี้ Go กลายเป็นภาษาที่ทรงพลังและใช้งานง่ายมากขึ้นในปี 2025! 🎉
