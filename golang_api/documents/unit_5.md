# Unit 5: Defer, Errors, Panic และ Recover

## 📌 ภาพรวม

Unit นี้จะครอบคลุมกลไกการจัดการข้อผิดพลาดและการควบคุมการทำงานของ Go ซึ่งเป็นหัวใจสำคัญของการเขียนโปรแกรมที่มีประสิทธิภาพและปลอดภัย

---

## 📋 สารบัญ

1. [Defer](#-defer-การหน่วงเวลาการทำงาน)
2. [การสร้างและจัดการ Errors](#-errors-การจัดการข้อผิดพลาด)
3. [คุณสมบัติของ Panic และการใช้งาน](#-panic-การหยุดการทำงานฉุกเฉิน)
4. [การดักจับ Panic ด้วย Recover](#-recover-การดักจับ-panic)

## 🔄 Defer: การหน่วงเวลาการทำงาน

### แนวคิดพื้นฐาน

`defer` เป็นคีย์เวิร์ดที่ช่วยให้เราสามารถกำหนดให้ฟังก์ชันทำงานหลังจากที่ฟังก์ชันปัจจุบันเสร็จสิ้นแล้ว เหมาะสำหรับการทำ cleanup operations

### ตัวอย่างการใช้งาน: Copy File

```go
package main

import (
  "fmt"
  "io"
  "os"
)

func copyFile(sourceName, destinationName string) error {
  // เปิดไฟล์ต้นฉบับ
  source, err := os.Open(sourceName)
  if err != nil {
    return fmt.Errorf("cannot open source file: %w", err)
  }
  defer source.Close() // 🔥 จะปิดไฟล์หลังจากฟังก์ชันจบ

  // สร้างไฟล์ปลายทาง
  destination, err := os.Create(destinationName)
  if err != nil {
    return fmt.Errorf("cannot create destination file: %w", err)
  }
  defer destination.Close() // 🔥 จะปิดไฟล์หลังจากฟังก์ชันจบ

  // Copy เนื้อหา
  _, err = io.Copy(destination, source)
  if err != nil {
    return fmt.Errorf("copy failed: %w", err)
  }

  return nil
}
```

### 📊 ลำดับการทำงานของ Defer (LIFO - Last In, First Out)

```
ฟังก์ชันเริ่มต้น
├── defer statement 1 ← จะทำงานเป็นอันดับที่ 3
├── defer statement 2 ← จะทำงานเป็นอันดับที่ 2
├── defer statement 3 ← จะทำงานเป็นอันดับที่ 1
└── ฟังก์ชันจบ
```

### ✨ การปรับปรุงจากเวอร์ชันเดิม

- เพิ่มการใช้ `fmt.Errorf` พร้อม error wrapping (`%w`) ตาม Go 1.13+
- ใช้ `io.Copy` แทนการ copy แบบ manual
- เพิ่ม error handling ที่ชัดเจนขึ้น

---

## ❌ Errors: การจัดการข้อผิดพลาด

### แนวคิดพื้นฐาน

Error ใน Go เป็น interface ที่ใช้จัดการข้อผิดพลาดแบบ explicit โดยไม่ใช้ try-catch

### ตัวอย่างการสร้างและใช้งาน Error

```go
package main

import (
  "errors"
  "fmt"
)

// findIndex หาตำแหน่งของตัวเลขใน slice
func findIndex(slice []int, number int) (int, error) {
  for i, n := range slice {
    if n == number {
      return i, nil // พบแล้ว ไม่มี error
    }
  }

  // ไม่พบ - สร้าง error
  return -1, fmt.Errorf("number %d not found in slice", number)
}

func main() {
  numbers := []int{1, 2, 3, 4, 5}

  // กรณีพบ
  index, err := findIndex(numbers, 2)
  if err != nil {
    fmt.Printf("Error: %v\n", err)
    return
  }
  fmt.Printf("Found at index: %d\n", index) // Output: Found at index: 1

  // กรณีไม่พบ
  index, err = findIndex(numbers, 20)
  if err != nil {
    fmt.Printf("Error: %v\n", err) // Output: Error: number 20 not found in slice
    return
  }
  fmt.Printf("Found at index: %d\n", index)
}
```

### 🔧 วิธีการสร้าง Error แบบต่างๆ

#### 1. ใช้ `errors.New()`

```go
err := errors.New("something went wrong")
```

#### 2. ใช้ `fmt.Errorf()` (แนะนำ)

```go
err := fmt.Errorf("user %s not found", username)
```

#### 3. Custom Error Type

```go
type ValidationError struct {
  Field   string
  Message string
}

func (e ValidationError) Error() string {
  return fmt.Sprintf("validation failed for %s: %s", e.Field, e.Message)
}
```

### ✨ การปรับปรุงจากเวอร์ชันเดิม

- ใช้ `fmt.Errorf` แทน `errors.New` เพื่อ formatting ที่ดีกว่า
- เพิ่มการใช้ error wrapping สำหรับ context ที่ดีขึ้น
- Return -1 แทน 0 เมื่อไม่พบ (เพื่อแยกความแตกต่างจาก index 0)

---

## 🚨 Panic: การหยุดการทำงานฉุกเฉิน

### เมื่อไหร่ควรใช้ Panic

- เมื่อเกิดข้อผิดพลาดร้าย แรงที่ทำให้โปรแกรมไม่สามารถทำงานต่อได้
- ปัญหาที่เกี่ยวกับการเชื่อมต่อฐานข้อมูล, configuration หายไป
- **หลีกเลี่ยงการใช้สำหรับ business logic errors**

### ตัวอย่างการใช้งาน

```go
package main

import "fmt"

func main() {
  fmt.Println("Start")
  fmt.Println("Processing 1")
  fmt.Println("Processing 2")

  // Panic เกิดขึ้น
  panic("critical error occurred!")

  // โค้ดด้านล่างจะไม่ทำงาน
  fmt.Println("This will never execute")
}
```

### 📊 การเปรียบเทียบ Error vs Panic

| หัวข้อ        | Error                     | Panic                  |
| ------------- | ------------------------- | ---------------------- |
| การใช้งาน     | Business logic errors     | Critical system errors |
| การจัดการ     | Return error value        | หยุดการทำงานทันที      |
| Recovery      | ตรวจสอบด้วย if err != nil | ใช้ recover()          |
| Best Practice | ใช้เป็นหลัก               | ใช้เฉพาะกรณีจำเป็น     |

---

## 🔧 Recover: การดักจับ Panic

### แนวคิดพื้นฐาน

`recover` ใช้สำหรับดักจับ panic และป้องกันไม่ให้โปรแกรมหยุดทำงาน **ต้องใช้ภายใน defer เท่านั้น**

### ตัวอย่างการใช้งาน

```go
package main

import "fmt"

func riskyFunction() {
  panic("something went wrong!")
}

func safeWrapper() {
  defer func() {
    if r := recover(); r != nil {
      fmt.Printf("Recovered from panic: %v\n", r)
    }
  }()

  fmt.Println("Before risky operation")
  riskyFunction()
  fmt.Println("This won't execute") // จะไม่ทำงาน
}

func main() {
  safeWrapper()
  fmt.Println("Program continues normally") // จะทำงานต่อได้
}
```

### 🔄 Flow การทำงานของ Panic-Recover

```
Function A calls Function B calls Function C
        ↓
     Function C panics
        ↓
  Panic propagates to Function B
        ↓
  If Function B has recover() in defer
        ↓
     Panic is caught and handled
        ↓
  Function A continues normally
```

### ✨ การปรับปรุงจากเวอร์ชันเดิม

- เพิ่มตัวอย่างที่ชัดเจนขึ้น
- อธิบาย call stack propagation
- เพิ่ม best practices สำหรับการใช้งาน

---

## 🎯 Best Practices และ Guidelines

### 1. Error Handling Pattern

```go
// ✅ Good
result, err := someFunction()
if err != nil {
  return fmt.Errorf("operation failed: %w", err)
}

// ❌ Bad - ignoring errors
result, _ := someFunction()
```

### 2. Defer Usage

```go
// ✅ Good - defer ใกล้กับ resource allocation
file, err := os.Open("data.txt")
if err != nil {
  return err
}
defer file.Close() // อยู่ใกล้กับการ open

// ❌ Bad - defer ห่างจาก resource allocation
```

### 3. Panic Guidelines

```go
// ✅ Good - ใช้สำหรับ critical errors
if dbConnection == nil {
  panic("database connection is required")
}

// ❌ Bad - ใช้สำหรับ business logic
if user.Age < 18 {
  panic("user too young") // ควรใช้ error แทน
}
```

---

## 📝 สรุปการปรับปรุง

### การเปลี่ยนแปลงหลักจากเวอร์ชันเดิม:

1. **Error Handling**

   - ใช้ `fmt.Errorf` แทน `errors.New` สำหรับ formatting
   - เพิ่ม error wrapping ด้วย `%w` verb
   - Return -1 แทน 0 เมื่อไม่พบข้อมูล

2. **Code Examples**

   - อัปเดตให้เป็น idiomatic Go แบบปัจจุบัน
   - เพิ่มความชัดเจนในการตั้งชื่อตัวแปร
   - ใช้ modern Go practices

3. **Documentation**

   - เพิ่มตาราง comparison
   - เพิ่ม visual flow diagrams
   - เพิ่ม best practices section
   - อธิบายแนวคิดให้เข้าใจง่ายขึ้น

4. **Go Version Compatibility**
   - รองรับ Go 1.13+ error wrapping
   - ใช้ modern error handling patterns
   - เพิ่ม context ที่เหมาะสมกับปัจจุบัน

### 🎓 เหมาะสำหรับ

- นักพัฒนาที่เริ่มต้นเรียน Go
- หัวหน้างานที่ต้องการทำความเข้าใจ codebase
- ทีมที่ต้องการ reference สำหรับ error handling patterns
