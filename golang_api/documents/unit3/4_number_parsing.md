# 🔢 Number Parsing และ Type Conversion ใน Go

## 📋 Overview

ใน Go เรามีแพ็คเกจ `strconv` ที่ให้ฟังก์ชันสำหรับการแปลงข้อมูลระหว่าง string และประเภทข้อมูลต่างๆ เป็นเครื่องมือที่สำคัญมากสำหรับการพัฒนาแอปพลิเคชัน

## 🎯 สิ่งที่จะเรียนรู้

- การใช้งาน `strconv.ParseFloat()`
- การใช้งาน `strconv.ParseInt()`
- การใช้งาน `strconv.ParseUint()`
- การใช้งาน `strconv.Atoi()`
- การใช้งาน `strconv.Itoa()`
- การจัดการ Error ที่เกิดขึ้น
- Best Practices และ Tips

---

## 📊 Function Overview Table

| Function                      | Input            | Output         | Description                       |
| ----------------------------- | ---------------- | -------------- | --------------------------------- |
| `ParseFloat(s, bitSize)`      | string, int      | float64, error | แปลง string เป็น floating point   |
| `ParseInt(s, base, bitSize)`  | string, int, int | int64, error   | แปลง string เป็น signed integer   |
| `ParseUint(s, base, bitSize)` | string, int, int | uint64, error  | แปลง string เป็น unsigned integer |
| `Atoi(s)`                     | string           | int, error     | แปลง string เป็น int (shorthand)  |
| `Itoa(i)`                     | int              | string         | แปลง int เป็น string              |

---

## 🔍 1. ParseFloat() - แปลง String เป็น Float

### Syntax

```go
func ParseFloat(s string, bitSize int) (float64, error)
```

### Parameters

- `s`: string ที่ต้องการแปลง
- `bitSize`: ขนาดของ floating point (32 หรือ 64 bits)

### ✅ ตัวอย่างการใช้งาน

```go
package main

import (
  "fmt"
  "strconv"
)

func main() {
  // ตัวอย่างที่ 1: การแปลง string ธรรมดา
  str1 := "3.14159"
  if f1, err := strconv.ParseFloat(str1, 64); err == nil {
    fmt.Printf("ParseFloat('%s', 64) = %.5f (type: %T)\n", str1, f1, f1)
  }

  // ตัวอย่างที่ 2: การแปลงเป็น float32
  str2 := "2.71828"
  if f2, err := strconv.ParseFloat(str2, 32); err == nil {
    f32 := float32(f2)
    fmt.Printf("ParseFloat('%s', 32) = %.5f (type: %T)\n", str2, f32, f32)
  }

  // ตัวอย่างที่ 3: การใช้ underscore สำหรับ error ที่ไม่สนใจ
  val, _ := strconv.ParseFloat("3.14", 64)
  fmt.Printf("Value without error handling: %.2f\n", val)
}
```

### 📈 Output

```
ParseFloat('3.14159', 64) = 3.14159 (type: float64)
ParseFloat('2.71828', 32) = 2.71828 (type: float32)
Value without error handling: 3.14
```

---

## 🔢 2. ParseInt() - แปลง String เป็น Signed Integer

### Syntax

```go
func ParseInt(s string, base int, bitSize int) (int64, error)
```

### Parameters

- `s`: string ที่ต้องการแปลง
- `base`: ฐานของตัวเลข (2, 8, 10, 16 หรือ 0 สำหรับ auto-detect)
- `bitSize`: ขนาดของ integer (8, 16, 32, 64)

### ✅ ตัวอย่างการใช้งาน

```go
package main

import (
  "fmt"
  "strconv"
)

func main() {
  // Binary (ฐาน 2)
  binary := "1010"
  if val, err := strconv.ParseInt(binary, 2, 64); err == nil {
    fmt.Printf("Binary '%s' = %d (decimal)\n", binary, val)
  }

  // Octal (ฐาน 8)
  octal := "755"
  if val, err := strconv.ParseInt(octal, 8, 64); err == nil {
    fmt.Printf("Octal '%s' = %d (decimal)\n", octal, val)
  }

  // Decimal (ฐาน 10)
  decimal := "123"
  if val, err := strconv.ParseInt(decimal, 10, 64); err == nil {
    fmt.Printf("Decimal '%s' = %d\n", decimal, val)
  }

  // Hexadecimal (ฐาน 16)
  hex := "FF"
  if val, err := strconv.ParseInt(hex, 16, 64); err == nil {
    fmt.Printf("Hex '%s' = %d (decimal)\n", hex, val)
  }

  // Auto-detect base (base = 0)
  autoDetect := "0xFF"  // hex prefix
  if val, err := strconv.ParseInt(autoDetect, 0, 64); err == nil {
    fmt.Printf("Auto-detect '%s' = %d\n", autoDetect, val)
  }
}
```

### 📈 Output

```
Binary '1010' = 10 (decimal)
Octal '755' = 493 (decimal)
Decimal '123' = 123
Hex 'FF' = 255 (decimal)
Auto-detect '0xFF' = 255
```

---

## 🔳 3. ParseUint() - แปลง String เป็น Unsigned Integer

### ✅ ตัวอย่างการใช้งาน

```go
package main

import (
  "fmt"
  "strconv"
)

func main() {
  // Unsigned integer parsing
  str := "4294967295"  // Maximum uint32 value
  if val, err := strconv.ParseUint(str, 10, 32); err == nil {
    fmt.Printf("ParseUint('%s', 10, 32) = %d (type: uint32)\n", str, uint32(val))
  }

  // 64-bit unsigned
  bigStr := "18446744073709551615"  // Maximum uint64 value
  if val, err := strconv.ParseUint(bigStr, 10, 64); err == nil {
    fmt.Printf("ParseUint('%s', 10, 64) = %d (type: uint64)\n", bigStr, val)
  }
}
```

---

## ⚡ 4. Atoi() และ Itoa() - Shorthand Functions

### 🔄 Atoi() - ASCII to Integer

```go
package main

import (
  "fmt"
  "strconv"
)

func main() {
  // Atoi เป็น shorthand ของ ParseInt(s, 10, 0)
  str := "42"
  if num, err := strconv.Atoi(str); err == nil {
    fmt.Printf("Atoi('%s') = %d (type: %T)\n", str, num, num)
  }

  // เทียบกับ ParseInt
  if num2, err := strconv.ParseInt(str, 10, 0); err == nil {
    fmt.Printf("ParseInt('%s', 10, 0) = %d (type: %T)\n", str, int(num2), int(num2))
  }
}
```

### 🔄 Itoa() - Integer to ASCII

```go
package main

import (
  "fmt"
  "strconv"
)

func main() {
  num := 42
  str := strconv.Itoa(num)
  fmt.Printf("Itoa(%d) = '%s' (type: %T)\n", num, str, str)

  // การใช้งานกับ negative numbers
  negNum := -123
  negStr := strconv.Itoa(negNum)
  fmt.Printf("Itoa(%d) = '%s'\n", negNum, negStr)
}
```

---

## ⚠️ 5. Error Handling - การจัดการข้อผิดพลาด

### 🚨 ตัวอย่าง Error Cases

```go
package main

import (
  "fmt"
  "strconv"
)

func demonstrateErrors() {
  fmt.Println("=== Error Handling Examples ===")

  // Case 1: Invalid float string
  invalidFloat := "not_a_number"
  if val, err := strconv.ParseFloat(invalidFloat, 64); err != nil {
    fmt.Printf("❌ ParseFloat error: %v\n", err)
    fmt.Printf("   Default value returned: %v\n", val) // จะได้ 0
  }

  // Case 2: Invalid integer string
  invalidInt := "12abc34"
  if val, err := strconv.Atoi(invalidInt); err != nil {
    fmt.Printf("❌ Atoi error: %v\n", err)
    fmt.Printf("   Default value returned: %v\n", val) // จะได้ 0
  }

  // Case 3: Number out of range
  tooLarge := "999999999999999999999999999999999"
  if val, err := strconv.ParseInt(tooLarge, 10, 32); err != nil {
    fmt.Printf("❌ ParseInt error (out of range): %v\n", err)
    fmt.Printf("   Default value returned: %v\n", val) // จะได้ 0
  }
}

func safeParsingExample() {
  fmt.Println("\n=== Safe Parsing Pattern ===")

  input := "123.45"

  if val, err := strconv.ParseFloat(input, 64); err != nil {
    fmt.Printf("❌ Error parsing '%s': %v\n", input, err)
    // Handle error - อาจจะใช้ default value หรือ return error
    val = 0.0 // default value
    fmt.Printf("   Using default value: %.2f\n", val)
  } else {
    fmt.Printf("✅ Successfully parsed '%s' = %.2f\n", input, val)
    // ใช้ค่าที่ parse ได้
  }
}

func main() {
  demonstrateErrors()
  safeParsingExample()
}
```

---

## 🎯 6. Real-World Examples

### 📝 Example 1: User Input Validation

```go
package main

import (
  "fmt"
  "strconv"
)

func validateAndParseAge(input string) (int, error) {
  age, err := strconv.Atoi(input)
  if err != nil {
    return 0, fmt.Errorf("invalid age format: %v", err)
  }

  if age < 0 || age > 150 {
    return 0, fmt.Errorf("age must be between 0 and 150, got: %d", age)
  }

  return age, nil
}

func main() {
  testInputs := []string{"25", "abc", "-5", "200", "30"}

  fmt.Println("=== Age Validation Example ===")
  for _, input := range testInputs {
    if age, err := validateAndParseAge(input); err != nil {
      fmt.Printf("❌ Input '%s': %v\n", input, err)
    } else {
      fmt.Printf("✅ Input '%s': Valid age = %d\n", input, age)
    }
  }
}
```

### 💰 Example 2: Price Calculation

```go
package main

import (
  "fmt"
  "strconv"
)

type Product struct {
  Name  string
  Price string // ราคาเป็น string จาก input
}

func calculateTotal(products []Product) (float64, error) {
  var total float64

  for _, product := range products {
    price, err := strconv.ParseFloat(product.Price, 64)
    if err != nil {
      return 0, fmt.Errorf("invalid price for %s: %v", product.Name, err)
    }
    total += price
  }

  return total, nil
}

func main() {
  products := []Product{
    {"Laptop", "25000.50"},
    {"Mouse", "350.75"},
    {"Keyboard", "1200.00"},
    {"Monitor", "8500.25"},
  }

  fmt.Println("=== Price Calculation Example ===")
  if total, err := calculateTotal(products); err != nil {
    fmt.Printf("❌ Error calculating total: %v\n", err)
  } else {
    fmt.Printf("✅ Total price: ฿%.2f\n", total)
  }
}
```

---

## 🚀 7. Performance Tips และ Best Practices

### ⚡ Performance Comparison

```go
package main

import (
  "fmt"
  "strconv"
  "time"
)

func benchmarkParsing() {
  const iterations = 1000000
  testString := "123456"

  // Benchmark Atoi
  start := time.Now()
  for i := 0; i < iterations; i++ {
    strconv.Atoi(testString)
  }
  atoiTime := time.Since(start)

  // Benchmark ParseInt
  start = time.Now()
  for i := 0; i < iterations; i++ {
    strconv.ParseInt(testString, 10, 0)
  }
  parseIntTime := time.Since(start)

  fmt.Printf("Atoi:     %v\n", atoiTime)
  fmt.Printf("ParseInt: %v\n", parseIntTime)
  fmt.Printf("Atoi is %.2fx faster\n", float64(parseIntTime)/float64(atoiTime))
}
```

### 💡 Best Practices

```go
package main

import (
  "fmt"
  "strconv"
  "strings"
)

// ✅ Good: Always handle errors
func parseFloatSafe(s string) (float64, error) {
  return strconv.ParseFloat(strings.TrimSpace(s), 64)
}

// ❌ Bad: Ignoring errors
func parseFloatUnsafe(s string) float64 {
  val, _ := strconv.ParseFloat(s, 64)
  return val // อันตราย! อาจได้ค่า 0 แม้ input จะผิด
}

// ✅ Good: Validation before parsing
func parsePositiveInt(s string) (int, error) {
  val, err := strconv.Atoi(strings.TrimSpace(s))
  if err != nil {
    return 0, err
  }
  if val < 0 {
    return 0, fmt.Errorf("expected positive integer, got: %d", val)
  }
  return val, nil
}

func main() {
  fmt.Println("=== Best Practices Examples ===")

  // Test safe parsing
  input := "  42.5  "
  if val, err := parseFloatSafe(input); err != nil {
    fmt.Printf("❌ Error: %v\n", err)
  } else {
    fmt.Printf("✅ Parsed: %.1f\n", val)
  }

  // Test positive int validation
  if val, err := parsePositiveInt("123"); err != nil {
    fmt.Printf("❌ Error: %v\n", err)
  } else {
    fmt.Printf("✅ Valid positive int: %d\n", val)
  }
}
```

---

## 📚 8. Go Version Updates และการปรับปรุง

### 🆕 Changes และ Improvements

#### Go 1.19+ Improvements:

- ปรับปรุง performance ของ `strconv` package
- Better error messages
- Enhanced support for edge cases

#### Go 1.20+ Features:

- Improved memory allocation
- Better handling of large numbers

### 📊 Version Compatibility Table

| Go Version | strconv Features         | Notes                   |
| ---------- | ------------------------ | ----------------------- |
| 1.18       | Standard functions       | Stable baseline         |
| 1.19       | Performance improvements | ~15% faster parsing     |
| 1.20+      | Memory optimizations     | Reduced allocations     |
| 1.21+      | Enhanced error handling  | More descriptive errors |

---

## 🎓 สรุป

### 📝 Key Takeaways

1. **`ParseFloat()`** - สำหรับแปลง string เป็น floating-point numbers
2. **`ParseInt()`** - สำหรับแปลง string เป็น signed integers พร้อมระบุฐาน
3. **`ParseUint()`** - สำหรับแปลง string เป็น unsigned integers
4. **`Atoi()`** - shorthand สำหรับแปลง decimal string เป็น int
5. **`Itoa()`** - แปลง int เป็น string
6. **Error Handling** - สำคัญมาก! ต้องตรวจสอบเสมอ

### 🎯 Next Steps

- ศึกษาเพิ่มเติมเกี่ยวกับ `fmt` package สำหรับ string formatting
- เรียนรู้ `regexp` package สำหรับ string validation ที่ซับซ้อน
- ลองใช้ `encoding/json` สำหรับการ parse ข้อมูล JSON

### 🔗 Resources

- [Official Go strconv documentation](https://pkg.go.dev/strconv)
- [Go by Example - Number Parsing](https://gobyexample.com/number-parsing)
- [Effective Go](https://golang.org/doc/effective_go.html)

---

> 💡 **Pro Tip**: เสมอจำไว้ว่า "Handle errors, don't ignore them!" - การจัดการ error ที่ดีจะทำให้โปรแกรมของเรามีความมั่นคงและน่าเชื่อถือมากขึ้น
