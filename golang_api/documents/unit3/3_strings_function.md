# คู่มือฟังก์ชัน Strings Package ใน Go - ฉบับสมบูรณ์ 🚀

> **หมายเหตุ**: คู่มือนี้ได้รับการอัปเดตสำหรับ Go 1.21+ (ปี 2024- 25) พร้อมตัวอย่างและแนวทางปฏิบัติที่ทันสมัย

## ภาพรวม

Go มี package `strings` ที่ครอบคลุมและมีฟังก์ชันมากมายสำหรับการจัดการ string คู่มือนี้ครอบคลุมฟังก์ชัน string ที่สำคัญพร้อมตัวอย่างการใช้งานจริงและรูปแบบการใช้งานที่ทันสมัย

## ข้อกำหนดเบื้องต้น

```go
import "strings"
```

## ฟังก์ชัน String หลักๆ

### 1. `strings.Contains()` - ตรวจสอบการมีอยู่ของ Substring

**วัตถุประสงค์**: ตรวจสอบว่า substring มีอยู่ใน string หรือไม่

```go
package main

import (
  "fmt"
  "strings"
)

func main() {
  text := "สวัสดี โลกที่สวยงาม!"

  // ตรวจสอบว่า "สวยงาม" มีอยู่ในข้อความหรือไม่
  result := strings.Contains(text, "สวยงาม")
  fmt.Printf("มี 'สวยงาม': %v\n", result) // ผลลัพธ์: true

  // การตรวจสอบแบบ case-sensitive
  result2 := strings.Contains(text, "สวยงาม")
  fmt.Printf("มี 'สวยงาม': %v\n", result2) // ผลลัพธ์: false
}
```

**💡 เทคนิค**: ใช้ `strings.ToLower()` สำหรับการค้นหาแบบไม่สนใจตัวพิมพ์เล็ก-ใหญ่

**🎯 การใช้งานจริง**: ตรวจสอบคำสำคัญในข้อความ, กรองเนื้อหา, ตรวจสอบการมีอยู่ของข้อมูล

### 2. `strings.Count()` - นับจำนวนครั้งที่พบ

**วัตถุประสงค์**: นับจำนวนครั้งที่ substring ปรากฏใน string

```go
func main() {
  text := "Go เจ๋ง Go เร็ว Go สุดยอด!"

  count := strings.Count(text, "Go")
  fmt.Printf("'Go' ปรากฏ %d ครั้ง\n", count) // ผลลัพธ์: 3

  // นับ pattern ที่ซ้อนทับกัน
  overlapping := "aaaa"
  countA := strings.Count(overlapping, "aa")
  fmt.Printf("'aa' ใน 'aaaa': %d ครั้ง\n", countA) // ผลลัพธ์: 2
}
```

**📊 การแสดงภาพ**:

```
ข้อความ: "Go เจ๋ง Go เร็ว Go สุดยอด!"
         ^^      ^^      ^^
         1       2       3 ครั้งที่พบ
```

**🔧 การประยุกต์ใช้**:

- วิเคราะห์ความถี่ของคำ
- ตรวจสอบการซ้ำของข้อมูล
- วิเคราะห์ log files

### 3. `strings.HasPrefix()` - ตรวจสอบจุดเริ่มต้นของ String

**วัตถุประสงค์**: ตรวจสอบว่า string เริ่มต้นด้วย prefix ที่กำหนดหรือไม่

```go
func main() {
  urls := []string{
    "https://example.com",
    "http://test.com",
    "ftp://files.com",
  }

  for _, url := range urls {
    if strings.HasPrefix(url, "https://") {
      fmt.Printf("✅ URL ปลอดภัย: %s\n", url)
    } else {
      fmt.Printf("⚠️  URL ไม่ปลอดภัย: %s\n", url)
    }
  }

  // ตัวอย่างการใช้กับเส้นทางไฟล์
  paths := []string{
    "/home/user/document.txt",
    "/var/log/system.log",
    "relative/path/file.go",
  }

  fmt.Println("\n📁 การวิเคราะห์เส้นทางไฟล์:")
  for _, path := range paths {
    if strings.HasPrefix(path, "/") {
      fmt.Printf("📍 เส้นทางแบบสัมบูรณ์: %s\n", path)
    } else {
      fmt.Printf("📂 เส้นทางแบบสัมพันธ์: %s\n", path)
    }
  }
}
```

**🔧 การใช้งานสมัยใหม่**:

- ตรวจสอบ API endpoints
- วิเคราะห์ file paths
- ตรวจสอบ protocol
- การจัดหมวดหมู่ข้อมูล

### 4. `strings.HasSuffix()` - ตรวจสอบจุดสิ้นสุดของ String

**วัตถุประสงค์**: ตรวจสอบว่า string สิ้นสุดด้วย suffix ที่กำหนดหรือไม่

```go
func main() {
  files := []string{
    "เอกสาร.pdf",
    "รูปภาพ.jpg",
    "สคริปต์.go",
    "ข้อมูล.json",
    "โปรแกรม.exe",
  }

  // กำหนดนามสกุลไฟล์ประเภทต่างๆ
  imageExtensions := []string{".jpg", ".png", ".gif", ".webp", ".jpeg"}
  codeExtensions := []string{".go", ".js", ".py", ".java", ".cpp"}

  fmt.Println("🗂️  การจำแนกประเภทไฟล์:")
  for _, file := range files {
    var fileType string
    var emoji string

    // ตรวจสอบประเภทไฟล์
    if hasAnySuffix(file, imageExtensions) {
      fileType = "ไฟล์รูปภาพ"
      emoji = "🖼️"
    } else if hasAnySuffix(file, codeExtensions) {
      fileType = "ไฟล์โค้ด"
      emoji = "💻"
    } else if strings.HasSuffix(file, ".pdf") {
      fileType = "เอกสาร PDF"
      emoji = "📄"
    } else {
      fileType = "ไฟล์อื่นๆ"
      emoji = "📁"
    }

    fmt.Printf("%s %s: %s\n", emoji, fileType, file)
  }
}

// ฟังก์ชันช่วยตรวจสอบ suffix หลายตัว
func hasAnySuffix(s string, suffixes []string) bool {
  for _, suffix := range suffixes {
    if strings.HasSuffix(s, suffix) {
      return true
    }
  }
  return false
}
```

**🎯 การประยุกต์ใช้**:

- การจัดหมวดหมู่ไฟล์
- ตรวจสอบ file format
- การกรองข้อมูล
- ตรวจสอบ domain names

### 5. `strings.Join()` - รวม String Slices

**วัตถุประสงค์**: รวม elements ใน slice เข้าด้วยกันเป็น string เดียวด้วย separator

```go
func main() {
  // การรวมพื้นฐาน
  fruits := []string{"แอปเปิ้ล", "กล้วย", "ส้ม", "มะม่วง"}
  result := strings.Join(fruits, ", ")
  fmt.Printf("ผลไม้: %s\n", result) // ผลลัพธ์: แอปเปิ้ล, กล้วย, ส้ม, มะม่วง

  // สร้าง breadcrumb navigation
  pathParts := []string{"หน้าหลัก", "หมวดหมู่", "สินค้า", "รายละเอียด"}
  breadcrumb := strings.Join(pathParts, " > ")
  fmt.Printf("เส้นทาง: %s\n", breadcrumb) // ผลลัพธ์: หน้าหลัก > หมวดหมู่ > สินค้า > รายละเอียด

  // สร้างข้อมูล CSV
  headers := []string{"ชื่อ", "อายุ", "เมือง", "อีเมล"}
  csvHeader := strings.Join(headers, ",")
  fmt.Printf("หัวตาราง CSV: %s\n", csvHeader)

  // สร้าง SQL IN clause
  ids := []string{"1", "2", "3", "4", "5"}
  sqlIn := "SELECT * FROM users WHERE id IN (" + strings.Join(ids, ",") + ")"
  fmt.Printf("SQL Query: %s\n", sqlIn)

  // สร้าง hashtags
  tags := []string{"golang", "programming", "tutorial", "thai"}
  hashtags := "#" + strings.Join(tags, " #")
  fmt.Printf("Hashtags: %s\n", hashtags) // ผลลัพธ์: #golang #programming #tutorial #thai
}
```

**🆚 ทางเลือกอื่น**: สำหรับ Go 1.21+ พิจารณาใช้ `slices.Concat()` สำหรับการดำเนินการที่ซับซ้อนมากขึ้น

### 6. `strings.ToUpper()` - แปลงเป็นตัวพิมพ์ใหญ่

**วัตถุประสงค์**: แปลงอักขระทั้งหมดเป็นตัวพิมพ์ใหญ่

```go
func main() {
  text := "สวัสดี Hello, 世界! 123"
  upper := strings.ToUpper(text)
  fmt.Printf("ต้นฉบับ: %s\n", text)
  fmt.Printf("ตัวพิมพ์ใหญ่: %s\n", upper) // ผลลัพธ์: สวัสดี HELLO, 世界! 123

  // การเปรียบเทียบแบบไม่สนใจตัวพิมพ์เล็ก-ใหญ่
  input1 := "GoLang"
  input2 := "golang"
  input3 := "GOLANG"

  inputs := []string{input1, input2, input3}

  fmt.Println("\n🔍 การเปรียบเทียบแบบไม่สนใจตัวพิมพ์:")
  for i, inp1 := range inputs {
    for j, inp2 := range inputs {
      if i < j {
        if strings.ToUpper(inp1) == strings.ToUpper(inp2) {
          fmt.Printf("✅ '%s' และ '%s' เหมือนกัน\n", inp1, inp2)
        }
      }
    }
  }

  // การใช้งานกับระบบค้นหา
  searchTerm := "โปรแกรม"
  database := []string{"โปรแกรมคอมพิวเตอร์", "การโปรแกรม", "โปรแกรมเมอร์", "ไฟล์เอกสาร"}

  fmt.Printf("\n🔎 ผลการค้นหา '%s':\n", searchTerm)
  for _, item := range database {
    if strings.Contains(strings.ToUpper(item), strings.ToUpper(searchTerm)) {
      fmt.Printf("📝 พบ: %s\n", item)
    }
  }
}
```

### 7. `strings.ToLower()` - แปลงเป็นตัวพิมพ์เล็ก

**วัตถุประสงค์**: แปลงอักขระทั้งหมดเป็นตัวพิมพ์เล็ก

```go
func main() {
  text := "สวัสดี HELLO, 世界! 123"
  lower := strings.ToLower(text)
  fmt.Printf("ต้นฉบับ: %s\n", text)
  fmt.Printf("ตัวพิมพ์เล็ก: %s\n", lower) // ผลลัพธ์: สวัสดี hello, 世界! 123

  // การปรับ email ให้เป็นมาตรฐาน
  emails := []string{
    "USER@EXAMPLE.COM",
    "Admin@Test.Org",
    "SUPPORT@COMPANY.CO.TH",
    "Info@Website.Net",
  }

  fmt.Println("\n📧 อีเมลที่ปรับให้เป็นมาตรฐาน:")
  normalizedEmails := make([]string, 0, len(emails))
  for _, email := range emails {
    normalized := strings.ToLower(email)
    normalizedEmails = append(normalizedEmails, normalized)
    fmt.Printf("📬 %s → %s\n", email, normalized)
  }

  // การใช้งานกับระบบ login
  fmt.Println("\n🔐 ตัวอย่างระบบ login:")
  registeredUsers := map[string]string{
    "admin@site.com":     "password123",
    "user@example.com":   "mypass456",
    "support@help.co.th": "support789",
  }

  loginAttempts := []string{"ADMIN@SITE.COM", "User@Example.Com", "invalid@test.com"}

  for _, attempt := range loginAttempts {
    normalizedAttempt := strings.ToLower(attempt)
    if _, exists := registeredUsers[normalizedAttempt]; exists {
      fmt.Printf("✅ ผู้ใช้ '%s' ถูกต้อง\n", attempt)
    } else {
      fmt.Printf("❌ ไม่พบผู้ใช้ '%s'\n", attempt)
    }
  }
}
```

## 🆕 การปรับปรุงใน Go 1.21+ สมัยใหม่

### การรองรับ Unicode ที่ดีขึ้น

```go
import "golang.org/x/text/cases"
import "golang.org/x/text/language"

func modernCasing() {
  // การจัดการ Unicode ที่ดีขึ้น
  caser := cases.Title(language.English)
  text := "hello world"
  title := caser.String(text)
  fmt.Printf("Title case: %s\n", title) // ผลลัพธ์: Hello World

  // รองรับภาษาไทย
  thaiCaser := cases.Title(language.Thai)
  thaiText := "สวัสดีชาวโลก"
  thaiTitle := thaiCaser.String(thaiText)
  fmt.Printf("Thai title: %s\n", thaiTitle)
}
```

### การปรับปรุงประสิทธิภาพ

```go
// ใช้ strings.Builder สำหรับการต่อ string (Go 1.10+)
func efficientConcatenation() {
  var builder strings.Builder
  words := []string{"Go", "เจ๋ง", "มาก!"}

  // การต่อ string อย่างมีประสิทธิภาพ
  for i, word := range words {
    if i > 0 {
      builder.WriteString(" ")
    }
    builder.WriteString(word)
  }

  result := builder.String()
  fmt.Printf("ผลลัพธ์: %s\n", result) // ผลลัพธ์: Go เจ๋ง มาก!

  // เปรียบเทียบประสิทธิภาพ
  fmt.Println("\n⚡ การเปรียบเทียบประสิทธิภาพ:")

  // วิธีไม่มีประสิทธิภาพ (อย่าทำแบบนี้)
  // var slow string
  // for _, word := range words {
  //     slow += word + " " // สร้าง string ใหม่ทุกครั้ง
  // }

  // วิธีที่มีประสิทธิภาพ
  var fast strings.Builder
  for _, word := range words {
    fast.WriteString(word)
    fast.WriteString(" ")
  }

  fmt.Printf("📈 ใช้ strings.Builder: %s\n", fast.String())
}
```

### ฟีเจอร์ใหม่ใน Go 1.21+

```go
import "slices"

func modernStringOperations() {
  // การใช้งาน slices package ใหม่
  words := []string{"Go", "เป็น", "ภาษา", "ที่", "ยอดเยี่ยม"}

  // หาคำที่มีความยาวมากกว่า 2 ตัวอักษร
  longWords := make([]string, 0)
  for _, word := range words {
    if len(word) > 2 {
      longWords = append(longWords, word)
    }
  }

  fmt.Printf("คำที่ยาว: %v\n", longWords)

  // ใช้ slices.Contains (Go 1.21+)
  if slices.Contains(words, "Go") {
    fmt.Println("✅ พบคำว่า 'Go' ในรายการ")
  }
}
```

## 📝 สรุปแนวทางปฏิบัติที่ดี

### 1. 🚀 ประสิทธิภาพ

- ใช้ `strings.Builder` สำหรับการต่อ string หลายครั้ง
- หลีกเลี่ยงการสร้าง string ใหม่ซ้ำๆ ในลูป
- ใช้ `strings.Contains()` แทนการใช้ regex สำหรับการค้นหาง่ายๆ

```go
// ❌ ไม่ดี
func badConcat(words []string) string {
  result := ""
  for _, word := range words {
    result += word + " "
  }
  return result
}

// ✅ ดี
func goodConcat(words []string) string {
  var builder strings.Builder
  for i, word := range words {
    if i > 0 {
      builder.WriteString(" ")
    }
    builder.WriteString(word)
  }
  return builder.String()
}
```

### 2. 🌐 Unicode และภาษาต่างๆ

- พิจารณาใช้ `golang.org/x/text` สำหรับการดำเนินการ Unicode ขั้นสูง
- ระวังการใช้ `len()` กับ string ที่มี Unicode characters

```go
// การจัดการ Unicode อย่างถูกต้อง
import "unicode/utf8"

func unicodeExample() {
  text := "สวัสดี 🇹🇭"

  fmt.Printf("len(): %d\n", len(text))                    // จำนวน bytes
  fmt.Printf("utf8.RuneCountInString(): %d\n",
    utf8.RuneCountInString(text))                        // จำนวน characters จริง
}
```

### 3. 🔒 ความปลอดภัย

- ตรวจสอบและทำความสะอาด input จาก user เสมอ
- ใช้การเปรียบเทียบแบบ case-insensitive อย่างระมัดระวัง

```go
func sanitizeInput(input string) string {
  // ตัดช่องว่างด้านหน้าและหลัง
  cleaned := strings.TrimSpace(input)

  // แทนที่อักขระที่อันตราย
  cleaned = strings.ReplaceAll(cleaned, "<", "&lt;")
  cleaned = strings.ReplaceAll(cleaned, ">", "&gt;")

  return cleaned
}
```

### 4. 💾 การจัดการหน่วยความจำ

- หลีกเลี่ยงการสร้าง string ขนาดใหญ่โดยไม่จำเป็น
- ใช้ `strings.Reader` สำหรับการอ่าน string ขนาดใหญ่

## 🔄 หมายเหตุการ Migration จากเวอร์ชันเก่า

### Go 1.18+ → Go 1.21+

```go
// เปลี่ยนจาก
func oldWay() {
  // การใช้งานแบบเก่า
}

// เป็น
func newWay() {
  // การใช้งานแบบใหม่ที่มี generics และ performance ดีขึ้น
}
```

**การเปลี่ยนแปลงสำคัญ**:

- **Go 1.18+**: Generic slices ทำงานร่วมกับ string operations ได้ดีขึ้น
- **Go 1.20+**: ประสิทธิภาพที่ดีขึ้นสำหรับฟังก์ชัน string หลายตัว
- **Go 1.21+**: การจัดการ error และรองรับ Unicode ที่ดีขึ้น

## 🎯 กรณีการใช้งานทั่วไป

### 🌐 การพัฒนาเว็บ

```go
func webExample() {
  // ตรวจสอบ URL
  url := "https://api.example.com/v1/users"
  if strings.HasPrefix(url, "https://") {
    fmt.Println("✅ URL ปลอดภัย")
  }

  // ประมวลผล headers
  contentType := "application/json; charset=utf-8"
  if strings.Contains(contentType, "json") {
    fmt.Println("📄 เป็นข้อมูล JSON")
  }
}
```

### 📊 การประมวลผลข้อมูล

```go
func dataProcessing() {
  // แยกข้อมูล CSV
  csvLine := "ชื่อ,นามสกุล,อายุ,เมือง"
  fields := strings.Split(csvLine, ",")
  fmt.Printf("ฟิลด์: %v\n", fields)

  // วิเคราะห์ log
  logEntry := "[2024-01-15 10:30:25] ERROR: Database connection failed"
  if strings.Contains(logEntry, "ERROR") {
    fmt.Println("🚨 พบข้อผิดพลาด")
  }
}
```

### ⚙️ การกำหนดค่า

```go
func configExample() {
  // จัดการ environment variables
  dbURL := "postgres://user:pass@localhost:5432/mydb"
  if strings.HasPrefix(dbURL, "postgres://") {
    fmt.Println("🐘 ใช้ PostgreSQL database")
  }

  // ประมวลผลการตั้งค่า
  config := "debug=true,port=8080,host=localhost"
  settings := strings.Split(config, ",")
  for _, setting := range settings {
    parts := strings.Split(setting, "=")
    if len(parts) == 2 {
      fmt.Printf("⚙️  %s: %s\n", parts[0], parts[1])
    }
  }
}
```

### 🔐 ความปลอดภัย

```go
func securityExample() {
  userInput := "  <script>alert('xss')</script>  "

  // ทำความสะอาด input
  cleaned := strings.TrimSpace(userInput)
  cleaned = strings.ReplaceAll(cleaned, "<script>", "")
  cleaned = strings.ReplaceAll(cleaned, "</script>", "")

  fmt.Printf("Input ที่สะอาด: %s\n", cleaned)

  // การจับคู่แบบไม่สนใจตัวพิมพ์
  allowedDomains := []string{"example.com", "test.org"}
  userDomain := "EXAMPLE.COM"

  for _, domain := range allowedDomains {
    if strings.ToLower(userDomain) == strings.ToLower(domain) {
      fmt.Println("✅ Domain ได้รับอนุญาต")
      break
    }
  }
}
```

## 🎓 แบบฝึกหัดเพื่อความเข้าใจ

```go
// ลองเขียนฟังก์ชันเหล่านี้เพื่อฝึกฝน
func exercises() {
  // 1. เขียนฟังก์ชันตรวจสอบว่าเป็นอีเมลไทยหรือไม่ (.co.th, .ac.th)
  // 2. สร้างฟังก์ชันแปลงชื่อไฟล์ให้เป็น URL-safe
  // 3. เขียน word counter สำหรับข้อความภาษาไทย
  // 4. สร้างฟังก์ชัน slug generator สำหรับ URL
}
```

---

_คู่มือนี้อัปเดตสำหรับ Go 1.21+ (2024 - 25 สำหรับ 1.24.3) พร้อมตัวอย่างภาษาไทยและแนวทางปฏิบัติที่ทันสมัย_ 🇹🇭
