# Go Language: Polymorphism, Type Assertions, Type Switch & Empty Interface

> 📝 **Version Update Notice**: This documentation has been updated for Go 1.21+ (2024) with modern best practices and enhanced examples for better understanding.

## 📖 Table of Contents

- [Polymorphism](#polymorphism)
- [Type Assertions](#type-assertions)
- [Type Switch](#type-switch)
- [Empty Interface](#empty-interface)
- [Best Practices & Modern Go](#best-practices--modern-go)

---

## 🎭 Polymorphism

### What is Polymorphism?

**Polymorphism** คือความสามารถที่ออบเจ็กต์หนึ่งสามารถเป็นได้หลายรูปร่าง ในภาษา Go เราสามารถสร้าง Polymorphism ได้ผ่าน Interface

### 🔍 Real-World Example

```go
// กำหนด Interface สำหรับรูปทรงที่สามารถคำนวณพื้นที่ได้
type Shape interface {
  Area() float64
  Perimeter() float64  // เพิ่มเติม: เส้นรอบรูป (Go 1.21+)
}

// รูปวงกลม
type Circle struct {
  Radius float64
}

func (c Circle) Area() float64 {
  return 3.14159 * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
  return 2 * 3.14159 * c.Radius
}

// รูปสี่เหลี่ยมผืนผ้า
type Rectangle struct {
  Width, Height float64
}

func (r Rectangle) Area() float64 {
  return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
  return 2 * (r.Width + r.Height)
}

// รูปสามเหลี่ยม (เพิ่มใหม่)
type Triangle struct {
  Base, Height, Side1, Side2 float64
}

func (t Triangle) Area() float64 {
  return 0.5 * t.Base * t.Height
}

func (t Triangle) Perimeter() float64 {
  return t.Base + t.Side1 + t.Side2
}
```

### 🚀 Polymorphic Function

```go
// ฟังก์ชันที่รับ Shape interface - สามารถรับรูปทรงใดก็ได้
func PrintShapeDetails(s Shape) {
  fmt.Printf("Area: %.2f\n", s.Area())
  fmt.Printf("Perimeter: %.2f\n", s.Perimeter())
  fmt.Println("---")
}

// ฟังก์ชันคำนวณพื้นที่รวม (Modern Go style)
func TotalArea(shapes ...Shape) float64 {
  total := 0.0
  for _, shape := range shapes {
    total += shape.Area()
  }
  return total
}

func main() {
  // สร้างรูปทรงต่างๆ
  circle := Circle{Radius: 5}
  rectangle := Rectangle{Width: 4, Height: 6}
  triangle := Triangle{Base: 3, Height: 4, Side1: 3, Side2: 5}

  // Polymorphism ในการใช้งาน
  shapes := []Shape{circle, rectangle, triangle}

  fmt.Println("=== Shape Details ===")
  for i, shape := range shapes {
    fmt.Printf("Shape %d:\n", i+1)
    PrintShapeDetails(shape)
  }

  fmt.Printf("Total Area: %.2f\n", TotalArea(shapes...))
}
```

### 📊 Visual Representation

```
Interface Shape
  ↙     ↓     ↘
Circle Rectangle Triangle
   ↓       ↓        ↓
Area() Area()   Area()
Perim() Perim() Perim()
```

---

## 🔍 Type Assertions

### What are Type Assertions?

**Type Assertions** เป็นกลไกในการเข้าถึงค่าข้อมูลที่แท้จริงที่ Interface จัดเก็บอยู่

### 🎯 Basic Type Assertion

```go
func main() {
  var s Shape = Circle{Radius: 5}

  // ❌ ไม่สามารถเข้าถึง Radius โดยตรงได้
  // fmt.Println(s.Radius) // Error!

  // ✅ ใช้ Type Assertion
  circle := s.(Circle)
  fmt.Printf("Radius: %.2f\n", circle.Radius)
}
```

### 🛡️ Safe Type Assertion (Recommended)

```go
func SafeTypeAssertion() {
  var s Shape = Circle{Radius: 5}

  // Safe type assertion with ok pattern
  if circle, ok := s.(Circle); ok {
    fmt.Printf("It's a circle with radius: %.2f\n", circle.Radius)
    fmt.Printf("Area: %.2f\n", circle.Area())
  } else {
    fmt.Println("Not a circle")
  }

  // ตัวอย่างเมื่อ Type Assertion ล้มเหลว
  if rectangle, ok := s.(Rectangle); ok {
    fmt.Println("It's a rectangle")
  } else {
    fmt.Printf("Not a rectangle. Got zero value: %+v\n", rectangle)
  }
}
```

### 🔧 Advanced Type Assertion Example

```go
// Helper function สำหรับการจัดการ Type Assertion
func GetShapeInfo(s Shape) {
  switch v := s.(type) {
  case Circle:
    fmt.Printf("Circle - Radius: %.2f, Area: %.2f\n",
           v.Radius, v.Area())
  case Rectangle:
    fmt.Printf("Rectangle - %s%.2f x %.2f, Area: %.2f\n",
           v.Width, v.Height, v.Area())
  case Triangle:
    fmt.Printf("Triangle - Base: %.2f, Height: %.2f, Area: %.2f\n",
           v.Base, v.Height, v.Area())
  default:
    fmt.Printf("Unknown shape type: %T\n", v)
  }
}
```

---

## 🔀 Type Switch

### What is Type Switch?

**Type Switch** เป็นการใช้ switch statement เพื่อพิจารณาชนิดข้อมูลที่ Interface จัดเก็บอยู่

### 🎨 Basic Type Switch

```go
func AnalyzeShape(s Shape) {
  switch shape := s.(type) {
  case Circle:
    fmt.Printf("🔵 Circle detected!\n")
    fmt.Printf("   Radius: %.2f\n", shape.Radius)
    fmt.Printf("   Diameter: %.2f\n", shape.Radius*2)

  case Rectangle:
    fmt.Printf("⬜ Rectangle detected!\n")
    fmt.Printf("   Dimensions: %.2f x %.2f\n", shape.Width, shape.Height)
    if shape.Width == shape.Height {
      fmt.Printf("   📦 This is actually a square!\n")
    }

  case Triangle:
    fmt.Printf("🔺 Triangle detected!\n")
    fmt.Printf("   Base: %.2f, Height: %.2f\n", shape.Base, shape.Height)

  default:
    fmt.Printf("❓ Unknown shape: %T\n", shape)
  }
}
```

### 🚀 Advanced Type Switch with Interface Composition

```go
// เพิ่ม interface ใหม่ (Go 1.21+ style)
type Drawable interface {
  Draw()
}

type ColoredShape interface {
  Shape
  Drawable
  GetColor() string
}

type ColoredCircle struct {
  Circle
  Color string
}

func (cc ColoredCircle) Draw() {
  fmt.Printf("Drawing a %s circle\n", cc.Color)
}

func (cc ColoredCircle) GetColor() string {
  return cc.Color
}

func ProcessShape(s interface{}) {
  switch v := s.(type) {
  case ColoredShape:
    fmt.Printf("🎨 Colored Shape: %s\n", v.GetColor())
    v.Draw()
    fmt.Printf("Area: %.2f\n", v.Area())

  case Shape:
    fmt.Printf("📐 Regular Shape\n")
    fmt.Printf("Area: %.2f\n", v.Area())

  case string:
    fmt.Printf("📝 Text: %s\n", v)

  case int, int32, int64:
    fmt.Printf("🔢 Number: %v\n", v)

  default:
    fmt.Printf("❓ Unknown type: %T\n", v)
  }
}
```

---

## 🌟 Empty Interface

### What is Empty Interface?

**Empty Interface** (`interface{}`) เป็น interface ที่ไม่มีการกำหนด method ใดๆ ทำให้สามารถเก็บค่าข้อมูลประเภทใดก็ได้

> 🆕 **Go 1.18+ Update**: ใน Go เวอร์ชันใหม่ สามารถใช้ `any` แทน `interface{}` ได้

### 🎯 Basic Empty Interface Usage

```go
func EmptyInterfaceDemo() {
  // Go 1.17 และก่อนหน้า
  var oldStyle interface{}

  // Go 1.18+ (Recommended)
  var newStyle any

  // สามารถเก็บค่าอะไรก็ได้
  oldStyle = 42
  oldStyle = "Hello, Go!"
  oldStyle = true
  oldStyle = []int{1, 2, 3}

  newStyle = Circle{Radius: 5}
  fmt.Printf("Stored value: %v, Type: %T\n", newStyle, newStyle)
}
```

### 📦 Practical Example: Generic Storage

```go
// สร้าง slice ที่เก็บข้อมูลหลากหลายประเภท
func MixedDataExample() {
  // Go 1.17 style
  data := []interface{}{
    "Hello",
    42,
    3.14,
    true,
    Circle{Radius: 5},
    []string{"a", "b", "c"},
  }

  // Go 1.18+ style (Recommended)
  modernData := []any{
    "Hello",
    42,
    3.14,
    true,
    Circle{Radius: 5},
    map[string]int{"count": 10},
  }

  fmt.Println("=== Processing Mixed Data ===")
  for i, item := range modernData {
    fmt.Printf("Item %d: ", i+1)
    ProcessShape(item) // ใช้ฟังก์ชันที่สร้างไว้ก่อนหน้า
  }
}
```

### 🔧 Modern JSON-like Data Structure

```go
// สร้างโครงสร้างข้อมูลแบบ JSON-like
type Config map[string]any

func (c Config) GetString(key string) (string, bool) {
  if value, exists := c[key]; exists {
    if str, ok := value.(string); ok {
      return str, true
    }
  }
  return "", false
}

func (c Config) GetInt(key string) (int, bool) {
  if value, exists := c[key]; exists {
    if num, ok := value.(int); ok {
      return num, true
    }
  }
  return 0, false
}

func ConfigExample() {
  config := Config{
    "app_name":    "MyApp",
    "port":        8080,
    "debug":       true,
    "features":    []string{"auth", "api", "web"},
    "database": map[string]any{
      "host": "localhost",
      "port": 5432,
    },
  }

  if appName, ok := config.GetString("app_name"); ok {
    fmt.Printf("App Name: %s\n", appName)
  }

  if port, ok := config.GetInt("port"); ok {
    fmt.Printf("Port: %d\n", port)
  }
}
```

---

## 🚀 Best Practices & Modern Go

### 📋 What's Updated in This Documentation

1. **✅ Go 1.18+ Features**:

   - ใช้ `any` แทน `interface{}`
   - แสดงตัวอย่าง Generics ที่เหมาะสม

2. **✅ Enhanced Examples**:

   - เพิ่มตัวอย่างที่ใช้งานได้จริง
   - เพิ่ม error handling ที่ดีขึ้น
   - เพิ่ม interface composition

3. **✅ Modern Patterns**:
   - Safe type assertions with ok pattern
   - Better naming conventions
   - Enhanced documentation

### 🎯 Best Practices

```go
// ✅ DO: ใช้ safe type assertion
if circle, ok := shape.(Circle); ok {
  // ใช้งาน circle
}

// ❌ DON'T: ใช้ type assertion โดยไม่ตรวจสอบ
circle := shape.(Circle) // อาจ panic!

// ✅ DO: ใช้ any แทน interface{} (Go 1.18+)
func ProcessAny(data any) { /* ... */ }

// ✅ DO: ตั้งชื่อ interface แบบ -er
type Reader interface { Read() }
type Writer interface { Write() }

// ✅ DO: เก็บ interface เล็กๆ
type Shape interface {
  Area() float64
}

type Drawable interface {
  Draw()
}
```

### 📈 Performance Tips

```go
// ✅ ใช้ type switch แทน multiple type assertions
func ProcessShapeEfficient(s Shape) {
  switch v := s.(type) {
  case Circle:
    // handle circle
  case Rectangle:
    // handle rectangle
  default:
    // handle others
  }
}

// ❌ หลีกเลี่ยงการใช้ type assertion หลายครั้ง
func ProcessShapeInefficient(s Shape) {
  if _, ok := s.(Circle); ok {
    circle := s.(Circle) // duplicate type assertion
    // handle circle
  }
}
```

### 🔗 Related Resources

- [Go 1.24 Release Notes](https://golang.org/doc/go1.24)
- [Effective Go - Interfaces](https://golang.org/doc/effective_go#interfaces)
- [Go Blog - Interface Types](https://blog.golang.org/interfaces)

---

> 💡 **สรุป**: บทเรียนนี้ครอบคลุม Polymorphism, Type Assertions, Type Switch และ Empty Interface ในภาษา Go พร้อมตัวอย่างที่ทันสมัยและใช้งานได้จริง เหมาะสำหรับผู้เริ่มต้นและผู้ที่ต้องการทบทวนความรู้
