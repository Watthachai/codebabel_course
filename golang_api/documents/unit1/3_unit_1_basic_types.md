# Unit 1: Go Basic Types และการประกาศตัวแปร

## 📚 บทนำ

ในหัวข้อนี้เราจะมาเรียนรู้การประกาศตัวแปร (Variable Declaration) และชนิดข้อมูลพื้นฐาน (Basic Types) ในภาษา Go อย่างละเอียด พร้อมตัวอย่างที่เข้าใจง่าย

## 🔧 การประกาศตัวแปร (Variable Declaration)

### วิธีที่ 1: การประกาศแบบระบุชนิดข้อมูล

```go
var age int  // ประกาศตัวแปร age เป็นชนิด int
fmt.Println(age)  // Output: 0 (zero value)
```

**⚠️ หมายเหตุ:** ใน Go หากประกาศตัวแปรแล้วไม่ใช้งาน จะเกิด compile error

### วิธีที่ 2: การประกาศพร้อมกำหนดค่า

```go
var age int = 20
fmt.Println(age)  // Output: 20
```

หรือกำหนดค่าหลังจากประกาศ:

```go
var age int
age = 20
fmt.Println(age)  // Output: 20
```

### วิธีที่ 3: Short Variable Declaration (แนะนำ)

```go
age := 20  // Go จะกำหนดชนิดข้อมูลให้อัตโนมัติ
fmt.Println(age)  // Output: 20
```

## 🎯 Zero Values ในภาษา Go

ตัวแปรที่ยังไม่ได้กำหนดค่าจะมี "Zero Value" ตามชนิดข้อมูล:

| ชนิดข้อมูล                                    | Zero Value          |
| --------------------------------------------- | ------------------- |
| `int`, `int8`, `int16`, `int32`, `int64`      | `0`                 |
| `uint`, `uint8`, `uint16`, `uint32`, `uint64` | `0`                 |
| `float32`, `float64`                          | `0.0`               |
| `bool`                                        | `false`             |
| `string`                                      | `""` (empty string) |
| `complex64`, `complex128`                     | `0+0i`              |

```go
var b bool
var s string
var f float64
fmt.Println(b, s, f)  // Output: false  0
```

## 🔄 Type Conversion (การแปลงชนิดข้อมูล)

### ตัวอย่างการแปลงชนิดข้อมูล

```go
// Float to Integer
f := 20.99
j := int(f)  // j = 20 (ตัดทศนิยมทิ้ง)
fmt.Println(j)  // Output: 20

// Integer to Float
i := 42
floatValue := float64(i)
fmt.Println(floatValue)  // Output: 42.0

// Integer to String (ต้อง import "strconv")
num := 123
str := strconv.Itoa(num)
fmt.Println(str)  // Output: "123"
```

**⚠️ สำคัญ:** Go เป็น strongly typed language ไม่สามารถแปลงชนิดข้อมูลอัตโนมัติ ต้องแปลงด้วยตนเอง

## 📋 ชนิดข้อมูลพื้นฐานใน Go

### 1. Boolean Type

```go
var isTrue bool = true
var isFalse bool = false
canDrive := age >= 18  // boolean expression
```

### 2. String Type

```go
var name string = "John Doe"
greeting := "Hello, " + name
multiLine := `This is a
multi-line string
using backticks`
```

### 3. Integer Types

#### Signed Integers

```go
var tiny int8 = -128      // -128 to 127
var small int16 = -32768  // -32,768 to 32,767
var medium int32 = -2147483648
var large int64 = -9223372036854775808
var auto int = 42  // ขึ้นกับสถาปัตยกรรม (32 หรือ 64 bit)
```

#### Unsigned Integers

```go
var uTiny uint8 = 255     // 0 to 255
var uSmall uint16 = 65535 // 0 to 65,535
var uMedium uint32 = 4294967295
var uLarge uint64 = 18446744073709551615
var uAuto uint = 42  // ขึ้นกับสถาปัตยกรรม
```

### 4. Special Integer Types

```go
var b byte = 255      // alias สำหรับ uint8
var r rune = 'A'      // alias สำหรับ int32 (Unicode code point)
var ptr uintptr = 0   // เก็บ pointer address
```

### 5. Floating Point Types

```go
var price32 float32 = 19.99
var price64 float64 = 29.99999999
pi := 3.14159  // default เป็น float64
```

### 6. Complex Numbers

```go
var c64 complex64 = 1 + 2i
var c128 complex128 = 2 + 3i
complex := 5 + 4i  // default เป็น complex128

// การดึงส่วนจริงและส่วนจินตภาพ
real := real(complex)  // 5.0
imag := imag(complex)  // 4.0
```

## 🆕 อัปเดตสำหรับ Go 2025

### การเปลี่ยนแปลงและการปรับปรุงที่สำคัญ:

1. **ปรับปรุงประสิทธิภาพ Type Inference**

- Go 1.23+ มีการปรับปรุง type inference ให้แม่นยำขึ้น
- รองรับ generic types ได้ดีขึ้น

2. **เพิ่ม Built-in Functions ใหม่**

```go
// Go 1.21+ รองรับ min, max, clear
maxValue := max(10, 20, 30)  // 30
minValue := min(1, 2, 3)     // 1
```

3. **การปรับปรุง String Handling**

```go
// Go 1.22+ มีการปรับปรุงการจัดการ string
name := "Go Developer"
length := len(name)  // ปรับปรุงประสิทธิภาพ
```

## 🧪 ตัวอย่างโค้ดสมบูรณ์

```go
package main

import (
   "fmt"
   "strconv"
)

func main() {
   // การประกาศตัวแปรหลายรูปแบบ
   var name string = "Go Developer"
   age := 25
   var isStudent bool = false

   // Zero values
   var defaultInt int
   var defaultBool bool
   var defaultString string

   fmt.Printf("Name: %s, Age: %d, Student: %t\n", name, age, isStudent)
   fmt.Printf("Defaults: %d, %t, '%s'\n", defaultInt, defaultBool, defaultString)

   // Type conversion
   floatAge := float64(age)
   stringAge := strconv.Itoa(age)

   fmt.Printf("Float age: %.2f, String age: %s\n", floatAge, stringAge)

   // Complex numbers
   complexNum := 3 + 4i
   fmt.Printf("Complex: %.1f, Real: %.1f, Imag: %.1f\n",
          complexNum, real(complexNum), imag(complexNum))
}
```

## 📊 เปรียบเทียบขนาดและช่วงค่า

```
┌─────────────┬──────────┬─────────────────────────────────┐
│    Type     │   Size   │            Range                │
├─────────────┼──────────┼─────────────────────────────────┤
│    int8     │  1 byte  │         -128 to 127             │
│   int16     │  2 bytes │      -32,768 to 32,767          │
│   int32     │  4 bytes │   -2,147,483,648 to 2,147,483,647│
│   int64     │  8 bytes │        -2⁶³ to 2⁶³-1            │
│   uint8     │  1 byte  │          0 to 255               │
│   uint16    │  2 bytes │         0 to 65,535             │
│   uint32    │  4 bytes │       0 to 4,294,967,295        │
│   uint64    │  8 bytes │         0 to 2⁶⁴-1              │
│  float32    │  4 bytes │   ±1.18e-38 to ±3.4e38          │
│  float64    │  8 bytes │  ±2.23e-308 to ±1.8e308         │
└─────────────┴──────────┴─────────────────────────────────┘
```

## 💡 Best Practices

1. **ใช้ Short Declaration (`:=`) เมื่อเป็นไปได้**
2. **เลือกชนิดข้อมูลที่เหมาะสมกับข้อมูล**
3. **ระวังการแปลงชนิดข้อมูลที่อาจสูญเสียข้อมูล**
4. **ใช้ `const` สำหรับค่าคงที่**

```go
const (
   MaxRetries = 3
   TimeoutSeconds = 30
   AppVersion = "2.0.1"
)
```

## 🚀 สรุป

การเข้าใจชนิดข้อมูลพื้นฐานและการประกาศตัวแปรใน Go เป็นพื้นฐานสำคัญในการเขียนโปรแกรม Go อย่างมีประสิทธิภาพ อย่าลืมว่า Go เป็นภาษาที่มี strong typing และต้องการการแปลงชนิดข้อมูลอย่างชัดเจน

---

_📝 เอกสารนี้ได้รับการอัปเดตสำหรับ Go 1.23+ และ Go 2025 รวมถึงการปรับปรุงใหม่ล่าสุด_
