# การเขียนโปรแกรม Go: การวนซ้ำและคำสั่ง Switch - คู่มือสมบูรณ์ 2025

> **อัปเดตสำหรับ Go 1.24** - คู่มือนี้ได้รับการปรับปรุงด้วยแนวปฏิบัติ Go สมัยใหม่ ตัวอย่างเพิ่มเติม และคำอธิบายที่ครอบคลุมสำหรับผู้เริ่มต้นและสมาชิกในทีม

## 📚 สารบัญ

- [การวนซ้ำใน Go](#การวนซ้ำใน-go)
- [คำสั่ง Switch Case](#คำสั่ง-switch-case)
- [แนวปฏิบัติที่ดีและการอัปเดตสมัยใหม่](#แนวปฏิบัติที่ดีและการอัปเดตสมัยใหม่)
- [ตัวอย่างการฝึกปฏิบัติ](#ตัวอย่างการฝึกปฏิบัติ)

---

## 🔄 การวนซ้ำใน Go

### ภาพรวม

Go ทำให้ไวยากรณ์การวนซ้ำง่ายขึ้นโดยมีเพียงคำสั่ง `for` เท่านั้น - ไม่ต้องใช้ `while` หรือ `do-while`! การวนซ้ำ `for` ใน Go มีความยืดหยุ่นและทรงพลัง สามารถจัดการทุกสถานการณ์การวนซ้ำ

### 1. โครงสร้างพื้นฐานของการวนซ้ำ For

```go
// การวนซ้ำแบบสามส่วนคลาสสิก
for การเริ่มต้น; เงื่อนไข; หลังการวนซ้ำ {
  // บล็อกโค้ด
}
```

**📝 ตัวอย่าง: พิมพ์ตัวเลข 1 ถึง 10**

```go
package main

import "fmt"

func main() {
  // สามส่วน: เริ่มต้น; เงื่อนไข; เพิ่มค่า
  for n := 1; n <= 10; n++ {
    fmt.Println(n)
  }
}
```

**ผลลัพธ์:**

```
1
2
3
4
5
6
7
8
9
10
```

### 2. การวนซ้ำแบบ While (เงื่อนไขเท่านั้น)

```go
// การวนซ้ำแบบ while - มีเฉพาะส่วนเงื่อนไข
for เงื่อนไข {
  // บล็อกโค้ด
}
```

**📝 ตัวอย่าง: ผลลัพธ์เดียวกันแต่แบบ while**

```go
package main

import "fmt"

func main() {
  n := 1  // เริ่มต้นข้างนอก
  for n <= 10 {  // เฉพาะเงื่อนไข
    fmt.Println(n)
    n++  // เพิ่มค่าด้วยตนเองภายในลูป
  }
}
```

### 3. การวนซ้ำไม่สิ้นสุด

```go
// การวนซ้ำไม่สิ้นสุด - ไม่มีเงื่อนไข
for {
  // โค้ดที่ทำงานตลอดไป
}
```

**📝 ตัวอย่าง: Hello ไม่สิ้นสุด (ใช้ Ctrl+C เพื่อหยุด)**

```go
package main

import "fmt"

func main() {
  for {
    fmt.Println("สวัสดี")
    // ทำงานตลอดไปจนกว่าจะหยุดด้วยตนเอง
  }
}
```

### 🆕 การปรับปรุงใน Go 1.24 สมัยใหม่

#### Range บนตัวเลข (ใหม่ใน Go 1.23+)

```go
package main

import "fmt"

func main() {
  // วิธีสมัยใหม่ในการวนซ้ำตัวเลข
  for i := range 10 {
    fmt.Println(i) // พิมพ์ 0-9
  }

  // หากต้องการ 1-10:
  for i := range 10 {
    fmt.Println(i + 1) // พิมพ์ 1-10
  }
}
```

---

## 🔀 คำสั่ง Switch Case

### ภาพรวม

คำสั่ง `switch` ของ Go มีความทรงพลังและสะอาดกว่าในภาษาอื่นๆ ไม่ต้องใช้คำสั่ง `break` - Go จะ break อัตโนมัติหลังแต่ละ case!

### 1. คำสั่ง Switch พื้นฐาน

```go
switch ตัวแปร {
case ค่า1:
  // โค้ดสำหรับค่า1
case ค่า2:
  // โค้ดสำหรับค่า2
default:
  // โค้ดเริ่มต้น
}
```

**📝 ตัวอย่าง: ตรวจสอบวันหยุด**

```go
package main

import "fmt"

func main() {
  day := "อาทิตย์"

  switch day {
  case "อาทิตย์":
    fmt.Println("วันหยุด!")
  case "เสาร์":
    fmt.Println("วันหยุด!")
  default:
    fmt.Println("วันทำงาน")
  }
}
```

### 2. หลายค่าใน Case เดียว

```go
// รวมหลายค่าด้วยจุลภาค
case ค่า1, ค่า2, ค่า3:
  // โค้ดสำหรับค่าทั้งหมดนี้
```

**📝 ตัวอย่าง: ตรวจสอบวันหยุดที่ปรับปรุงแล้ว**

```go
package main

import "fmt"

func main() {
  day := "เสาร์"

  switch day {
  case "อาทิตย์", "เสาร์":  // หลายค่าใน case เดียว
    fmt.Println("วันหยุด!")
  case "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์":
    fmt.Println("วันทำงาน")
  default:
    fmt.Println("วันไม่ถูกต้อง")
  }
}
```

### 3. Switch พร้อมการประกาศตัวแปร

```go
// ประกาศตัวแปรในคำสั่ง switch
switch ตัวแปร := ค่าบางอย่าง; ตัวแปร {
case ค่า1:
  // โค้ด
}
```

**📝 ตัวอย่าง: การประกาศแบบ Inline**

```go
package main

import "fmt"

func main() {
  // ประกาศตัวแปร day โดยตรงใน switch
  switch day := "จันทร์"; day {
  case "อาทิตย์", "เสาร์":
    fmt.Println("วันหยุด!")
  default:
    fmt.Println("วันทำงาน")
  }
  // ตัวแปร 'day' จะใช้ได้เฉพาะภายใน switch เท่านั้น
}
```

### 🆕 คุณสมบัติ Switch ใน Go 1.24 สมัยใหม่

#### การปรับปรุง Type Switch

```go
package main

import "fmt"

func main() {
  var value interface{} = 42

  switch v := value.(type) {
  case int:
    fmt.Printf("จำนวนเต็ม: %d\n", v)
  case string:
    fmt.Printf("ข้อความ: %s\n", v)
  case bool:
    fmt.Printf("บูลีน: %t\n", v)
  default:
    fmt.Printf("ประเภทไม่ทราบ: %T\n", v)
  }
}
```

---

## 🎯 แนวปฏิบัติที่ดีและการอัปเดตสมัยใหม่

### ✅ สิ่งใหม่ใน Go 1.24

1. **การวนซ้ำ Range ที่ปรับปรุงแล้ว**: Range โดยตรงบนตัวเลข
2. **การอนุมานประเภทที่ดีขึ้น**: การตรวจจับประเภทตัวแปรที่ดีกว่า
3. **การปรับแต่งประสิทธิภาพ**: การเรียกใช้ลูปที่เร็วขึ้น
4. **ประสิทธิภาพหน่วยความจำ**: การรวบรวมข้อมูลขยะในลูปที่ลดลง

### 📋 แนวปฏิบัติที่ดี

#### การวนซ้ำ For

```go
// ✅ ดี: ชื่อตัวแปรที่ชัดเจน
for userIndex := 0; userIndex < len(users); userIndex++ {
  processUser(users[userIndex])
}

// ✅ ดีกว่า: ใช้ range เมื่อเป็นไปได้
for index, user := range users {
  processUser(user)
}

// ✅ สมัยใหม่: Range บนตัวเลข (Go 1.23+)
for i := range 5 {
  fmt.Printf("การวนซ้ำ %d\n", i)
}
```

#### คำสั่ง Switch

```go
// ✅ ดี: จัดกลุ่ม case ที่เกี่ยวข้อง
switch httpStatus {
case 200, 201, 202:
  handleSuccess()
case 400, 401, 403:
  handleClientError()
case 500, 502, 503:
  handleServerError()
default:
  handleUnknownError()
}

// ✅ ดี: ใช้ switch สำหรับเงื่อนไขที่ซับซ้อน
switch {
case score >= 90:
  grade = "A"
case score >= 80:
  grade = "B"
case score >= 70:
  grade = "C"
default:
  grade = "F"
}
```

---

## 🏋️‍♂️ ตัวอย่างการฝึกปฏิบัติ

### ตัวอย่าง 1: FizzBuzz ด้วย Go สมัยใหม่

```go
package main

import "fmt"

func main() {
  // ไวยากรณ์ range สมัยใหม่ (Go 1.23+)
  for i := range 15 {
    num := i + 1  // แปลงจาก 0-based เป็น 1-based

    switch {
    case num%15 == 0:
      fmt.Println("FizzBuzz")
    case num%3 == 0:
      fmt.Println("Fizz")
    case num%5 == 0:
      fmt.Println("Buzz")
    default:
      fmt.Println(num)
    }
  }
}
```

### ตัวอย่าง 2: ระบบเมนู

```go
package main

import "fmt"

func main() {
  for {
    fmt.Println("\n=== เมนู ===")
    fmt.Println("1. ดูโปรไฟล์")
    fmt.Println("2. การตั้งค่า")
    fmt.Println("3. ออก")
    fmt.Print("เลือกตัวเลือก: ")

    var choice int
    fmt.Scanf("%d", &choice)

    switch choice {
    case 1:
      fmt.Println("📋 กำลังดูโปรไฟล์...")
    case 2:
      fmt.Println("⚙️ กำลังเปิดการตั้งค่า...")
    case 3:
      fmt.Println("👋 ลาก่อน!")
      return  // ออกจากลูปไม่สิ้นสุด
    default:
      fmt.Println("❌ ตัวเลือกไม่ถูกต้อง!")
    }
  }
}
```

---

## 📊 การเปรียบเทียบประสิทธิภาพ

| ประเภทลูป     | กรณีการใช้งาน    | ประสิทธิภาพ | ความอ่านง่าย |
| ------------- | ---------------- | ----------- | ------------ |
| For คลาสสิก   | ตัวนับ, ดัชนี    | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐     |
| Range For     | Slices, arrays   | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐   |
| แบบ While     | ลูปแบบมีเงื่อนไข | ⭐⭐⭐⭐    | ⭐⭐⭐       |
| Range Integer | การนับง่ายๆ      | ⭐⭐⭐⭐⭐  | ⭐⭐⭐⭐⭐   |

---

## 🔗 สิ่งสำคัญที่ควรจำ

### การวนซ้ำ For

- ✅ Go มีเพียงลูป `for` - จัดการทุกสถานการณ์
- ✅ ไม่ต้องใช้วงเล็บรอบเงื่อนไข
- ✅ สามส่วน: การเริ่มต้น; เงื่อนไข; คำสั่งหลัง
- ✅ สามารถข้ามส่วนได้สำหรับแบบ while หรือไม่สิ้นสุด
- 🆕 Go สมัยใหม่รองรับ range บนตัวเลข

### คำสั่ง Switch

- ✅ ไม่ต้องใช้ `break` - ป้องกัน fallthrough อัตโนมัติ
- ✅ หลายค่าต่อ case ด้วยการแยกด้วยจุลภาค
- ✅ สามารถประกาศตัวแปรแบบ inline
- ✅ Switch ไม่มีนิพจน์สำหรับเงื่อนไขซับซ้อน
- 🆕 Type switching ที่ดีขึ้นใน Go 1.24

---

_อัปเดตสำหรับ Go 1.24 ด้วยไวยากรณ์สมัยใหม่และแนวปฏิบัติที่ดี พร้อมสำหรับการใช้งานจริงในปี 2025!_ 🚀
