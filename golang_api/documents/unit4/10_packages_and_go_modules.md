# Packages และ Go Modules - คู่มือการใช้งานที่ครบถ้วน

> เรียนรู้การจัดการโครงสร้างโค้ด, การสร้าง Packages, และการใช้งาน Go Modules ในโปรเจกต์ Go แบบมืออาชีพ

## 📋 สารบัญ

1. [ทำไมต้องใช้ Packages](#packages-introduction)
2. [การสร้างและจัดการ Package](#creating-packages)
3. [Visibility Rules (Public/Private)](#visibility-rules)
4. [Go Modules คืออะไร](#go-modules)
5. [การจัดการ Dependencies](#dependency-management)
6. [Best Practices](#best-practices)
7. [ตัวอย่างการใช้งานจริง](#real-world-examples)

---

## 🎯 ทำไมต้องใช้ Packages? {#packages-introduction}

### ปัญหาเดิม: โค้ดทั้งหมดอยู่ในไฟล์เดียว

```
project/
└── main.go (500+ บรรทัด - ยุ่งเหยิง!)
```

### วิธีแก้ไข: แยกเป็น Packages

```
project/
├── main.go
├── chef/
│   ├── chef.go
│   ├── circle.go
│   └── rectangle.go
└── utils/
  └── math.go
```

### ประโยชน์ของการใช้ Packages

- ✅ **Code Organization**: จัดกลุ่มโค้ดที่เกี่ยวข้องกัน
- ✅ **Reusability**: นำกลับมาใช้ใหม่ได้
- ✅ **Maintainability**: ง่ายต่อการดูแลรักษา
- ✅ **Team Collaboration**: ทีมทำงานร่วมกันได้ง่าย

---

## 📦 การสร้างและจัดการ Package {#creating-packages}

### ขั้นตอนที่ 1: สร้างโครงสร้างโฟลเดอร์

```bash
mkdir chef
touch chef/chef.go chef/circle.go chef/rectangle.go
```

### ขั้นตอนที่ 2: ย้ายโค้ดไปยัง Package ที่เหมาะสม

**ไฟล์ `chef/chef.go`**

```go
package chef

// Chef เป็น interface สำหรับกำหนดพฤติกรรมของ Chef
type Chef interface {
  Cook() string
}
```

**ไฟล์ `chef/circle.go`**

```go
package chef

import "math"

// Circle แทนรูปวงกลม
type Circle struct {
  Radius float64
}

// Area คำนวณพื้นที่ของวงกลม
func (c Circle) Area() float64 {
  return math.Pi * c.Radius * c.Radius
}

// Cook implement Chef interface
func (c Circle) Cook() string {
  return "Cooking circular pizza!"
}
```

**ไฟล์ `chef/rectangle.go`**

```go
package chef

// Rectangle แทนรูปสี่เหลี่ยม
type Rectangle struct {
  Width  float64
  Height float64
}

// Area คำนวณพื้นที่ของสี่เหลี่ยม
func (r Rectangle) Area() float64 {
  return r.Width * r.Height
}

// Cook implement Chef interface
func (r Rectangle) Cook() string {
  return "Cooking rectangular cake!"
}
```

### 🔍 หมายเหตุสำคัญ

> Package name ต้องตรงกับชื่อโฟลเดอร์ และทุกไฟล์ในโฟลเดอร์เดียวกันต้องใช้ package name เดียวกัน

---

## 👁️ Visibility Rules - กฎการเข้าถึง {#visibility-rules}

Go ใช้การตั้งชื่อเพื่อกำหนดระดับการเข้าถึง (Access Control):

### 🔓 Public (ใช้ตัวอักษรใหญ่ขึ้นต้น)

```go
type Chef interface { ... }          // ✅ เข้าถึงได้จากภายนอก package
func (c Circle) Area() float64 { ... } // ✅ เข้าถึงได้จากภายนอก package
```

### 🔒 Private (ใช้ตัวอักษรเล็กขึ้นต้น)

```go
type chef interface { ... }          // ❌ เข้าถึงได้เฉพาะใน package เท่านั้น
func (c Circle) area() float64 { ... } // ❌ เข้าถึงได้เฉพาะใน package เท่านั้น
```

### ตัวอย่างการใช้งาน

**ในไฟล์ `main.go`**

```go
package main

import (
  "fmt"
  "course-go/chef" // import package ของเรา
)

func main() {
  // ✅ ใช้งานได้ - ขึ้นต้นด้วยตัวใหญ่
  circle := chef.Circle{Radius: 10}
  fmt.Println("Area:", circle.Area())

  // ❌ ใช้งานไม่ได้ - ถ้า area ขึ้นต้นด้วยตัวเล็ก
  // fmt.Println("Area:", circle.area()) // compile error!
}
```

---

## 🚀 Go Modules - ระบบจัดการ Dependencies {#go-modules}

### Go Modules คืออะไร?

**Module** = กลุ่มของ packages ที่ทำงานร่วมกัน ในโปรเจกต์เดียว

```
📦 Module (course-go)
├── 📁 Package main
├── 📁 Package chef
├── 📁 Package utils
└── 📁 Package models
```

### การสร้าง Go Module

```bash
# สร้าง module ใหม่
go mod init course-go

# หรือใช้ URL แบบเต็ม (แนะนำสำหรับ production)
go mod init github.com/username/course-go
```

**ไฟล์ `go.mod` ที่ถูกสร้างขึ้น:**

```go
module course-go

go 1.21 // Go version ล่าสุด (2024)

// dependencies จะถูกเพิ่มที่นี่อัตโนมัติ
```

### ⚡ การปรับปรุงสำหรับ Go เวอร์ชันล่าสุด (2024)

**สิ่งที่เปลี่ยนแปลงจากเดิม:**

1. **Go Version**: ใช้ Go 1.21+ แทน 1.13
2. **Module Path**: แนะนำให้ใช้ full URL
3. **Workspace Support**: รองรับ go.work สำหรับ multi-module
4. **Improved Tooling**: `go mod tidy` เร็วและแม่นยำขึ้น

```bash
# คำสั่งใหม่สำหรับ Go 1.21+
go mod init github.com/yourusername/course-go
go mod tidy    # ปรับ dependencies อัตโนมัติ
go mod verify  # ตรวจสอบความปลอดภัย
```

---

## 📥 การจัดการ Dependencies {#dependency-management}

### การเพิ่ม External Package

**ตัวอย่าง: ใช้ package `copier` สำหรับ copy struct**

```go
package main

import (
  "fmt"
  "github.com/jinzhu/copier" // external package
  "course-go/chef"           // local package
)

type CircleDTO struct {
  R float64 `json:"radius"`
}

func main() {
  // สร้าง Circle
  circle := chef.Circle{Radius: 5.0}

  // Copy ไปยัง DTO
  var dto CircleDTO
  copier.Copy(&dto, &circle)

  fmt.Printf("Original: %+v\n", circle)
  fmt.Printf("DTO: %+v\n", dto)
}
```

### การรัน และ Download Dependencies

```bash
# รันโปรแกรม - จะ download dependencies อัตโนมัติ
go run main.go

# หรือ download ล่วงหน้า
go mod download
```

**ไฟล์ `go.mod` หลังเพิ่ม dependency:**

```go
module course-go

go 1.21

require github.com/jinzhu/copier v0.4.0

// ถ้ามี indirect dependencies จะแสดงที่นี่
```

**ไฟล์ `go.sum` (สร้างอัตโนมัติ):**

```
github.com/jinzhu/copier v0.4.0 h1:w3ciUoD19shMCRargcpm0cm91ytaBhDvuRpz1ODO/U8=
github.com/jinzhu/copier v0.4.0/go.mod h1:DfbEm0FYsaqBcKcFuvmOZb218JkPGtvSHsKg8S8hyyg=
```

### การจัดการ Dependencies

```bash
# ลบ dependencies ที่ไม่ได้ใช้
go mod tidy

# อัพเดท dependencies
go get -u ./...

# อัพเดท dependency เฉพาะตัว
go get -u github.com/jinzhu/copier

# ดู dependencies ทั้งหมด
go list -m all
```

---

## ✨ Best Practices {#best-practices}

### 1. 📁 การตั้งชื่อและจัดโครงสร้าง

```
project/
├── cmd/                 # โปรแกรมหลัก
│   └── main.go
├── internal/           # private packages
│   ├── auth/
│   └── database/
├── pkg/               # public packages
│   ├── models/
│   └── utils/
├── api/               # API definitions
├── docs/              # documentation
├── go.mod
└── README.md
```

### 2. 🏷️ การตั้งชื่อ Package

```go
// ✅ ดี: ชื่อสั้น กระชับ อธิบายได้
package user
package http
package auth

// ❌ หลีกเลี่ยง: ชื่อยาว หรือคำทั่วไป
package userservice
package common
package util
```

### 3. 📝 การเขียน Documentation

```go
// Package chef provides interfaces and implementations
// for cooking different shapes.
package chef

// Chef defines the behavior of a cooking entity.
// All shapes that can be cooked should implement this interface.
type Chef interface {
  // Cook returns a description of how the shape is cooked.
  Cook() string
}

// Circle represents a circular shape that can be cooked.
type Circle struct {
  // Radius is the radius of the circle in units.
  Radius float64
}
```

### 4. 🧪 การเขียน Tests

```go
// ไฟล์ chef/circle_test.go
package chef

import (
  "testing"
  "math"
)

func TestCircleArea(t *testing.T) {
  tests := []struct {
    name     string
    radius   float64
    expected float64
  }{
    {"Small circle", 1.0, math.Pi},
    {"Medium circle", 2.0, 4 * math.Pi},
    {"Large circle", 5.0, 25 * math.Pi},
  }

  for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
      c := Circle{Radius: tt.radius}
      if got := c.Area(); got != tt.expected {
        t.Errorf("Circle.Area() = %v, want %v", got, tt.expected)
      }
    })
  }
}
```

---

## 🔥 ตัวอย่างการใช้งานจริง {#real-world-examples}

### ตัวอย่าง 1: Web API Project

```
ecommerce-api/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── auth/
│   │   ├── service.go
│   │   └── middleware.go
│   ├── product/
│   │   ├── handler.go
│   │   ├── service.go
│   │   └── repository.go
│   └── user/
│       ├── handler.go
│       └── service.go
├── pkg/
│   ├── database/
│   │   └── postgres.go
│   └── logger/
│       └── zap.go
├── api/
│   └── openapi.yaml
├── go.mod
└── go.sum
```

### ตัวอย่าง 2: CLI Tool Project

```
deployment-tool/
├── cmd/
│   └── deploy/
│       └── main.go
├── internal/
│   ├── docker/
│   │   └── client.go
│   ├── kubernetes/
│   │   └── client.go
│   └── config/
│       └── parser.go
├── pkg/
│   └── version/
│       └── version.go
├── go.mod
└── README.md
```

### การใช้งาน Third-party Packages ที่นิยม (2024)

```go
// ไฟล์ go.mod ในโปรเจกต์จริง
module github.com/company/awesome-project

go 1.21

require (
  github.com/gin-gonic/gin v1.9.1           // Web framework
  github.com/spf13/cobra v1.8.0             // CLI framework
  github.com/spf13/viper v1.17.0            // Configuration
  go.uber.org/zap v1.26.0                   // Logging
  github.com/stretchr/testify v1.8.4        // Testing
  gorm.io/gorm v1.25.5                      // ORM
  github.com/golang-migrate/migrate/v4 v4.16.2 // Database migration
)
```

---

## 🎉 สรุป

การใช้ **Packages** และ **Go Modules** ช่วยให้:

1. 🏗️ **โครงสร้างโค้ดดีขึ้น** - แยกหน้าที่ชัดเจน
2. 🔄 **นำกลับมาใช้ได้** - code reusability
3. 🤝 **ทำงานเป็นทีมได้** - แต่ละคนดูแล package ต่างกัน
4. 📦 **จัดการ dependencies** - ใช้ library จากชุมชนได้ง่าย
5. 🛡️ **ความปลอดภัย** - ควบคุมการเข้าถึงด้วย visibility rules

### 🚀 Next Steps

- ลองสร้างโปรเจกต์ใหม่ด้วย Go Modules
- ฝึกแยก package ตามหน้าที่
- ศึกษา standard library packages ของ Go
- เขียน unit tests สำหรับ packages ของคุณ

---

**💡 เคล็ดลับ:** เริ่มต้นด้วยโครงสร้างง่ายๆ แล้วค่อยๆ ขยาย อย่าทำซับซ้อนเกินความจำเป็นตั้งแต่แรก!
