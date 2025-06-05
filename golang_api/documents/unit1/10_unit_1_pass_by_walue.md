# Go Pass by Value และ Pointers - คู่มือฉบับสมบูรณ์

## 📋 Overview

ใน Go language การส่งผ่านข้อมูลเข้าไปในฟังก์ชันมีหลักการสำคัญที่ต้องเข้าใจ คือ **Pass by Value** และการใช้ **Pointers** เพื่อแก้ไขค่าตัวแปรต้นฉบับ

## 🎯 สิ่งที่จะได้เรียนรู้

- หลักการ Pass by Value ใน Go
- การทำงานของ Memory Address และ Pointers
- เทคนิคการแก้ไขค่าตัวแปรต้นฉบับ
- Best Practices สำหรับ Go version ล่าสุด

---

## 🔍 Pass by Value คืออะไร?

### แนวคิดพื้นฐาน

```
Original Variable: [20] ────copy───→ Function Parameter: [20]
  (age)                              (n)
```

เมื่อเราส่งตัวแปรเข้าไปในฟังก์ชัน Go จะ **สำเนา (copy)** ค่าของตัวแปรนั้นให้กับ parameter ใหม่

### ตัวอย่างง่ายๆ

```go
package main

import "fmt"

// ฟังก์ชันเพิ่มค่า (แบบ Pass by Value)
func inc(n int) int {
    n = n + 1  // แก้ไขเฉพาะ copy เท่านั้น
    return n
}

func main() {
    age := 20
    result := inc(age)

    fmt.Printf("age = %d\n", age)       // ผลลัพธ์: age = 20 (ไม่เปลี่ยน!)
    fmt.Printf("result = %d\n", result) // ผลลัพธ์: result = 21
}
```

**💡 สังเกต:** ค่า `age` ยังคงเป็น 20 เพราะฟังก์ชันแก้ไขเฉพาะสำเนาเท่านั้น

---

## 🎪 Memory Visualization

```
┌─────────────────┐    ┌─────────────────┐
│  main() scope   │    │  inc() scope    │
│                 │    │                 │
│  age: [20]      │───▶│  n: [20] (copy) │
│  addr: 0x1001   │    │  addr: 0x2001   │
└─────────────────┘    └─────────────────┘
```

---

## 🚀 การใช้ Pointers เพื่อแก้ไขค่าจริง

### วิธีการส่ง Memory Address

```go
package main

import "fmt"

// ฟังก์ชันที่รับ pointer เป็น parameter
func incPointer(n *int) {
    *n = *n + 1  // แก้ไขค่าที่ pointer ชี้ไป
    // หรือเขียนแบบสั้นๆ: (*n)++
}

func main() {
    age := 20

    fmt.Printf("Before: age = %d\n", age) // ผลลัพธ์: 20

    // ส่ง memory address ด้วย & (ampersand)
    incPointer(&age)

    fmt.Printf("After: age = %d\n", age)  // ผลลัพธ์: 21
}
```

### 🔧 การทำงานของ Pointers

```
Memory Layout:
┌──────────────┬──────────────┐
│   Address    │    Value     │
├──────────────┼──────────────┤
│   0x1001     │      20      │ ← age variable
│   0x2001     │    0x1001    │ ← pointer n (stores address)
└──────────────┴──────────────┘

&age     = 0x1001  (address ของ age)
n        = 0x1001  (pointer เก็บ address)
*n       = 20      (ค่าที่ pointer ชี้ไป)
```

---

## 📊 เปรียบเทียบวิธีการ

| วิธีการ         | Syntax         | ผลลัพธ์                 | ใช้เมื่อไหร่        |
| --------------- | -------------- | ----------------------- | ------------------- |
| Pass by Value   | `func(n int)`  | ตัวแปรต้นฉบับไม่เปลี่ยน | ต้องการเก็บค่าเดิม  |
| Pass by Pointer | `func(n *int)` | ตัวแปรต้นฉบับเปลี่ยน    | ต้องการแก้ไขค่าจริง |

---

## 🆕 อัปเดตสำหรับ Go เวอร์ชันล่าสุด (2025)

### การเปลี่ยนแปลงที่สำคัญ:

1. **Type Parameters (Generics) - Go 1.18+**

```go
// ฟังก์ชัน generic สำหรับทุก numeric type
func Inc[T int | int32 | int64 | float64](n *T) {
    *n++
}

func main() {
    var age int = 20
    var score float64 = 95.5

    Inc(&age)   // age = 21
    Inc(&score) // score = 96.5
}
```

2. **Improved Error Handling**

```go
func SafeInc(n *int) error {
    if n == nil {
     return fmt.Errorf("pointer cannot be nil")
    }
    *n++
    return nil
}
```

3. **Modern Go Module Structure**

```
project/
├── go.mod
├── go.sum
├── main.go
└── pointers/
    ├── basic.go
    └── advanced.go
```

---

## 💡 Best Practices สำหรับ 2025

### 1. ใช้ Named Return Values

```go
func IncrementAndDouble(n *int) (original, result int) {
    original = *n
    *n++
    result = *n * 2
    return
}
```

### 2. Nil Pointer Checking

```go
func SafeModify(ptr *int) {
    if ptr == nil {
     log.Println("Warning: nil pointer received")
     return
    }
    *ptr += 10
}
```

### 3. Use Context for Complex Operations

```go
import "context"

func ModifyWithContext(ctx context.Context, n *int) error {
    select {
    case <-ctx.Done():
     return ctx.Err()
    default:
     *n++
     return nil
    }
}
```

---

## 🧪 ตัวอย่างการทดสอบ

```go
package main

import (
    "fmt"
    "testing"
)

func TestPassByValue(t *testing.T) {
    original := 10
    result := inc(original)

    if original != 10 {
     t.Errorf("Expected original to remain 10, got %d", original)
    }
    if result != 11 {
     t.Errorf("Expected result to be 11, got %d", result)
    }
}

func TestPassByPointer(t *testing.T) {
    value := 10
    incPointer(&value)

    if value != 11 {
     t.Errorf("Expected value to be 11, got %d", value)
    }
}
```

---

## 📈 Performance Considerations

```go
// สำหรับ struct ขนาดใหญ่ ใช้ pointer เพื่อประสิทธิภาพ
type LargeStruct struct {
    Data [1000]int
    // ... many fields
}

// ❌ ช้า - copy ทั้ง struct
func ProcessSlow(ls LargeStruct) {
    // processing...
}

// ✅ เร็ว - copy เฉพาะ pointer
func ProcessFast(ls *LargeStruct) {
    // processing...
}
```

---

## 🎯 สรุป

1. **Pass by Value**: Go สำเนาค่าให้ parameter ใหม่
2. **Pointers**: ใช้ `&` เพื่อส่ง address, `*` เพื่อเข้าถึงค่า
3. **Modern Go**: รองรับ Generics, ตรวจสอบ nil, และ error handling ที่ดีขึ้น
4. **Performance**: ใช้ pointers สำหรับข้อมูลขนาดใหญ่

### การปรับปรุงจากเนื้อหาเดิม:

- ✅ เพิ่มตัวอย่าง Generics (Go 1.18+)
- ✅ เพิ่ม Error Handling แบบ modern
- ✅ เพิ่ม Testing examples
- ✅ เพิ่ม Performance considerations
- ✅ เพิ่ม Memory visualization
- ✅ เพิ่ม Best practices สำหรับปี 2025

ตอนนี้คู่มือนี้พร้อมสำหรับทีมงานและเพื่อนๆ ที่ต้องการเรียนรู้ Go อย่างถูกต้องและทันสมัย! 🚀
