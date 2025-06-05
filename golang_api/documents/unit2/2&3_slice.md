# Unit 2 & 3: Go Slices - คู่มือฉบับสมบูรณ์ 🚀

## 📋 สารบัญ

- [Slice คืออะไร?](#slice-คืออะไร)
- [การสร้าง Slice จาก Array](#การสร้าง-slice-จาก-array)
- [การแชร์ข้อมูลระหว่าง Array และ Slice](#การแชร์ข้อมูลระหว่าง-array-และ-slice)
- [การสร้าง Slice โดยตรง](#การสร้าง-slice-โดยตรง)
- [การจัดการข้อมูลใน Slice](#การจัดการข้อมูลใน-slice)
- [Length vs Capacity](#length-vs-capacity)
- [การเพิ่มและลบข้อมูล](#การเพิ่มและลบข้อมูล)
- [Best Practices](#best-practices)

---

## 🎯 Slice คืออะไร?

**Slice** เป็นโครงสร้างข้อมูลที่ยืดหยุ่นกว่า Array ใน Go โดยมีความสามารถในการปรับขนาดได้ตามต้องการ

### ความแตกต่างระหว่าง Array และ Slice

| Array                   | Slice                       |
| ----------------------- | --------------------------- |
| ขนาดคงที่ `[5]int`      | ขนาดยืดหยุ่น `[]int`        |
| ไม่สามารถเพิ่มข้อมูลได้ | สามารถเพิ่มข้อมูลได้        |
| เก็บข้อมูลจริง          | เก็บ pointer ชี้ไปยัง Array |

---

## 🔧 การสร้าง Slice จาก Array

### ตัวอย่างพื้นฐาน

```go
// สร้าง Array ต้นฉบับ
arr := [5]string{"A", "B", "C", "D", "E"}

// สร้าง Slice จาก Array (ดึงตำแหน่ง 0-2)
result := arr[0:3]  // ได้ ["A", "B", "C"]

fmt.Printf("Type of arr: %T\n", arr)     // [5]string
fmt.Printf("Type of result: %T\n", result) // []string
```

### 🎨 Visualization: Slice Structure

```
Array:     [A] [B] [C] [D] [E]
Index:      0   1   2   3   4

Slice (arr[0:3]):
┌─────────────┐
│ Pointer  ───┼──► [A] [B] [C] [D] [E]
│ Length: 3   │     ↑
│ Capacity: 5 │     เริ่มต้นที่ index 0
└─────────────┘
```

### รูปแบบการสร้าง Slice

```go
arr := [5]string{"A", "B", "C", "D", "E"}

// วิธีต่างๆ ในการสร้าง Slice
slice1 := arr[:]      // ทั้งหมด: ["A", "B", "C", "D", "E"]
slice2 := arr[0:5]    // เหมือนกับข้างบน
slice3 := arr[:3]     // 3 ตัวแรก: ["A", "B", "C"]
slice4 := arr[2:]     // จาก index 2 ถึงจบ: ["C", "D", "E"]
slice5 := arr[1:4]    // จาก index 1-3: ["B", "C", "D"]
```

---

## 🔗 การแชร์ข้อมูลระหว่าง Array และ Slice

### ⚠️ สิ่งสำคัญที่ต้องจำ: Slice แชร์ข้อมูลกับ Array ต้นฉบับ!

```go
arr := [5]string{"A", "B", "C", "D", "E"}
result := arr[0:3]  // ["A", "B", "C"]

// เปลี่ยนค่าใน Slice
result[0] = "Z"

fmt.Println("Array:", arr)     // [Z B C D E] - เปลี่ยนด้วย!
fmt.Println("Slice:", result)  // [Z B C]
```

### 📊 Visualization: Data Sharing

```
Before:
Array:  [A] [B] [C] [D] [E]
Slice:  [A] [B] [C] ────┘ (ชี้ไปที่ Array เดียวกัน)

After result[0] = "Z":
Array:  [Z] [B] [C] [D] [E]
Slice:  [Z] [B] [C] ────┘ (เปลี่ยนพร้อมกัน)
```

### ตัวอย่างการเปลี่ยนแปลงจาก Array

```go
arr := [5]string{"X", "B", "C", "D", "E"}
result := arr[2:4]  // ["C", "D"]

// เปลี่ยนค่าใน Array
arr[2] = "M"

fmt.Println("Array:", arr)     // [X B M D E]
fmt.Println("Slice:", result)  // [M D] - เปลี่ยนตาม!
```

---

## 🆕 การสร้าง Slice โดยตรง

### วิธีการสร้าง Slice ใหม่

```go
// สร้าง Slice โดยตรง
s := []string{"Hello", "World", "Go", "Programming"}

fmt.Printf("Type: %T\n", s)        // []string
fmt.Printf("Length: %d\n", len(s)) // 4
fmt.Printf("Capacity: %d\n", cap(s)) // 4
```

### 🏗️ สิ่งที่เกิดขึ้นเบื้องหลัง

```
เมื่อสร้าง s := []string{"A", "B", "C"}

Go จะ:
1. สร้าง Array [3]string{"A", "B", "C"} เบื้องหลัง
2. สร้าง Slice ที่ชี้ไปยัง Array นั้น

Slice Structure:
┌─────────────────┐
│ Pointer     ────┼──► [A] [B] [C]
│ Length: 3       │
│ Capacity: 3     │
└─────────────────┘
```

---

## 📈 Length vs Capacity

### ความหมายของ Length และ Capacity

```go
arr := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
slice := arr[2:6]  // [3, 4, 5, 6]

fmt.Printf("Length: %d\n", len(slice))  // 4 (จำนวนข้อมูลจริง)
fmt.Printf("Capacity: %d\n", cap(slice)) // 8 (พื้นที่ที่ใช้ได้จาก index 2 ถึงจบ)
```

### 📐 Visualization: Length vs Capacity

```
Array:    [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
Index:     0   1   2   3   4   5   6   7   8    9

Slice (arr[2:6]):
        ↓   ↓   ↓   ↓
        [3] [4] [5] [6]
        ├─────────────┤  Length = 4
        ├─────────────────────────────┤  Capacity = 8
```

**Length**: จำนวนข้อมูลที่มีอยู่ใน Slice จริงๆ
**Capacity**: พื้นที่สูงสุดที่ Slice สามารถขยายได้โดยไม่ต้องสร้าง Array ใหม่

---

## ➕ การเพิ่มและลบข้อมูล

### การเพิ่มข้อมูลด้วย `append`

```go
s := []string{"A", "B", "C", "D", "E"}
fmt.Printf("Before: len=%d, cap=%d\n", len(s), cap(s)) // len=5, cap=5

// เพิ่มข้อมูล
s2 := append(s, "F")
fmt.Printf("After: len=%d, cap=%d\n", len(s2), cap(s2)) // len=6, cap=10
```

### 🔄 การทำงานของ `append`

```
Before append:
Array:  [A] [B] [C] [D] [E]  (เต็ม - capacity = 5)
Slice:  [A] [B] [C] [D] [E]  ────┘

เมื่อ append("F"):
1. Array เดิมเต็มแล้ว ไม่สามารถใส่เพิ่มได้
2. Go สร้าง Array ใหม่ที่ใหญ่กว่า (มักจะ 2 เท่า)
3. Copy ข้อมูลเดิมไปยัง Array ใหม่
4. เพิ่ม "F" ลงใน Array ใหม่

After append:
New Array: [A] [B] [C] [D] [E] [F] [ ] [ ] [ ] [ ]  (capacity = 10)
New Slice: [A] [B] [C] [D] [E] [F] ────────────────┘  (length = 6)
```

### การลบข้อมูล

```go
words := []string{"Hello", "Bye", "Thailand", "Japan"}

// ลบ "Bye" (index 1)
removeIndex := 1
words = append(words[:removeIndex], words[removeIndex+1:]...)

fmt.Println(words) // [Hello Thailand Japan]
```

### 🎯 Visualization: การลบข้อมูล

```
Original: [Hello] [Bye] [Thailand] [Japan]
       ↓       ↓      ↓         ↓
Index:     0       1      2         3

ลบ index 1:
Step 1: words[:1] → [Hello]
Step 2: words[2:] → [Thailand, Japan]
Step 3: append([Hello], [Thailand, Japan]...) → [Hello, Thailand, Japan]
```

---

## 🛠️ การจัดการข้อมูลใน Slice

### การเข้าถึงข้อมูล

```go
words := []string{"Hello", "World", "Go"}

// เข้าถึงโดย index
fmt.Println(words[0])  // Hello
fmt.Println(words[1])  // World

// การวนลูป
for i, word := range words {
  fmt.Printf("Index %d: %s\n", i, word)
}
```

### การเพิ่มข้อมูลหลายตัว

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5, 6}

// เพิ่มทีละตัว
result := append(slice1, 4, 5, 6)

// เพิ่มจาก slice อื่น
result2 := append(slice1, slice2...)  // ... เพื่อกระจายค่า

fmt.Println(result)   // [1 2 3 4 5 6]
fmt.Println(result2)  // [1 2 3 4 5 6]
```

---

## ✨ สิ่งที่ปรับปรุงจากเวอร์ชันเดิม

### 🔄 การปรับปรุงใน Go เวอร์ชันใหม่ (Go 1.21+)

1. **Performance Improvements**: การจัดการ memory ของ slice มีประสิทธิภาพมากขึ้น
2. **Better Error Messages**: ข้อความ error ที่ชัดเจนขึ้นเมื่อเกิด slice bounds out of range
3. **Slice Operations**: รองรับการ operations ที่ซับซ้อนมากขึ้น

### 📦 ฟังก์ชันใหม่ที่เป็นประโยชน์

```go
// Go 1.21+ - slices package
import "slices"

s := []int{3, 1, 4, 1, 5}

// เรียงลำดับ
slices.Sort(s)
fmt.Println(s) // [1 1 3 4 5]

// หาค่า
index := slices.Index(s, 4)  // หา index ของ 4

// เปรียบเทียบ
equal := slices.Equal(s1, s2)

// Clone
copy := slices.Clone(s)
```

---

## 🎯 Best Practices

### ✅ ควรทำ

```go
// 1. ใช้ make() เมื่อรู้ขนาดล่วงหน้า
s := make([]int, 0, 100)  // length=0, capacity=100

// 2. ใช้ ... เมื่อ append slice
result := append(slice1, slice2...)

// 3. ตรวจสอบ bounds ก่อนเข้าถึง
if index < len(slice) {
  value := slice[index]
}
```

### ❌ ไม่ควรทำ

```go
// 1. อย่าลืมว่า slice แชร์ข้อมูลกับ array ต้นฉบับ
arr := [3]int{1, 2, 3}
s := arr[:]
s[0] = 999  // arr[0] จะเป็น 999 ด้วย!

// 2. อย่าใช้ slice หลังจาก re-slice ที่อาจจะ overlap
s1 := arr[:]
s2 := arr[1:]
s1[1] = 100  // ส่งผลต่อ s2[0] ด้วย!
```

---

## 🚀 สรุป

Slice เป็นเครื่องมือที่ทรงพลังใน Go ที่ให้ความยืดหยุ่นในการจัดการข้อมูล:

- **Dynamic Sizing**: ขนาดปรับได้ตามต้องการ
- **Memory Efficient**: แชร์ข้อมูลกับ array ต้นฉบับ
- **Rich Operations**: มี built-in functions มากมาย
- **Performance**: รวดเร็วและประหยัด memory

การเข้าใจ slice เป็นพื้นฐานสำคัญในการเขียน Go ที่มีประสิทธิภาพ! 💪

---

## 📚 แหล่งข้อมูลเพิ่มเติม

- [Go Documentation - Slices](https://go.dev/tour/moretypes/7)
- [Go Blog - Slices](https://go.dev/blog/slices-intro)
- [Effective Go - Slices](https://go.dev/doc/effective_go#slices)
