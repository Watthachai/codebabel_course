# Interface ใน Go: คู่มือการใช้งานแบบครบถ้วน

## 📋 สารบัญ

- [Interface คืออะไร?](#interface-คืออะไร)
- [วิธีการสร้างและใช้งาน Interface](#วิธีการสร้างและใช้งาน-interface)
- [ตัวอย่างการใช้งานจริง](#ตัวอย่างการใช้งานจริง)
- [Best Practices และ Tips](#best-practices-และ-tips)
- [การอัปเดตจากเวอร์ชันเก่า](#การอัปเดตจากเวอร์ชันเก่า)

## Interface คืออะไร?

**Interface** ใน Go เป็นการกำหนด "สัญญา" (contract) ที่บอกว่าข้อมูลประเภทไหนต้องมี method อะไรบ้าง โดยไม่สนใจว่าข้อมูลนั้นจะเป็นประเภทไหน

### 🔍 แนวคิดหลัก

```
Interface = ชุดของ method signatures ที่ต้องมี
```

เมื่อใดก็ตามที่ struct หรือ type ใดๆ มี method ครบตามที่ interface กำหนด จะถือว่า type นั้น "implement" interface แล้ว

## วิธีการสร้างและใช้งาน Interface

### 1. การประกาศ Interface

```go
// การประกาศ interface
type Generator interface {
  Generate() string
}
```

### 2. การสร้าง Struct ที่ implement Interface

```go
// สร้าง struct
type PDF struct {
  Title   string
  Content string
}

// implement method ที่ interface ต้องการ
func (p PDF) Generate() string {
  return fmt.Sprintf("Generating PDF: %s with content: %s", p.Title, p.Content)
}
```

### 3. การใช้งาน Interface

```go
func main() {
  // สร้าง instance ของ PDF
  pdf := PDF{
    Title:   "Go Programming Guide",
    Content: "Learning interfaces in Go",
  }

  // ใช้ PDF ผ่าน interface
  var gen Generator = pdf
  fmt.Println(gen.Generate())
}
```

## ตัวอย่างการใช้งานจริง

### 📄 ตัวอย่างที่ 1: Document Generator

```go
package main

import "fmt"

// Interface สำหรับการสร้างเอกสาร
type DocumentGenerator interface {
  Generate() string
  GetFormat() string
}

// PDF struct
type PDF struct {
  Title   string
  Content string
}

func (p PDF) Generate() string {
  return fmt.Sprintf("📄 PDF Document: %s\nContent: %s", p.Title, p.Content)
}

func (p PDF) GetFormat() string {
  return "PDF"
}

// Word struct
type Word struct {
  Title   string
  Content string
}

func (w Word) Generate() string {
  return fmt.Sprintf("📝 Word Document: %s\nContent: %s", w.Title, w.Content)
}

func (w Word) GetFormat() string {
  return "DOCX"
}

// ฟังก์ชันที่รับ interface
func ProcessDocument(doc DocumentGenerator) {
  fmt.Println("Processing document...")
  fmt.Println("Format:", doc.GetFormat())
  fmt.Println(doc.Generate())
  fmt.Println("---")
}

func main() {
  pdf := PDF{
    Title:   "Go Interface Guide",
    Content: "Complete guide to Go interfaces",
  }

  word := Word{
    Title:   "Meeting Notes",
    Content: "Important project discussions",
  }

  // ใช้ function เดียวกันกับ type ที่ต่างกัน
  ProcessDocument(pdf)
  ProcessDocument(word)
}
```

### 🔄 ตัวอย่างที่ 2: Shape Calculator

```go
package main

import (
  "fmt"
  "math"
)

// Interface สำหรับรูปทรงเรขาคณิต
type Shape interface {
  Area() float64
  Perimeter() float64
  String() string
}

// วงกลม
type Circle struct {
  Radius float64
}

func (c Circle) Area() float64 {
  return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
  return 2 * math.Pi * c.Radius
}

func (c Circle) String() string {
  return fmt.Sprintf("Circle with radius %.2f", c.Radius)
}

// สี่เหลี่ยมผืนผ้า
type Rectangle struct {
  Width  float64
  Height float64
}

func (r Rectangle) Area() float64 {
  return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
  return 2 * (r.Width + r.Height)
}

func (r Rectangle) String() string {
  return fmt.Sprintf("Rectangle %.2f x %.2f", r.Width, r.Height)
}

// ฟังก์ชันคำนวณ
func CalculateShapeInfo(s Shape) {
  fmt.Printf("Shape: %s\n", s.String())
  fmt.Printf("Area: %.2f\n", s.Area())
  fmt.Printf("Perimeter: %.2f\n", s.Perimeter())
  fmt.Println("---")
}

func main() {
  shapes := []Shape{
    Circle{Radius: 5.0},
    Rectangle{Width: 4.0, Height: 6.0},
    Circle{Radius: 3.0},
  }

  fmt.Println("🔢 Shape Calculator")
  fmt.Println("==================")

  for _, shape := range shapes {
    CalculateShapeInfo(shape)
  }
}
```

## 📊 Visualization: Interface Concept

```
┌─────────────────┐
│   Interface     │
│  Generator      │
│                 │
│  + Generate()   │
└─────────────────┘
     ▲
     │ implements
     │
  ┌────┴────┐
  │         │
┌───▼───┐ ┌──▼──┐
│  PDF  │ │Word │
│       │ │     │
│ +Generate() +Generate()
└───────┘ └─────┘
```

## Best Practices และ Tips

### ✅ Do's

1. **ใช้ชื่อ interface ที่สื่อความหมาย**

```go
// ดี
type Reader interface {
  Read([]byte) (int, error)
}

// ไม่ดี
type MyInterface interface {
  DoSomething()
}
```

2. **Interface ควรเล็กและเฉพาะเจาะจง**

```go
// ดี - interface เล็กและมีจุดประสงค์ชัด
type Writer interface {
  Write([]byte) (int, error)
}

type Closer interface {
  Close() error
}

// รวมกันเมื่อจำเป็น
type WriteCloser interface {
  Writer
  Closer
}
```

3. **ใช้ Empty Interface เมื่อจำเป็น**

```go
// Go 1.18+ ใช้ any แทน interface{}
func PrintAny(value any) {
  fmt.Println(value)
}
```

### ❌ Don'ts

1. **ไม่ควรสร้าง interface ที่ใหญ่เกินไป**
2. **ไม่ควรสร้าง interface ก่อนที่จะมี implementation**
3. **หลีกเลี่ยงการใช้ pointer ใน interface method โดยไม่จำเป็น**

## การอัปเดตจากเวอร์ชันเก่า

### 🔄 สิ่งที่ได้ปรับปรุงจากเวอร์ชันเดิม:

#### 1. **การใช้ `any` แทน `interface{}` (Go 1.18+)**

```go
// เก่า
var value interface{} = "hello"

// ใหม่ (Go 1.18+)
var value any = "hello"
```

#### 2. **Type Parameters และ Generics (Go 1.18+)**

```go
// เก่า - ใช้ interface{} หรือ specific types
type Container struct {
  value interface{}
}

// ใหม่ - ใช้ generics
type Container[T any] struct {
  value T
}
```

#### 3. **การปรับปรุง Error Handling**

```go
// เก่า
type CustomError struct {
  message string
}

func (e CustomError) Error() string {
  return e.message
}

// ใหม่ - สามารถใช้ errors.New() และ fmt.Errorf() ได้ดีขึ้น
func NewCustomError(msg string) error {
  return fmt.Errorf("custom error: %w", errors.New(msg))
}
```

#### 4. **การใช้ Context ใน Interface**

```go
// Pattern ใหม่ที่แนะนำ
type Service interface {
  Process(ctx context.Context, data string) error
  Close(ctx context.Context) error
}
```

### 📈 การปรับปรุงประสิทธิภาพ

1. **การใช้ `strings.Builder` แทน string concatenation**

```go
// เก่า
func (p PDF) Generate() string {
  return "PDF: " + p.Title + " - " + p.Content
}

// ใหม่ - เร็วกว่าสำหรับ string ที่ยาว
func (p PDF) Generate() string {
  var builder strings.Builder
  builder.WriteString("PDF: ")
  builder.WriteString(p.Title)
  builder.WriteString(" - ")
  builder.WriteString(p.Content)
  return builder.String()
}
```

2. **การใช้ Embedding Interface**

```go
// Pattern ที่ดีขึ้นใน Go เวอร์ชันใหม่
type ReadWriter interface {
  io.Reader
  io.Writer
}
```

## สรุป

Interface ใน Go เป็นเครื่องมือที่ทรงพลังสำหรับการเขียนโค้ดที่ยืดหยุ่นและง่ายต่อการทดสอบ โดยการเข้าใจแนวคิดของ "implicit implementation" จะช่วยให้เราเขียนโค้ดที่ clean และ maintainable ได้ดีขึ้น

### 🎯 Key Takeaways:

- Interface กำหนด behavior ไม่ใช่ data
- การ implement interface เป็นแบบ implicit
- ใช้ interface เล็กๆ และเฉพาะเจาะจง
- อัปเดตไปใช้ feature ใหม่ของ Go 1.18+ เมื่อเป็นไปได้
