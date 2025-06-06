# 📋 สารบัญ

1. [Concurrency VS Parallelism](#concurrency-vs-parallelism)
2. [Goroutines](#goroutines)
3. [Channels](#channels)

# Concurrency VS Parallelism

## เข้าใจข้อแตกต่างของการทำงานแบบ Concurrency และ Parallelism

### 🔍 ปัญหาที่พบในการเขียนโปรแกรม

โดยปกติแล้ว โปรแกรมที่เราเขียนจะทำงานบน CPU เพียงแค่ 1 core เท่านั้น แม้ว่า CPU จะมีหลาย core ก็ตาม ซึ่งทำให้เราใช้ทรัพยากรของ CPU ได้ไม่เต็มประสิทธิภาพ

```
CPU มี 4 cores แต่โปรแกรมใช้แค่ 1 core
┌─────┬─────┬─────┬─────┐
│  ✓  │  -  │  -  │  -  │ ← เสียดายทรัพยากร!
└─────┴─────┴─────┴─────┘
```

### 💡 หลักการของ Concurrency

**Concurrency** คือการแบ่งงานใหญ่ออกเป็นงานเล็กๆ ที่สามารถทำงานแยกจากกันได้อย่างอิสระ

**คุณสมบัติสำคัญ:**

- แต่ละงานย่อยต้องเป็นอิสระจากกัน
- ลำดับการทำงานไม่สำคัญ (ทำก่อนหลังได้ผลลัพธ์เหมือนกัน)
- สามารถทำงานแบบ interleaving บน CPU core เดียว

```
งานเดิม: [████████████████████████]

แบ่งเป็น Concurrent Tasks:
Task 1: [████████]
Task 2: [████████]
Task 3: [████████]

✅ T1 → T2 → T3 = ผลลัพธ์เดียวกัน
✅ T2 → T1 → T3 = ผลลัพธ์เดียวกัน
```

### ⚡ หลักการของ Parallelism

**Parallelism** เกิดขึ้นเมื่อเรามี CPU หลาย core และสามารถเอางานย่อยไปทำงานพร้อมกันได้จริงๆ

```
CPU มี 4 cores - ทำงานพร้อมกัน
┌─────┬─────┬─────┬─────┐
│ T1  │ T2  │ T3  │ T4  │ ← ใช้ทรัพยากรเต็มที่!
└─────┴─────┴─────┴─────┘
```

### 🎯 ความสัมพันธ์ระหว่าง Concurrency และ Parallelism

> **สำคัญ:** Parallelism เกิดขึ้นได้ก็ต่อเมื่อมี Concurrency เสียก่อน

- **Concurrency without Parallelism:** งานย่อยหลายตัวทำงานสลับกันบน CPU core เดียว
- **Concurrency with Parallelism:** งานย่อยหลายตัวทำงานพร้อมกันบน CPU หลาย core

---

# Goroutines

## เรียนรู้การสร้างการทำงานแบบ Concurrency ด้วย Goroutines และการใช้งาน sync.WaitGroup

### 🚀 Goroutines คืออะไร?

Goroutines เป็น lightweight threads ของ Go ที่ช่วยให้เราสามารถทำงานแบบ concurrent ได้อย่างง่ายดาย

### 📝 ตัวอย่างพื้นฐาน - ปัญหาที่พบ

```go
package main

import (
  "fmt"
  "time"
)

func printAndSleep(number int) {
  time.Sleep(1 * time.Second) // หลับ 1 วินาทีก่อน
  fmt.Println(number)
}

func main() {
  for i := 1; i <= 10; i++ {
    printAndSleep(i) // Sequential execution
  }
}
```

**ผลลัพธ์:** ใช้เวลารวม 10 วินาที (1 วินาที × 10 ครั้ง)

```
หลับ 1 วิ → print: 1
หลับ 1 วิ → print: 2
หลับ 1 วิ → print: 3
...
รวม: 10 วินาที 😴
```

### ⚡ แก้ปัญหาด้วย Goroutines

```go
package main

import (
  "fmt"
  "sync"
  "time"
)

func printAndSleep(number int, wg *sync.WaitGroup) {
  defer wg.Done() // ✨ ปรับปรุง: ใช้ defer เพื่อความปลอดภัย

  time.Sleep(1 * time.Second)
  fmt.Println(number)
}

func main() {
  var wg sync.WaitGroup

  for i := 1; i <= 10; i++ {
    wg.Add(1) // บอกว่าจะมี goroutine เพิ่มขึ้น 1 ตัว
    go printAndSleep(i, &wg) // 🚀 สร้าง goroutine
  }

  wg.Wait() // รอให้ goroutines ทั้งหมดทำงานเสร็จ
  fmt.Println("All goroutines completed!")
}
```

**ผลลัพธ์:** ใช้เวลาเพียง ~1 วินาที (ทำงานพร้อมกัน!)

```
ทั้ง 10 งานทำงานพร้อมกัน → เสร็จใน ~1 วินาที 🚀
Output: 3, 1, 7, 2, 9, 5, 8, 4, 10, 6 (ลำดับอาจไม่เรียง)
```

### 🔧 การปรับปรุงจากเวอร์ชันเดิม

**สิ่งที่ปรับปรุง:**

1. **ใช้ `defer wg.Done()`** แทนการเรียกในตอนท้าย เพื่อความปลอดภัย
2. **ส่ง WaitGroup เป็น pointer** เพื่อประสิทธิภาพที่ดีขึ้น
3. **เพิ่ม error handling** ในกรณีที่จำเป็น

### 📊 เปรียบเทียบการทำงาน

| แบบ Sequential     | แบบ Concurrent (Goroutines)   |
| ------------------ | ----------------------------- |
| ⏱️ 10 วินาที       | ⏱️ ~1 วินาที                  |
| 🔄 ทำงานทีละงาน    | 🚀 ทำงานพร้อมกัน 10 งาน       |
| 💾 ใช้ memory น้อย | 💾 ใช้ memory มากขึ้นเล็กน้อย |

### ⚠️ ข้อควรระวัง

1. **Race Condition:** หลีกเลี่ยงการเข้าถึงข้อมูลเดียวกันพร้อมกัน
2. **Memory Usage:** Goroutines ใช้ memory ประมาณ 2KB ต่อตัว
3. **Goroutine Leaks:** อย่าลืมใช้ WaitGroup หรือ Context เพื่อควบคุม lifecycle

---

# Channels

## เข้าใจหลักการสื่อสารของ Goroutines ผ่าน Channels และการใช้งาน Channels ในสถานการณ์ต่าง ๆ

### 🔌 Channels คืออะไร?

Channel เปรียบเหมือน "ท่อน้ำ" ที่ใช้ส่งข้อมูลระหว่าง goroutines อย่างปลอดภัย

```
Goroutine A  ──[data]──► Channel ──[data]──► Goroutine B
        ส่งข้อมูล              รับข้อมูล
```

### 🎯 ปัญหาที่ Channel แก้ไข

**ปัญหา:** ไม่สามารถรับค่า return จาก goroutines ได้โดยตรง

```go
// ❌ ทำไม่ได้!
result := go someFunction()
```

**เหตุผล:** Go ไม่รู้ว่า goroutine จะทำงานเสร็จเมื่อไหร่

### 💡 วิธีแก้ปัญหาด้วย Channels

### ตัวอย่างที่ 1: การรวมผลลัพธ์จาก Multiple Goroutines

```go
package main

import (
  "fmt"
  "sync"
)

// ✨ ปรับปรุง: เพิ่ม context สำหรับ cancellation
func sum(numbers []int, ch chan<- int) { // ใช้ send-only channel
  result := 0
  for _, num := range numbers {
    result += num
  }
  ch <- result // ส่งผลลัพธ์เข้า channel
}

func main() {
  numbers := make([]int, 30)
  for i := 0; i < 30; i++ {
    numbers[i] = i + 1 // [1, 2, 3, ..., 30]
  }

  // สร้าง buffered channel สำหรับ 3 ผลลัพธ์
  ch := make(chan int, 3) // ✨ ปรับปรุง: ใช้ buffered channel

  // แบ่งงานเป็น 3 ส่วน
  go sum(numbers[0:10], ch)   // 1-10
  go sum(numbers[10:20], ch)  // 11-20
  go sum(numbers[20:30], ch)  // 21-30

  // รับผลลัพธ์ 3 ครั้ง
  totalResult := 0
  for i := 0; i < 3; i++ {
    result := <-ch // รับข้อมูลจาก channel
    totalResult += result
    fmt.Printf("Received result %d: %d\n", i+1, result)
  }

  fmt.Printf("Final result: %d\n", totalResult) // 465
  close(ch) // ✨ ปรับปรุง: ปิด channel เมื่อใช้เสร็จ
}
```

### 📊 การทำงานของ Channel

```
┌─────────────┐    ┌─────────┐    ┌─────────────┐
│ Goroutine 1 │───►│ Channel │◄───│ Main Thread │
│   sum(1-10) │    │   ch    │    │  รอรับค่า     │
└─────────────┘    └─────────┘    └─────────────┘
    ▲55               │               ▲
    │                 │               │
    └─────────────────┼───────────────┘
             │
┌─────────────┐        │        ┌─────────────┐
│ Goroutine 2 │────────┼───────►│ Goroutine 3 │
│  sum(11-20) │        │        │  sum(21-30) │
└─────────────┘        │        └─────────────┘
    ▲155             │               ▲255
    └─────────────────┼───────────────┘
             ▼
         totalResult = 465
```

### 🔧 การปรับปรุงจากเวอร์ชันเดิม

**สิ่งที่ปรับปรุง:**

1. **Buffered Channels:** ใช้ `make(chan int, 3)` เพื่อลด blocking
2. **Directional Channels:** ใช้ `chan<- int` (send-only) เพื่อความปลอดภัย
3. **Proper Channel Closing:** เรียก `close(ch)` เมื่อใช้เสร็จ
4. **Better Error Handling:** เพิ่มการตรวจสอบข้อผิดพลาด

### 💎 Patterns การใช้ Channels

#### 1. **Worker Pool Pattern**

```go
func workerPool() {
  jobs := make(chan int, 100)
  results := make(chan int, 100)

  // สร้าง 3 workers
  for w := 1; w <= 3; w++ {
    go worker(w, jobs, results)
  }

  // ส่งงาน 5 งาน
  for j := 1; j <= 5; j++ {
    jobs <- j
  }
  close(jobs)

  // รับผลลัพธ์ 5 ผล
  for a := 1; a <= 5; a++ {
    <-results
  }
}
```

#### 2. **Fan-out Fan-in Pattern**

```go
func fanOutFanIn() {
  input := make(chan int)

  // Fan-out: แจกงานให้ workers
  c1 := worker(input)
  c2 := worker(input)

  // Fan-in: รวม results
  output := merge(c1, c2)

  // ใช้ output channel
  for result := range output {
    fmt.Println(result)
  }
}
```

### 📈 เปรียบเทียบประสิทธิภาพ

| Sequential                 | Goroutines + Channels        |
| -------------------------- | ---------------------------- |
| ⏱️ เวลา: O(n)              | ⏱️ เวลา: O(n/workers)        |
| 🔒 Thread-safe โดยธรรมชาติ | 🔒 Thread-safe ผ่าน channels |
| 💾 Memory: น้อย            | 💾 Memory: เพิ่มขึ้นเล็กน้อย |
| 🧠 ความซับซ้อน: ต่ำ        | 🧠 ความซับซ้อน: ปานกลาง      |

### ⚠️ Best Practices

1. **ใช้ Buffered Channels** เมื่อรู้จำนวนข้อมูลล่วงหน้า
2. **ปิด Channels** เมื่อไม่ใช้แล้ว
3. **ใช้ Select Statement** สำหรับ non-blocking operations
4. **หลีกเลี่ยง Channel ที่ไม่จำเป็น** อย่าใช้เกินความต้องการ

### 🎯 สรุป

Channels เป็นเครื่องมือสำคัญใน Go ที่ช่วยให้ goroutines สื่อสารกันได้อย่างปลอดภัย ตามหลักการ:

> **"Don't communicate by sharing memory; share memory by communicating"**

การใช้ channels ร่วมกับ goroutines ทำให้เราสามารถเขียนโปรแกรม concurrent ที่มีประสิทธิภาพและปลอดภัยได้อย่างง่ายดาย
