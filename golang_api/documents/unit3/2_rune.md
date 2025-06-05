# Rune in Go: การจัดการข้อความหลายภาษาใน Go

## Overview

ในหัวข้อนี้เราจะเรียนรู้เกี่ยวกับ `rune` ใน Go และทำไมมันถึงสำคัญสำหรับการจัดการข้อความที่มีหลายภาษา โดยเฉพาะภาษาไทย

## ปัญหาที่พบเมื่อใช้ String Index โดยตรง

### ตัวอย่างปัญหา

```go
package main

import "fmt"

func main() {
  str := "สวัสดีชาวโลก"
  fmt.Println("First byte:", str[0])        // ผลลัพธ์: 224
  fmt.Println("First char:", string(str[0])) // ผลลัพธ์: ไม่ใช่ "ส"
}
```

**🚨 ปัญหา**: เมื่อเราพยายามเข้าถึงตัวอักษรแรกของคำว่า "สวัสดีชาวโลก" ด้วย `str[0]` เราได้ค่า 224 ซึ่งเป็นไบต์แรกของตัว "ส" ไม่ใช่ตัวอักษรที่เราต้องการ

### สาเหตุของปัญหา

#### ASCII Table Limitation

```
ASCII Table (0-255):
┌─────┬─────┬─────┬─────┐
│  A  │  B  │  C  │ ... │
│ 65  │ 66  │ 67  │ ... │
└─────┴─────┴─────┴─────┘
```

**ASCII** สามารถแทนตัวอักษรได้เพียง 255 ตัว ซึ่งไม่เพียงพอสำหรับภาษาไทยและภาษาอื่นๆ ทั่วโลก

#### UTF-8 Encoding

```go
func main() {
  char := "ส"
  bytes := []byte(char)
  fmt.Println("Bytes for 'ส':", bytes) // ผลลัพธ์: [224 184 170]
}
```

**ข้อสังเกต**: ตัวอักษร "ส" หนึ่งตัว ต้องใช้ **3 ไบต์** ในการเก็บข้อมูล

## รู้จักกับ Rune

### Rune คืออะไร?

```go
type rune = int32
```

- **Rune** เป็น alias ของ `int32`
- ใช้แทน **Unicode Code Point**
- สามารถแทนตัวอักษรทุกภาษาในโลกได้
- ใช้ **32 บิต** ในการจัดเก็บ

### การแปลง String เป็น Rune Slice

```go
package main

import "fmt"

func main() {
  str := "สวัสดีชาวโลก"

  // แปลง string เป็น []rune
  runes := []rune(str)

  // เข้าถึงตัวอักษรแรก
  fmt.Println("First rune (number):", runes[0])    // ผลลัพธ์: 3626
  fmt.Println("First char:", string(runes[0]))     // ผลลัพธ์: "ส"
}
```

## การนับความยาวของ String

### ⚠️ ปัญหาการใช้ len() โดยตรง

```go
func main() {
  str := "สวัสดีชาวโลก"

  fmt.Println("len(str):", len(str))                    // ผลลัพธ์: 36 ไบต์
  fmt.Println("len([]rune(str)):", len([]rune(str)))    // ผลลัพธ์: 12 ตัวอักษร
}
```

**เหตุผล**: `len()` นับจำนวนไบต์ ไม่ใช่จำนวนตัวอักษร

### ✅ วิธีที่ถูกต้องในการนับตัวอักษร

#### วิธีที่ 1: ใช้ utf8.RuneCountInString()

```go
import (
  "fmt"
  "unicode/utf8"
)

func main() {
  str := "สวัสดีชาวโลก"
  count := utf8.RuneCountInString(str)
  fmt.Println("Character count:", count) // ผลลัพธ์: 12
}
```

#### วิธีที่ 2: แปลงเป็น []rune แล้วนับ

```go
func main() {
  str := "สวัสดีชาวโลก"
  runes := []rune(str)
  fmt.Println("Character count:", len(runes)) // ผลลัพธ์: 12
}
```

## การวนลูป String

### 🔄 for range vs for loop ธรรมดา

#### for range (แนะนำ)

```go
func main() {
  str := "สวัสดีชาวโลก"

  // วนลูปแบบ for range จะได้ rune
  for i, char := range str {
    fmt.Printf("Index: %d, Char: %s\n", i, string(char))
  }
}
```

**ผลลัพธ์**:

```
Index: 0, Char: ส
Index: 3, Char: ว
Index: 6, Char: ั
Index: 9, Char: ส
...
```

#### for loop ธรรมดา (ไม่แนะนำสำหรับ Unicode)

```go
func main() {
  str := "สวัสดีชาวโลก"

  // วนลูปแบบ for loop ธรรมดาจะได้ byte
  for i := 0; i < len(str); i++ {
    fmt.Printf("Index: %d, Byte: %d\n", i, str[i])
  }
}
```

**ผลลัพธ์**:

```
Index: 0, Byte: 224
Index: 1, Byte: 184
Index: 2, Byte: 170
Index: 3, Byte: 224
...
```

## สรุปและ Best Practices

### ✅ Do's

1. ใช้ `[]rune(string)` เมื่อต้องการเข้าถึงตัวอักษรแต่ละตัว
2. ใช้ `utf8.RuneCountInString()` หรือ `len([]rune(str))` สำหรับนับตัวอักษร
3. ใช้ `for range` เมื่อวนลูป string ที่มี Unicode

### ❌ Don'ts

1. อย่าใช้ `string[index]` สำหรับเข้าถึงตัวอักษรที่ไม่ใช่ ASCII
2. อย่าใช้ `len(string)` สำหรับนับจำนวนตัวอักษรใน Unicode string
3. อย่าใช้ for loop ธรรมดากับ string ที่มี Unicode

### 🔄 การปรับปรุงจากเวอร์ชันเดิม

**สิ่งที่ปรับปรุง**:

1. ✨ เพิ่มตัวอย่างโค้ดที่ชัดเจนและครบถ้วน
2. 📊 เพิ่ม visualization และ diagram อธิบาย
3. 🎯 จัดโครงสร้างเนื้อหาให้เข้าใจง่าย
4. ⚡ อัปเดตตามมาตรฐาน Go เวอร์ชันล่าสุด
5. 📝 เพิ่ม Best Practices และ Common Pitfalls
6. 🔧 เพิ่มวิธีการแก้ปัญหาหลายแบบ

**Go Version Compatibility**: โค้ดทั้งหมดทดสอบกับ Go 1.21+ และใช้ได้กับเวอร์ชันที่ใหม่กว่า
