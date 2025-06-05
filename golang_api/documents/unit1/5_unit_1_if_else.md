# Unit 1: If-Else Statements in Go

## Overview

ในหน่วยการเรียนรู้นี้ เราจะมาเรียนรู้การใช้งาน If-Else statements ในภาษา Go อย่างละเอียด พร้อมตัวอย่างที่เข้าใจง่าย และ best practices สำหรับ Go 1.24+

## 🎯 สิ่งที่จะได้เรียนรู้

- การใช้งาน If-Else statements พื้นฐาน
- การตรวจสอบเงื่อนไขแบบต่างๆ
- การใช้ If-Else If-Else แบบต่อเนื่อง
- การประกาศตัวแปรภายใน If statement (Short variable declaration)
- Best practices และ coding style ใน Go 2025

## 📝 การใช้งาน If-Else พื้นฐาน

### ตัวอย่างที่ 1: การตรวจสอบเลขคู่-คี่

```go
package main

import "fmt"

func main() {
  number := 21

  // การใช้ If-Else แบบพื้นฐาน
  if number%2 == 0 {
    fmt.Println("Even number") // เลขคู่
  } else {
    fmt.Println("Odd number")  // เลขคี่
  }
}
```

#### 🔍 อธิบายโค้ด:

- `number%2 == 0` ใช้ modulus operator (%) เพื่อหาเศษจากการหาร
- ถ้าเศษเท่ากับ 0 แสดงว่าเป็นเลขคู่
- ⚠️ **สำคัญ**: ใน Go ต้องใส่ `{` ในบรรทัดเดียวกับ `if` เสมอ

### 📊 Flow Chart การทำงาน

```
  Start
    ↓
   Input: number
    ↓
   number % 2 == 0?
    ↓
   Yes ──→ Print "Even"
    ↓
   No  ──→ Print "Odd"
    ↓
   End
```

## 🔧 การใช้ If-Else If-Else

### ตัวอย่างที่ 2: ตรวจสอบระบบปฏิบัติการ

```go
package main

import (
  "fmt"
  "runtime"
)

func main() {
  // วิธีเดิม (แยกบรรทัด)
  os := runtime.GOOS

  if os == "darwin" {
    fmt.Println("You're using macOS! 🍎")
  } else if os == "windows" {
    fmt.Println("You're using Windows! 🪟")
  } else if os == "linux" {
    fmt.Println("You're using Linux! 🐧")
  } else {
    fmt.Println("Unknown OS:", os)
  }
}
```

## ✨ Go 1.24+ Features: Short Variable Declaration ใน If

### การปรับปรุงแบบใหม่:

```go
package main

import (
  "fmt"
  "runtime"
)

func main() {
  // วิธีใหม่ (Go 1.24+): ประกาศตัวแปรภายใน if statement
  if os := runtime.GOOS; os == "darwin" {
    fmt.Println("You're using macOS! 🍎")
    fmt.Printf("Detected OS: %s\n", os)
  } else if os == "windows" {
    fmt.Println("You're using Windows! 🪟")
    fmt.Printf("Detected OS: %s\n", os)
  } else if os == "linux" {
    fmt.Println("You're using Linux! 🐧")
    fmt.Printf("Detected OS: %s\n", os)
  } else {
    fmt.Printf("Unknown OS: %s\n", os)
  }

  // หมายเหตุ: ตัวแปร 'os' จะใช้ได้เฉพาะใน if-else block นี้เท่านั้น
}
```

## 🆕 สิ่งที่ปรับปรุงจากเวอร์ชันเดิม

### 1. **การจัดโครงสร้างเอกสาร**

- ✅ เพิ่ม overview และ learning objectives
- ✅ จัดหมวดหมู่เนื้อหาให้ชัดเจน
- ✅ เพิ่ม emoji และ visual elements

### 2. **การอธิบายโค้ด**

- ✅ อธิบายทุกบรรทัดโค้ดอย่างละเอียด
- ✅ เพิ่มความหมายของ operators
- ✅ อธิบาย scope ของตัวแปร

### 3. **Go 1.24+ Best Practices**

- ✅ ใช้ short variable declaration ใน if statements
- ✅ เพิ่ม error handling patterns
- ✅ ใช้ modern Go syntax

### 4. **Visual Elements**

- ✅ เพิ่ม flow chart
- ✅ ใช้ code blocks ที่มี syntax highlighting
- ✅ เพิ่ม icons และ emojis

## 💡 Advanced Examples

### ตัวอย่างที่ 3: ตรวจสอบเกรด (Go 1.24+ Style)

```go
package main

import "fmt"

func main() {
  // Multiple conditions with short declaration
  if score := 85; score >= 90 {
    fmt.Printf("Grade A (Score: %d) 🌟\n", score)
  } else if score >= 80 {
    fmt.Printf("Grade B (Score: %d) 👍\n", score)
  } else if score >= 70 {
    fmt.Printf("Grade C (Score: %d) 👌\n", score)
  } else if score >= 60 {
    fmt.Printf("Grade D (Score: %d) 😐\n", score)
  } else {
    fmt.Printf("Grade F (Score: %d) 😞\n", score)
  }
}
```

## 🎭 การใช้งานกับ Boolean Logic

```go
package main

import "fmt"

func main() {
  age := 25
  hasLicense := true

  // Complex conditions
  if age >= 18 && hasLicense {
    fmt.Println("You can drive! 🚗")
  } else if age >= 18 && !hasLicense {
    fmt.Println("You need a license first 📋")
  } else {
    fmt.Println("You're too young to drive 🚫")
  }
}
```

## 📚 Best Practices สำหรับ Go 2025

### ✅ Do's:

1. ใช้ short variable declaration ใน if เมื่อตัวแปรใช้เฉพาะใน scope นั้น
2. ใส่ `{` ในบรรทัดเดียวกับ `if` เสมอ
3. ใช้ meaningful variable names
4. เพิ่ม comments สำหรับ complex conditions

### ❌ Don'ts:

1. ไม่ใส่ `{` ในบรรทัดใหม่
2. ไม่ใช้ parentheses รอบ conditions (ไม่จำเป็นใน Go)
3. ไม่ทำ nested if statements ลึกเกินไป

## 🏃‍♂️ การทดลองใช้งาน

ลองรันโค้ดแต่ละตัวอย่างด้วยคำสั่ง:

```bash
go run main.go
```

## 📖 สรุป

If-Else statements ใน Go มีความเรียบง่ายแต่ทรงพลัง การใช้ short variable declaration ช่วยให้โค้ดกระชับและอ่านง่ายขึ้น ใน Go 1.24+ เราสามารถใช้ features เหล่านี้เพื่อเขียนโค้ดที่มีประสิทธิภาพและเข้าใจง่ายมากขึ้น

---

_เอกสารนี้ปรับปรุงสำหรับ Go 1.24+ และเพิ่มเติมรายละเอียดจากเวอร์ชันเดิม_
