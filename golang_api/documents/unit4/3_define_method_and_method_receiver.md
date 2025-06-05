# การนิยาม Methods และ Method Receiver ใน Go

> 📚 **คู่มือการเรียนรู้**: การสร้างและใช้งาน Methods ในภาษา Go พร้อมความเข้าใจเรื่อง Method Receiver แบบ Value และ Pointer

## 🎯 Overview

ในบทเรียนนี้เราจะมาเรียนรู้การสร้าง Methods และการผูกความสัมพันธ์กับ struct ผ่าน Method Receiver ทั้งชนิด **Value Receiver** และ **Pointer Receiver** พร้อมตัวอย่างที่เข้าใจง่าย

## 📖 สารบัญ

- [โครงสร้างข้อมูลเริ่มต้น](#โครงสร้างข้อมูลเริ่มต้น)
- [การสร้าง Method แรก](#การสร้าง-method-แรก)
- [Value Receiver vs Pointer Receiver](#value-receiver-vs-pointer-receiver)
- [ตัวอย่างการใช้งานจริง](#ตัวอย่างการใช้งานจริง)
- [Best Practices](#best-practices)

## 🏗️ โครงสร้างข้อมูลเริ่มต้น

เริ่มต้นด้วยการสร้าง struct สำหรับจัดเก็บข้อมูลนักเรียน:

```go
package main

import "fmt"

// Enrollment แทนการลงทะเบียนเรียนของนักเรียน
type Enrollment struct {
  Semester string   // ภาคการศึกษา เช่น "1/63"
  Courses  []string // รายการวิชาที่ลงทะเบียน
}
```

### 🔧 การสร้างตัวอย่างข้อมูล

```go
func main() {
  // สร้างข้อมูลการลงทะเบียนตัวอย่าง
  enrollment := Enrollment{
    Semester: "1/63",
    Courses:  []string{"Java", "C#"},
  }

  fmt.Printf("ภาคการศึกษา: %s\n", enrollment.Semester)
  fmt.Printf("วิชาที่ลงทะเบียน: %v\n", enrollment.Courses)
}
```

## 🛠️ การสร้าง Method แรก

### Value Receiver Method

```go
// CourseAt - ดึงชื่อวิชาจาก index ที่ระบุ
func (e Enrollment) CourseAt(index int) string {
  if index < 0 || index >= len(e.Courses) {
    return "ไม่พบวิชานี้"
  }
  return e.Courses[index]
}
```

### 📝 วิธีการใช้งาน

```go
func main() {
  enrollment := Enrollment{
    Semester: "1/63",
    Courses:  []string{"Java", "C#"},
  }

  // เรียกใช้ method
  firstCourse := enrollment.CourseAt(0)
  fmt.Printf("วิชาแรก: %s\n", firstCourse) // ผลลัพธ์: วิชาแรก: Java

  secondCourse := enrollment.CourseAt(1)
  fmt.Printf("วิชาที่สอง: %s\n", secondCourse) // ผลลัพธ์: วิชาที่สอง: C#
}
```

## 🔄 Value Receiver vs Pointer Receiver

### 🚨 ปัญหาของ Value Receiver

ลองสร้าง method สำหรับเพิ่มวิชาใหม่:

```go
// ❌ Value Receiver - ไม่สามารถแก้ไขข้อมูลต้นฉบับได้
func (e Enrollment) AddCourse(newCourse string) {
  e.Courses = append(e.Courses, newCourse)
  // การเปลี่ยนแปลงจะเกิดขึ้นกับ copy เท่านั้น
}
```

### ทดสอบปัญหา:

```go
func main() {
  enrollment := Enrollment{
    Semester: "1/63",
    Courses:  []string{"Java", "C#"},
  }

  fmt.Printf("ก่อนเพิ่ม: %v\n", enrollment.Courses)
  enrollment.AddCourse("Go") // เพิ่มวิชา Go
  fmt.Printf("หลังเพิ่ม: %v\n", enrollment.Courses)

  // ผลลัพธ์: ข้อมูลไม่เปลี่ยนแปลง!
  // ก่อนเพิ่ม: [Java C#]
  // หลังเพิ่ม: [Java C#]
}
```

### ✅ แก้ไขด้วย Pointer Receiver

```go
// ✅ Pointer Receiver - สามารถแก้ไขข้อมูลต้นฉบับได้
func (e *Enrollment) AddCourse(newCourse string) {
  e.Courses = append(e.Courses, newCourse)
  // การเปลี่ยนแปลงจะเกิดขึ้นกับข้อมูลต้นฉบับ
}
```

### ทดสอบการแก้ไข:

```go
func main() {
  enrollment := Enrollment{
    Semester: "1/63",
    Courses:  []string{"Java", "C#"},
  }

  fmt.Printf("ก่อนเพิ่ม: %v\n", enrollment.Courses)
  enrollment.AddCourse("Go") // Go จะฉลาดใส่ & ให้อัตโนมัติ
  fmt.Printf("หลังเพิ่ม: %v\n", enrollment.Courses)

  // ผลลัพธ์: ข้อมูลเปลี่ยนแปลงสำเร็จ!
  // ก่อนเพิ่ม: [Java C#]
  // หลังเพิ่ม: [Java C# Go]
}
```

## 🎨 Visualization: การทำงานของ Receiver

```
Value Receiver (e Enrollment):
┌─────────────────┐    Copy    ┌─────────────────┐
│   Original      │   ────────▶│   Method Copy   │
│   Enrollment    │            │   Enrollment    │
│   ┌───────────┐ │            │   ┌───────────┐ │
│   │ Courses   │ │            │   │ Courses   │ │
│   │ [Java,C#] │ │            │   │ [Java,C#] │ │
│   └───────────┘ │            │   └───────────┘ │
└─────────────────┘            └─────────────────┘
   ⬆ ไม่เปลี่ยนแปลง              เปลี่ยนแปลงแค่ copy

Pointer Receiver (e *Enrollment):
┌─────────────────┐   Reference ┌─────────────────┐
│   Original      │   ────────▶│   Method        │
│   Enrollment    │      ┌─────│   *Enrollment   │
│   ┌───────────┐ │      │     │   (pointer)     │
│   │ Courses   │◄┼──────┘     └─────────────────┘
│   │ [Java,C#] │ │
│   └───────────┘ │
└─────────────────┘
   ⬆ เปลี่ยนแปลงตัวจริง
```

## 🔧 ตัวอย่างการใช้งานจริง (Updated 2024)

### ตัวอย่างที่สมบูรณ์:

```go
package main

import (
  "fmt"
  "strings"
)

type Enrollment struct {
  Semester string
  Courses  []string
}

// Value Receiver - สำหรับการอ่านข้อมูล
func (e Enrollment) CourseAt(index int) string {
  if index < 0 || index >= len(e.Courses) {
    return "ไม่พบวิชานี้"
  }
  return e.Courses[index]
}

func (e Enrollment) GetCourseCount() int {
  return len(e.Courses)
}

func (e Enrollment) String() string {
  return fmt.Sprintf("ภาคเรียน %s: %s",
    e.Semester,
    strings.Join(e.Courses, ", "))
}

// Pointer Receiver - สำหรับการแก้ไขข้อมูล
func (e *Enrollment) AddCourse(newCourse string) {
  e.Courses = append(e.Courses, newCourse)
}

func (e *Enrollment) RemoveCourse(index int) bool {
  if index < 0 || index >= len(e.Courses) {
    return false
  }

  // ลบโดยการสร้าง slice ใหม่
  e.Courses = append(e.Courses[:index], e.Courses[index+1:]...)
  return true
}

func (e *Enrollment) UpdateSemester(newSemester string) {
  e.Semester = newSemester
}

func main() {
  // สร้างข้อมูลเริ่มต้น
  enrollment := Enrollment{
    Semester: "1/67",
    Courses:  []string{"Go Programming", "Docker"},
  }

  fmt.Println("=== ข้อมูลเริ่มต้น ===")
  fmt.Println(enrollment)
  fmt.Printf("จำนวนวิชา: %d\n", enrollment.GetCourseCount())

  fmt.Println("\n=== การเพิ่มวิชา ===")
  enrollment.AddCourse("Kubernetes")
  enrollment.AddCourse("microservices")
  fmt.Println(enrollment)

  fmt.Println("\n=== การเข้าถึงวิชาเฉพาะ ===")
  fmt.Printf("วิชาแรก: %s\n", enrollment.CourseAt(0))
  fmt.Printf("วิชาสุดท้าย: %s\n", enrollment.CourseAt(enrollment.GetCourseCount()-1))

  fmt.Println("\n=== การลบวิชา ===")
  if enrollment.RemoveCourse(1) {
    fmt.Println("ลบวิชาที่ index 1 สำเร็จ")
  }
  fmt.Println(enrollment)

  fmt.Println("\n=== การอัพเดทภาคเรียน ===")
  enrollment.UpdateSemester("2/67")
  fmt.Println(enrollment)
}
```

## 📋 Best Practices (Updated 2024)

### 🟢 เมื่อไหร่ใช้ Value Receiver

```go
// ✅ ใช้เมื่อ:
// 1. Method ไม่ต้องการแก้ไขข้อมูล
// 2. Struct มีขนาดเล็ก
// 3. เป็น immutable operations

func (e Enrollment) IsEmpty() bool {
  return len(e.Courses) == 0
}

func (e Enrollment) Contains(courseName string) bool {
  for _, course := range e.Courses {
    if course == courseName {
      return true
    }
  }
  return false
}
```

### 🔴 เมื่อไหร่ใช้ Pointer Receiver

```go
// ✅ ใช้เมื่อ:
// 1. Method ต้องการแก้ไขข้อมูล
// 2. Struct มีขนาดใหญ่ (หลีกเลี่ยงการ copy)
// 3. ต้องการ consistency ใน receiver types

func (e *Enrollment) ClearAllCourses() {
  e.Courses = e.Courses[:0] // เคลียร์ slice
}

func (e *Enrollment) LoadFromAPI(apiURL string) error {
  // สมมติการโหลดข้อมูลจาก API
  // และอัพเดทข้อมูลใน struct
  return nil
}
```

## 🚀 การปรับปรุงในเวอร์ชันใหม่ (Go 1.21+)

### 1. Generic Methods (Go 1.18+)

```go
type Container[T any] struct {
  items []T
}

func (c *Container[T]) Add(item T) {
  c.items = append(c.items, item)
}

func (c Container[T]) Get(index int) (T, bool) {
  var zero T
  if index < 0 || index >= len(c.items) {
    return zero, false
  }
  return c.items[index], true
}
```

### 2. การใช้ Slices package (Go 1.21+)

```go
import "slices"

func (e *Enrollment) SortCourses() {
  slices.Sort(e.Courses)
}

func (e Enrollment) FindCourse(courseName string) int {
  return slices.Index(e.Courses, courseName)
}
```

## 📊 Performance Comparison

```go
// Benchmark example
func BenchmarkValueReceiver(b *testing.B) {
  e := Enrollment{
    Semester: "1/67",
    Courses:  make([]string, 1000), // Large slice
  }

  for i := 0; i < b.N; i++ {
    e.GetCourseCount() // Value receiver - จะ copy ทั้ง struct
  }
}

func BenchmarkPointerReceiver(b *testing.B) {
  e := &Enrollment{
    Semester: "1/67",
    Courses:  make([]string, 1000), // Large slice
  }

  for i := 0; i < b.N; i++ {
    e.GetCourseCount() // Pointer receiver - ไม่ copy
  }
}
```

## 🎯 สรุป

| Aspect          | Value Receiver      | Pointer Receiver    |
| --------------- | ------------------- | ------------------- |
| **การใช้งาน**   | อ่านข้อมูลเท่านั้น  | อ่าน + แก้ไขข้อมูล  |
| **Performance** | ช้าหาก struct ใหญ่  | เร็วกว่า (ไม่ copy) |
| **Memory**      | ใช้ memory มากขึ้น  | ประหยัด memory      |
| **Safety**      | ปลอดภัย (immutable) | ต้องระวังการแก้ไข   |
| **Syntax**      | `(e Enrollment)`    | `(e *Enrollment)`   |

### 💡 Tips สำหรับการเลือกใช้:

1. **Rule of thumb**: ถ้าแก้ไขข้อมูล ใช้ Pointer Receiver
2. **Consistency**: ถ้ามี method ใดใช้ Pointer แล้ว ควรใช้ทุก method
3. **Performance**: struct ใหญ่ควรใช้ Pointer เสมอ
4. **Go convention**: ตัวแปร receiver มักใช้ตัวอักษรแรกของ type name

---

> 🔄 **อัพเดทล่าสุด**: ปรับปรุงตามมาตรฐาน Go 1.21+ รวมถึงการใช้ generic methods และ packages ใหม่
