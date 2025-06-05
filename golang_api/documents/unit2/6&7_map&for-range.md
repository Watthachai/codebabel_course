# Go Maps และ For-Range Loop 🗺️

## เนื้อหาที่ครอบคลุม

- การสร้างและใช้งาน Maps ในภาษา Go
- For-Range Loop สำหรับ Arrays, Slices และ Maps
- Best Practices และ Modern Go Syntax

---

## 📚 Maps ใน Go

### Maps คืออะไร?

Maps เป็นโครงสร้างข้อมูลแบบ key-value pairs ที่ช่วยให้เราสามารถจัดเก็บข้อมูลและเข้าถึงผ่าน key ได้โดยตรง แทนที่จะใช้ index เป็นตัวเลขเหมือน arrays/slices

**ข้อดีของ Maps:**

- 🔍 การค้นหาข้อมูลรวดเร็ว (O(1) average case)
- 🎯 เข้าถึงข้อมูลผ่าน key ที่มีความหมาย
- 📦 จัดเก็บข้อมูลแบบไม่เรียงลำดับ

### การสร้าง Maps

#### วิธีที่ 1: Map Literal (แนะนำ ✨)

```go
// Modern Go syntax - ใช้วิธีนี้เป็นหลัก
credits := map[string]int{
  "Java":       3,
  "C++":        3,
  "Python":     4,
  "JavaScript": 2, // trailing comma ทำให้เพิ่มข้อมูลง่าย
}

// One-liner (เหมาะสำหรับข้อมูลน้อย)
grades := map[string]string{"Alice": "A", "Bob": "B+"}
```

#### วิธีที่ 2: ใช้ make() function

```go
// สร้าง empty map
credits := make(map[string]int)

// เพิ่มข้อมูลทีละรายการ
credits["Java"] = 3
credits["C++"] = 3
credits["Python"] = 4

// Modern Go - สามารถกำหนด capacity เริ่มต้นได้
largeMap := make(map[string]int, 100) // hint สำหรับ performance
```

### การเข้าถึงข้อมูลใน Maps

#### การอ่านค่า - Value และ OK Pattern

```go
credits := map[string]int{
  "Java":   3,
  "Python": 4,
}

// วิธีเดิม - อาจได้ zero value หาก key ไม่มี
javaCredit := credits["Java"] // ได้ 3
csharpCredit := credits["C#"] // ได้ 0 (zero value ของ int)

// ✨ Modern Go - OK Pattern (แนะนำ)
if credit, exists := credits["Java"]; exists {
  fmt.Printf("Java มี %d หน่วยกิต\n", credit)
} else {
  fmt.Println("ไม่พบวิชา Java")
}

// การตรวจสอบ key ที่ไม่มี
if _, exists := credits["C#"]; !exists {
  fmt.Println("ไม่มีวิชา C# ในระบบ")
}
```

### การจัดการข้อมูลใน Maps

#### การเพิ่ม/แก้ไขข้อมูล

```go
credits := make(map[string]int)

// เพิ่มข้อมูลใหม่
credits["Go"] = 3
credits["Rust"] = 4

// แก้ไขข้อมูลเดิม
credits["Go"] = 4 // เปลี่ยนจาก 3 เป็น 4
```

#### การลบข้อมูล

```go
// ลบข้อมูล
delete(credits, "Python")

// ตรวจสอบการลบ
if _, exists := credits["Python"]; !exists {
  fmt.Println("ลบ Python สำเร็จ")
}

// ⚠️ หมายเหตุ: delete() กับ key ที่ไม่มีจะไม่เกิด error
delete(credits, "NonExistentKey") // ปลอดภัย
```

### 🆕 Modern Go Features สำหรับ Maps

#### Generic Maps (Go 1.18+)

```go
// สร้าง generic function สำหรับ maps
func GetKeys[K comparable, V any](m map[K]V) []K {
  keys := make([]K, 0, len(m))
  for k := range m {
    keys = append(keys, k)
  }
  return keys
}

// ใช้งาน
credits := map[string]int{"Go": 3, "Rust": 4}
keys := GetKeys(credits) // []string{"Go", "Rust"}
```

#### Clear Function (Go 1.21+)

```go
credits := map[string]int{
  "Java":   3,
  "Python": 4,
}

// ✨ ใหม่ใน Go 1.21
clear(credits) // ลบข้อมูลทั้งหมดแต่เก็บ map structure
fmt.Println(len(credits)) // 0
```

---

## 🔄 For-Range Loop

### For-Range กับ Slices/Arrays

#### Syntax พื้นฐาน

```go
languages := []string{"Java", "C++", "Python"}

// วิธีที่ 1: ได้ทั้ง index และ value
for index, value := range languages {
  fmt.Printf("Index: %d, Value: %s\n", index, value)
}

// วิธีที่ 2: ได้เฉพาะ value (แนะนำถ้าไม่ใช้ index)
for _, value := range languages {
  fmt.Printf("Language: %s\n", value)
}

// วิธีที่ 3: ได้เฉพาะ index
for index := range languages {
  fmt.Printf("Index: %d\n", index)
}
```

#### ตัวอย่าง Output

```
Index: 0, Value: Java
Index: 1, Value: C++
Index: 2, Value: Python
```

### For-Range กับ Maps

#### Syntax และการใช้งาน

```go
credits := map[string]int{
  "Java":   3,
  "C++":    3,
  "Python": 4,
}

// วนลูปรอบ Map
for subject, credit := range credits {
  fmt.Printf("วิชา: %s, หน่วยกิต: %d\n", subject, credit)
}

// ได้เฉพาะ keys
for subject := range credits {
  fmt.Printf("วิชา: %s\n", subject)
}

// ได้เฉพาะ values (ใช้ blank identifier)
for _, credit := range credits {
  fmt.Printf("หน่วยกิต: %d\n", credit)
}
```

### 🎯 Best Practices และ Modern Patterns

#### 1. ใช้ meaningful variable names

```go
// ❌ ไม่ดี
for k, v := range credits {
  fmt.Printf("%s: %d\n", k, v)
}

// ✅ ดี
for subject, creditHours := range credits {
  fmt.Printf("%s: %d หน่วยกิต\n", subject, creditHours)
}
```

#### 2. เช็ค nil maps

```go
var credits map[string]int

// ⚠️ panic! ถ้า map เป็น nil
// credits["Go"] = 3

// ✅ วิธีที่ปลอดภัย
if credits == nil {
  credits = make(map[string]int)
}
credits["Go"] = 3
```

#### 3. การ copy maps

```go
// ❌ การ copy แบบผิด (shallow copy)
original := map[string]int{"Go": 3}
copied := original // ชี้ map เดียวกัน!

// ✅ การ copy แบบถูกต้อง
func CopyMap[K comparable, V any](original map[K]V) map[K]V {
  copied := make(map[K]V, len(original))
  for key, value := range original {
    copied[key] = value
  }
  return copied
}
```

### 🔍 Advanced Examples

#### การจัดกลุ่มข้อมูล

```go
students := []string{"Alice", "Bob", "Charlie", "Diana"}
grades := map[string][]int{
  "Alice":   {85, 90, 88},
  "Bob":     {78, 82, 80},
  "Charlie": {92, 89, 94},
  "Diana":   {76, 84, 79},
}

// คำนวณเกรดเฉลี่ย
for name, scores := range grades {
  total := 0
  for _, score := range scores {
    total += score
  }
  average := float64(total) / float64(len(scores))
  fmt.Printf("%s: เฉลี่ย %.2f\n", name, average)
}
```

#### การสร้าง frequency counter

```go
text := "hello world"
frequency := make(map[rune]int)

for _, char := range text {
  if char != ' ' { // ข้าม space
    frequency[char]++
  }
}

// แสดงผล
for char, count := range frequency {
  fmt.Printf("'%c': %d ครั้ง\n", char, count)
}
```

---

## 📊 Performance Tips

### 1. การใช้ capacity hint

```go
// ถ้ารู้ขนาดโดยประมาณ
bigMap := make(map[string]int, 1000) // hint สำหรับ performance
```

### 2. การเช็ค existence ก่อน delete

```go
// ไม่จำเป็น - delete() handle ได้เอง
if _, exists := credits["Python"]; exists {
  delete(credits, "Python") // redundant check
}

// เพียงพอแล้ว
delete(credits, "Python") // ปลอดภัยและเร็วกว่า
```

---

## 🆕 สิ่งที่ได้รับการปรับปรุง

### จากเนื้อหาเดิม → เวอร์ชันใหม่:

1. **เพิ่ม Modern Go Syntax** (Go 1.18+ features)

   - Generic functions
   - Clear function (Go 1.21+)
   - Better error handling patterns

2. **ปรับปรุง Code Examples**

   - ใช้ meaningful variable names
   - เพิ่ม best practices
   - แสดง anti-patterns ที่ควรหลีกเลี่ยง

3. **เพิ่มเนื้อหาเชิงลึก**

   - Performance considerations
   - Memory management
   - Advanced use cases

4. **การจัดรูปแบบ**

   - ใช้ emoji เพื่อความชัดเจน
   - แบ่งหัวข้อย่อยชัดเจน
   - เพิ่ม syntax highlighting

5. **ตัวอย่างใหม่**
   - Real-world use cases
   - Error handling patterns
   - Modern Go idioms

**เวอร์ชัน Go ที่รองรับ:** Go 1.18+ (แนะนำ Go 1.21+ สำหรับ features ใหม่)
