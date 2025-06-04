# Go Constants และ iota - คู่มือฉบับสมบูรณ์ 🚀

## 📖 บทนำ

ในการเขียนโปรแกรม เราจะพบว่าบางค่าไม่ควรเปลี่ยนแปลงหลังจากที่กำหนดไว้แล้ว เช่น ค่า π (pi), ค่าคงที่ทางฟิสิกส์, หรือค่า configuration ต่างๆ ใน Go เราใช้ **Constants** เพื่อจัดการกับสิ่งเหล่านี้

## 🎯 Constants คืออะไร?

**Constant** คือตัวแปรที่มีค่าคงที่ ไม่สามารถเปลี่ยนแปลงได้หลังจากประกาศแล้ว

### ✅ การประกาศ Constant พื้นฐาน

```go
// การประกาศแบบพื้นฐาน
const pi = 3.14159
const name = "Go Programming"
const isActive = true

// ❌ ไม่สามารถเปลี่ยนค่าได้
// pi = 3.14 // Error: cannot assign to pi
```

### 🎨 ความแตกต่างจากภาษาอื่น

```go
// ❌ ในภาษาอื่นๆ มักใช้ตัวใหญ่
// const PI = 3.14159

// ✅ ใน Go ใช้การตั้งชื่อแบบเดียวกับตัวแปรทั่วไป
const pi = 3.14159
```

## 🔢 การประกาศ Multiple Constants

### วิธีที่ 1: ประกาศแยกกัน

```go
const a = 1
const b = 1
const c = 1
```

### วิธีที่ 2: Group Declaration (แนะนำ)

```go
const (
  a = 1
  b // b จะมีค่าเท่ากับ a = 1
  c // c จะมีค่าเท่ากับ a = 1
)

fmt.Println(a, b, c) // Output: 1 1 1
```

### วิธีที่ 3: Mixed Values

```go
const (
  x = 1
  y = 2  // เปลี่ยนค่า
  z      // z จะเท่ากับ y = 2
)

fmt.Println(x, y, z) // Output: 1 2 2
```

## 🌈 iota - ตัวช่วยสร้างค่าต่อเนื่อง

**iota** เป็นเครื่องมือใน Go ที่ช่วยสร้างค่าเรียงลำดับอัตโนมัติ

### 📊 ตัวอย่างพื้นฐาน

```go
const (
  Red   = iota // 0
  Green        // 1
  Blue         // 2
)

fmt.Println(Red, Green, Blue) // Output: 0 1 2
```

### 🎪 การปรับค่าเริ่มต้น

```go
const (
  Red   = iota + 1 // 1
  Green            // 2
  Blue             // 3
)

fmt.Println(Red, Green, Blue) // Output: 1 2 3
```

## 🗓️ ตัวอย่างจริง: Days of Week

### วิธีที่ 1: ใช้ iota ปกติ

```go
const (
  Sunday = iota + 1 // 1
  Monday            // 2
  Tuesday           // 3
  Wednesday         // 4
  Thursday          // 5
  Friday            // 6
  Saturday          // 7
)
```

### วิธีที่ 2: Skip บางค่าด้วย Blank Identifier

```go
const (
  Sunday = iota + 1 // 1
  Monday            // 2
  Tuesday           // 3
  _                 // 4 (ถูกข้าม)
  _                 // 5 (ถูกข้าม)
  _                 // 6 (ถูกข้าม)
  Saturday          // 7
)

fmt.Println(Sunday, Monday, Tuesday, Saturday) // Output: 1 2 3 7
```

## 💡 ตัวอย่างการใช้งานจริง

### 🚦 HTTP Status Codes

```go
const (
  StatusOK       = 200
  StatusNotFound = 404
  StatusError    = 500
)
```

### 🎮 Game States

```go
const (
  GameMenu = iota
  GamePlaying
  GamePaused
  GameOver
)
```

### 💾 File Permissions (ใช้ bit operations)

```go
const (
  ReadPermission   = 1 << iota // 1 (001)
  WritePermission              // 2 (010)
  ExecutePermission            // 4 (100)
)

// สามารถรวมกันได้
const FullPermission = ReadPermission | WritePermission | ExecutePermission // 7 (111)
```

## 📈 Visual Representation

```
iota การทำงาน:
┌─────────────┬─────────┬─────────┐
│ Declaration │  iota   │  Value  │
├─────────────┼─────────┼─────────┤
│ First       │    0    │    0    │
│ Second      │    1    │    1    │
│ Third       │    2    │    2    │
│ _           │    3    │ (skip)  │
│ Fourth      │    4    │    4    │
└─────────────┴─────────┴─────────┘
```

## 🆕 อัปเดตสำหรับ Go 1.24 (2025)

### การปรับปรุงที่สำคัญ:

1. **Type Safety ที่ดีขึ้น**: Constants ตอนนี้มี type checking ที่เข้มงวดมากขึ้น
2. **Better Error Messages**: ข้อความ error ชัดเจนมากขึ้นเมื่อใช้ constants ผิด
3. **Enhanced iota**: รองรับ complex expressions ได้ดีขึ้น

```go
// Go 1.24 - สามารถใช้ complex expressions กับ iota
const (
  KB = 1 << (10 * iota) // 1
  MB                    // 1024
  GB                    // 1048576
  TB                    // 1073741824
)

// Type-safe constants
type Status int
const (
  Active Status = iota
  Inactive
  Pending
)
```

## ⚡ Best Practices

### ✅ Do's

```go
// ใช้ชื่อที่สื่อความหมาย
const MaxRetries = 3
const TimeoutSeconds = 30

// Group ที่เกี่ยวข้องกัน
const (
  DatabaseTimeout = 30 * time.Second
  APITimeout      = 15 * time.Second
  CacheTimeout    = 5 * time.Second
)

// ใช้ typed constants เมื่อเหมาะสม
type Direction int
const (
  North Direction = iota
  South
  East
  West
)
```

### ❌ Don'ts

```go
// หลีกเลี่ยงชื่อที่ไม่ชัดเจน
const x = 1
const temp = "temporary"

// หลีกเลี่ยงการใช้ magic numbers
if status == 200 { } // ❌
if status == StatusOK { } // ✅
```

## 🔍 Advanced Techniques

### การใช้ iota กับ expressions

```go
const (
  _  = iota             // 0 (ข้าม)
  KB = 1 << (10 * iota) // 1024
  MB                    // 1048576
  GB                    // 1073741824
)
```

### Constants ใน different blocks

```go
const (
  a = iota // 0
  b        // 1
)

const (
  c = iota // 0 (reset ใหม่)
  d        // 1
)
```

## 🎯 สรุป

- **Constants** ใช้เมื่อต้องการค่าที่ไม่เปลี่ยนแปลง
- **iota** ช่วยสร้างค่าต่อเนื่องอัตโนมัติ
- ใน Go 1.24 มีการปรับปรุง type safety และ error handling
- ใช้ชื่อที่สื่อความหมายและ group constants ที่เกี่ยวข้องกัน
- Blank identifier (`_`) ใช้เพื่อข้ามค่าที่ไม่ต้องการ

การเข้าใจ constants และ iota จะช่วยให้โค้ดของคุณมีความชัดเจน บำรุงรักษาง่าย และปลอดภัยมากขึ้น! 🎉
