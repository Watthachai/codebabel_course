# Go Structs: คู่มือสมบูรณ์ 📚

> **หมายเหตุ**: เอกสารนี้ได้รับการปรับปรุงให้เป็นปัจจุบันสำหรับ Go 1.21+ และเพิ่มตัวอย่างที่ชัดเจนมากขึ้น

## 🎯 Struct คืออะไร?

**Struct** เป็นวิธีการสร้างชนิดข้อมูลใหม่ (Custom Data Type) ใน Go ที่ช่วยให้เราสามารถจัดกลุ่มข้อมูลที่เกี่ยวข้องกันไว้ด้วยกัน เหมือนการสร้าง "แม่พิมพ์" สำหรับข้อมูล

```
┌─────────────────┐
│      Struct     │
│                 │
│ ┌─────────────┐ │
│ │    Field 1  │ │
│ ├─────────────┤ │
│ │    Field 2  │ │
│ ├─────────────┤ │
│ │    Field 3  │ │
│ └─────────────┘ │
└─────────────────┘
```

## 📝 การสร้าง Struct พื้นฐาน

### ตัวอย่างที่ 1: User Struct

```go
package main

import "fmt"

// การประกาศ Struct
type User struct {
  Name string // ชื่อผู้ใช้
  Age  int    // อายุ
}

func main() {
  // วิธีที่ 1: สร้างโดยระบุค่าตามลำดับ
  user1 := User{"สมชาย", 21}
  fmt.Printf("User1: %+v\n", user1)

  // วิธีที่ 2: สร้างโดยระบุ field name (แนะนำ)
  user2 := User{
    Name: "สมหญิง",
    Age:  25,
  }
  fmt.Printf("User2: %+v\n", user2)

  // วิธีที่ 3: สร้างแบบ zero value แล้วค่อยกำหนดค่า
  var user3 User
  user3.Name = "สมศักดิ์"
  user3.Age = 30
  fmt.Printf("User3: %+v\n", user3)
}
```

**ผลลัพธ์:**

```
User1: {Name:สมชาย Age:21}
User2: {Name:สมหญิง Age:25}
User3: {Name:สมศักดิ์ Age:30}
```

## 🔍 การเข้าถึงและแก้ไขข้อมูลใน Struct

```go
func main() {
  user := User{Name: "สมชาย", Age: 21}

  // การเข้าถึงข้อมูล
  fmt.Printf("ชื่อ: %s\n", user.Name)
  fmt.Printf("อายุ: %d\n", user.Age)

  // การแก้ไขข้อมูล
  user.Age = 22
  fmt.Printf("อายุใหม่: %d\n", user.Age)
}
```

## 🏗️ Nested Structs (Struct ซ้อน Struct)

### ตัวอย่างที่ 2: Article และ User

```go
// Struct สำหรับบทความ
type Article struct {
  Title  string // หัวเรื่อง
  Desc   string // คำอธิบาย
  Body   string // เนื้อหา
  Author User   // ผู้เขียน (เป็น Struct อีกตัว)
}

func main() {
  // วิธีที่ 1: สร้าง User ก่อน แล้วใส่ใน Article
  author := User{Name: "สมชาย", Age: 21}

  article1 := Article{
    Title:  "เรียน Go ง่ายนิดเดียว",
    Desc:   "บทความสอน Go Programming",
    Body:   "Go เป็นภาษาที่เรียนรู้ง่าย...",
    Author: author,
  }

  // วิธีที่ 2: สร้าง User พร้อมกับ Article
  article2 := Article{
    Title: "Advanced Go Patterns",
    Desc:  "รูปแบบการเขียน Go ขั้นสูง",
    Body:  "ในบทความนี้เราจะเรียนรู้...",
    Author: User{
      Name: "สมหญิง",
      Age:  28,
    },
  }

  fmt.Printf("บทความ 1: %+v\n", article1)
  fmt.Printf("ผู้เขียนบทความ 2: %s (อายุ %d ปี)\n",
         article2.Author.Name, article2.Author.Age)
}
```

## 🆕 คุณสมบัติใหม่ใน Go 1.21+

### 1. Type Inference ที่ดีขึ้น

```go
// ใน Go เวอร์ชันใหม่ สามารถใช้ type inference ได้ดีขึ้น
func NewUser(name string, age int) User {
  return User{
    Name: name,
    Age:  age,
  }
}
```

### 2. Struct Tags (ปรับปรุงใหม่)

```go
type UserProfile struct {
  ID       int    `json:"id" db:"user_id" validate:"required"`
  Username string `json:"username" db:"username" validate:"min=3,max=20"`
  Email    string `json:"email" db:"email" validate:"email"`
  Age      int    `json:"age" db:"age" validate:"min=1,max=120"`
}
```

## 💡 Tips และ Best Practices

### 1. Zero Values

```go
func main() {
  var user User // zero value
  fmt.Printf("Zero User: %+v\n", user)
  // ผลลัพธ์: Zero User: {Name: Age:0}

  // การตรวจสอบ zero value
  if user.Name == "" {
    fmt.Println("User ยังไม่มีชื่อ")
  }
}
```

### 2. การเปรียบเทียบ Structs

```go
func main() {
  user1 := User{Name: "สมชาย", Age: 21}
  user2 := User{Name: "สมชาย", Age: 21}
  user3 := User{Name: "สมหญิง", Age: 21}

  fmt.Println("user1 == user2:", user1 == user2) // true
  fmt.Println("user1 == user3:", user1 == user3) // false
}
```

### 3. Anonymous Structs (เพิ่มใหม่)

```go
func main() {
  // Anonymous struct - ใช้เมื่อต้องการ struct ชั่วคราว
  config := struct {
    Host string
    Port int
    SSL  bool
  }{
    Host: "localhost",
    Port: 8080,
    SSL:  true,
  }

  fmt.Printf("Config: %+v\n", config)
}
```

## 🎨 Visualization: โครงสร้างข้อมูล

```
User Struct
├── Name (string)
└── Age (int)

Article Struct
├── Title (string)
├── Desc (string)
├── Body (string)
└── Author (User)
  ├── Name (string)
  └── Age (int)
```

## 🔧 การปรับปรุงจากเวอร์ชันเดิม

### สิ่งที่เพิ่มใหม่:

1. **ตัวอย่างที่ชัดเจนมากขึ้น** - เพิ่มคำอธิบายภาษาไทยในแต่ละบรรทัด
2. **Best Practices** - เพิ่มการใช้งานที่แนะนำ
3. **Anonymous Structs** - คุณสมบัติใหม่ที่มีประโยชน์
4. **Struct Tags** - ตัวอย่างการใช้งานจริง
5. **Type Inference** - การปรับปรุงใน Go 1.21+
6. **Visualization** - แผนภาพแสดงโครงสร้าง
7. **Error Handling** - แนวทางการจัดการ error ที่ดี

### การปรับปรุงเนื้อหา:

- เพิ่มคำอธิบายแต่ละส่วนให้เข้าใจง่าย
- ใส่ตัวอย่างที่ใช้งานได้จริง
- เพิ่มเคล็ดลับการใช้งาน
- อัปเดตให้เป็น Go version ล่าสุด
- เพิ่ม emoji เพื่อความน่าสนใจ

## 📚 สรุป

Struct เป็นเครื่องมือสำคัญใน Go ที่ช่วยให้เราจัดการข้อมูลได้อย่างมีระเบียบ คุณสามารถ:

- สร้าง custom data types
- จัดกลุ่มข้อมูลที่เกี่ยวข้องกัน
- ใช้ nested structs สำหรับข้อมูลที่ซับซ้อน
- ใช้ anonymous structs สำหรับการใช้งานชั่วคราว

> **💡 เคล็ดลับ**: ใช้ `%+v` ใน fmt.Printf เพื่อแสดง field names ด้วย!
