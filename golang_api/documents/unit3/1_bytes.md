# Go Bytes และ Strings: คู่มือสำหรับนักพัฒนา

## 📋 Overview

ใน Go, **String** คือ slice ของ **bytes** ที่มีคุณสมบัติ **immutable** (อ่านได้อย่างเดียว)

## 🔍 ความเข้าใจพื้นฐาน

### Byte คืออะไร?

- **Byte** = alias ของ `uint8`
- เก็บค่าได้ `0-255`
- แทนรหัส ASCII สำหรับตัวอักษร

```go
// ตัวอย่างการสร้าง string
str := "hello world"
```

## 🔧 การเข้าถึงตัวอักษรใน String

### ⚠️ ผลลัพธ์ที่ได้จะเป็นรหัส ASCII

```go
package main

import "fmt"

func main() {
  str := "hello world"
  firstLetter := str[0]

  fmt.Println("ASCII code:", firstLetter) // Output: 104 (รหัส ASCII ของ 'h')
}
```

### ✅ การแปลงเป็นตัวอักษร

```go
package main

import "fmt"

func main() {
  str := "hello world"
  firstLetter := str[0]

  // แปลง byte เป็น string
  fmt.Println("Character:", string(firstLetter)) // Output: h
}
```

## 📏 การตรวจสอบความยาว

```go
package main

import "fmt"

func main() {
  str := "hello world"
  length := len(str)

  fmt.Printf("ความยาวของ '%s' คือ %d ตัวอักษร\n", str, length)
  // Output: ความยาวของ 'hello world' คือ 11 ตัวอักษร
}
```

## 🔄 การวนลูปผ่าน String

### วิธีที่ 1: For Loop แบบดั้งเดิม

```go
package main

import "fmt"

func main() {
  str := "hello world"

  fmt.Println("แสดงทีละตัวอักษร:")
  for i := 0; i < len(str); i++ {
    fmt.Printf("Index %d: %s\n", i, string(str[i]))
  }
}
```

### วิธีที่ 2: Range Loop (แนะนำสำหรับ Unicode)

```go
package main

import "fmt"

func main() {
  str := "hello world สวัสดี"

  fmt.Println("วิธี Range (รองรับ Unicode):")
  for index, char := range str {
    fmt.Printf("Index %d: %c\n", index, char)
  }
}
```

## 🚫 Immutable Nature

### ❌ ไม่สามารถแก้ไข String ได้โดยตรง

```go
package main

import "fmt"

func main() {
  str := "hello world"

  // ⚠️ สิ่งนี้จะเกิด compile error
  // str[0] = 'H' // Error: cannot assign to str[0]

  fmt.Println("String ใน Go เป็น immutable")
}
```

### ✅ วิธีการแก้ไข String

```go
package main

import "fmt"

func main() {
  str := "hello world"

  // วิธีที่ 1: แปลงเป็น []byte แล้วแก้ไข
  bytes := []byte(str)
  bytes[0] = 'H'
  newStr := string(bytes)

  fmt.Println("Original:", str)      // hello world
  fmt.Println("Modified:", newStr)   // Hello world

  // วิธีที่ 2: ใช้ string concatenation
  newStr2 := "H" + str[1:]
  fmt.Println("Concatenated:", newStr2) // Hello world
}
```

## 🆕 การปรับปรุงใน Go เวอร์ชันล่าสุด

### Go 1.20+ Features

```go
package main

import (
  "fmt"
  "strings"
)

func main() {
  str := "hello world"

  // ใช้ strings.Clone() สำหรับ memory optimization
  cloned := strings.Clone(str)

  // ใช้ strings.Cut() (Go 1.18+)
  before, after, found := strings.Cut(str, " ")
  if found {
    fmt.Printf("Before: '%s', After: '%s'\n", before, after)
  }

  // รองรับ Unicode ดีขึ้น
  unicode := "สวัสดี 🚀"
  for i, r := range unicode {
    fmt.Printf("Position %d: %c (Unicode: %U)\n", i, r, r)
  }
}
```

## 🎯 Best Practices

### 1. ใช้ strings.Builder สำหรับการต่อ String หลายครั้ง

```go
package main

import (
  "fmt"
  "strings"
)

func main() {
  var builder strings.Builder

  words := []string{"hello", " ", "world", "!"}

  for _, word := range words {
    builder.WriteString(word)
  }

  result := builder.String()
  fmt.Println("Result:", result) // hello world!
}
```

### 2. ใช้ rune สำหรับ Unicode

```go
package main

import "fmt"

func main() {
  text := "Hello สวัสดี 🌟"

  // นับจำนวน characters จริง (ไม่ใช่ bytes)
  runes := []rune(text)
  fmt.Printf("จำนวน bytes: %d\n", len(text))     // 20
  fmt.Printf("จำนวน characters: %d\n", len(runes)) // 11
}
```

## 📊 ASCII Table Reference

| Character | ASCII Code | Hex  |
| --------- | ---------- | ---- |
| 'A'       | 65         | 0x41 |
| 'a'       | 97         | 0x61 |
| '0'       | 48         | 0x30 |
| ' '       | 32         | 0x20 |

## 🔧 การปรับปรุงจากเวอร์ชันเดิม

### สิ่งที่ปรับปรุง:

1. ✅ เพิ่มตัวอย่าง Unicode handling
2. ✅ แนะนำ `strings.Builder` แทนการต่อ string แบบเดิม
3. ✅ เพิ่ม `strings.Cut()` และ `strings.Clone()` ใหม่
4. ✅ อธิบาย difference ระหว่าง bytes กับ runes
5. ✅ เพิ่ม best practices สำหรับ performance
6. ✅ ปรับปรุงตัวอย่างให้ทันสมัยและชัดเจนขึ้น

### Go Version Compatibility:

- ✅ Go 1.18+: `strings.Cut()`
- ✅ Go 1.20+: `strings.Clone()`
- ✅ Go 1.21+: Performance improvements

> 💡 **หมายเหตุ**: เอกสารนี้ปรับปรุงให้ทันสมัยและครอบคลุมมากขึ้น เหมาะสำหรับการเรียนรู้และอ้างอิงในงานจริง
