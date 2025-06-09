# Database Seeding

## 📖 Overview

Database seeding เป็นกระบวนการสร้างข้อมูลตัวอย่างเพื่อใช้ในการพัฒนาและทดสอบระบบ แทนที่จะต้องมานั่งสร้างข้อมูลทีละตัวทุกครั้งที่เริ่มพัฒนา เราสามารถเตรียมข้อมูลจำลองไว้ล่วงหน้าได้

## 🎯 จุดประสงค์

- **ประหยัดเวลา**: ไม่ต้องสร้างข้อมูลทดสอบทุกครั้ง
- **ความสม่ำเสมอ**: ทีมทุกคนได้ข้อมูลเดียวกันสำหรับการทดสอบ
- **การทดสอบ**: มีข้อมูลครบถ้วนสำหรับทดสอบ feature ต่างๆ

## 📁 โครงสร้างไฟล์

```
project/
├── seeds/
│   └── seed.go
└── main.go
```

## 🛠️ การสร้าง Seeder

### 1. สร้างโฟลเดอร์และไฟล์

```bash
mkdir seeds
touch seeds/seed.go
```

### 2. โค้ด Seeder หลัก

```go
package seed

import (
	"course-go/config"
	"course-go/migrations"
	"course-go/models"
	"math/rand"
	"strconv"

	"github.com/go-faker/faker/v4"
	"github.com/labstack/gommon/log"
)

func Load() {
	db := config.GetDB()

	// Clean Database
	db.Migrator().DropTable(&models.Article{}, &models.Category{}, "migrations")
	migrations.Migrate()

	// Add categories
	log.Info("Creating categories...")

	numOfCategories := 20
	categories := make([]models.Category, 0, numOfCategories)

	for i := 1; i <= numOfCategories; i++ {
		category := models.Category{
			Name: faker.Word(),
			Desc: faker.Paragraph(),
		}

		db.Create(&category)
		categories = append(categories, category)
	}

	// Add articles
	log.Info("Creating articles...")

	numOfArticles := 50
	articles := make([]models.Article, 0, numOfArticles)

	for i := 1; i <= numOfArticles; i++ {
		article := models.Article{
			Title:      faker.Sentence(),
			Excerpt:    faker.Sentence(),
			Body:       faker.Paragraph(),
			Image:      "https://source.unsplash.com/random/300x200?" + strconv.Itoa(i),
			CategoryID: uint(rand.Intn(numOfCategories) + 1),
		}

		db.Create(&article)
		articles = append(articles, article)
	}
}
```

### 3. ฟังก์ชันสร้าง Categories

```go
func createCategories(db *gorm.DB) {
  fmt.Println("📂 Creating categories...")

  numOfCategories := 20
  categories := make([]models.Category, 0, numOfCategories)

  for i := 0; i < numOfCategories; i++ {
    category := models.Category{
      Name: faker.Word(),
      Desc: faker.Paragraph(),
    }

    // สร้างข้อมูลในฐานข้อมูล
    if err := db.Create(&category).Error; err != nil {
      fmt.Printf("❌ Error creating category: %v\n", err)
      continue
    }

    categories = append(categories, category)
  }

  fmt.Printf("✅ Created %d categories\n", len(categories))
}
```

### 4. ฟังก์ชันสร้าง Articles

```go
func createArticles(db *gorm.DB) {
  fmt.Println("📝 Creating articles...")

  numOfArticles := 50
  articles := make([]models.Article, 0, numOfArticles)

  // ดึงจำนวน categories ที่มี
  var categoryCount int64
  db.Model(&models.Category{}).Count(&categoryCount)

  if categoryCount == 0 {
    fmt.Println("❌ No categories found, skipping articles creation")
    return
  }

  for i := 0; i < numOfArticles; i++ {
    // สุ่ม category ID
    randomCategoryID := uint(rand.Intn(int(categoryCount))) + 1

    article := models.Article{
      Title:      faker.Sentence(),
      Excerpt:    faker.Sentence(),
      Body:       faker.Paragraph(),
      Image:      fmt.Sprintf("https://picsum.photos/300/200?random=%d", i),
      CategoryID: randomCategoryID,
    }

    if err := db.Create(&article).Error; err != nil {
      fmt.Printf("❌ Error creating article: %v\n", err)
      continue
    }

    articles = append(articles, article)
  }

  fmt.Printf("✅ Created %d articles\n", len(articles))
}
```

### 5. ฟังก์ชันล้างฐานข้อมูล (GORM v2)

```go
func cleanDatabase(db *gorm.DB) {
  fmt.Println("🧹 Cleaning database...")

  // ⚠️ อัปเดตสำหรับ GORM v2
  // เปลี่ยนจาก: db.DropTableIfExists()
  // เป็น: db.Migrator().DropTable()

  err := db.Migrator().DropTable(
    &models.Article{},
    &models.Category{},
    "migrations",
  )

  if err != nil {
    fmt.Printf("❌ Error dropping tables: %v\n", err)
  } else {
    fmt.Println("✅ Tables dropped successfully")
  }
}
```

## 🔧 การแก้ไขสำหรับ GORM v2

### ปัญหาที่พบและวิธีแก้ไข

#### 1. DropTableIfExists (ไม่รองรับใน GORM v2)

**ก่อน (GORM v1):**

```go
db.DropTableIfExists("articles", "categories", "migrations")
```

**หลัง (GORM v2):**

```go
db.Migrator().DropTable(&models.Article{}, &models.Category{}, "migrations")
```

#### 2. Update Method (เปลี่ยนแปลงใน GORM v2)

**ปัญหา:** `Update()` ต้องการ 2 parameters หรือใช้ `Updates()` แทน

### การแก้ไข Articles Controller

```go
func (a *Articles) Update(ctx *gin.Context) {
  var form updateArticleForm
  if err := ctx.ShouldBind(&form); err != nil {
    ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
    return
  }

  article, err := a.findArticleByID(ctx)
  if err != nil {
    ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
    return
  }

  // 🔧 วิธีที่ 1: ใช้ map สำหรับข้อมูลที่ต้องอัปเดต
  updateData := make(map[string]interface{})
  if form.Title != "" {
    updateData["title"] = form.Title
  }
  if form.Body != "" {
    updateData["body"] = form.Body
  }
  if form.Excerpt != "" {
    updateData["excerpt"] = form.Excerpt
  }
  if form.CategoryID != 0 {
    updateData["category_id"] = form.CategoryID
  }

  // ⚠️ เปลี่ยนจาก Update() เป็น Updates()
  if len(updateData) > 0 {
    if err := a.DB.Model(&article).Updates(updateData).Error; err != nil {
      ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
      return
    }
  }

  // จัดการไฟล์รูปแยกต่างหาก
  if form.Image != nil {
    if err := a.setArticleImage(ctx, article); err != nil {
      ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload image: " + err.Error()})
      return
    }
  }

  var serializedArticle articleResponse
  copier.Copy(&serializedArticle, article)
  ctx.JSON(http.StatusOK, gin.H{"article": serializedArticle})
}
```

### การแก้ไข Categories Controller

```go
func (c *Categories) Update(ctx *gin.Context) {
  var form updateCategoryForm
  if err := ctx.ShouldBindJSON(&form); err != nil {
    ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
    return
  }

  category, err := c.findCategoryByID(ctx)
  if err != nil {
    ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
    return
  }

  // 🔧 วิธีที่ 2: ใช้ struct โดยตรง (เหมาะกับข้อมูลแบบง่าย)
  if err := c.DB.Model(&category).Updates(&form).Error; err != nil {
    ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
    return
  }

  var serializedCategory categoryResponse
  copier.Copy(&serializedCategory, category)
  ctx.JSON(http.StatusOK, gin.H{"category": serializedCategory})
}
```

## 📋 การเรียกใช้งาน

เพิ่มในไฟล์ `main.go`:

```go
package main

import (
  "your-project/seeds"
  // ... other imports
)

func main() {
  // ... existing code

  // 🌱 เรียกใช้ seeder (ควรใช้เฉพาะตอน development)
  seeds.Load()

  // ... rest of your application
}
```

## 📊 ผลลัพธ์ที่ได้

หลังจากรัน seeder จะได้:

- **Categories**: 20 รายการ พร้อมชื่อและคำอธิบายแบบสุ่ม
- **Articles**: 50 รายการ พร้อมหัวข้อ, เนื้อหา, รูปภาพ และเชื่อมโยงกับ category

## 🎨 Visualization

```
🗃️ Database Before Seeding
├── categories (empty)
└── articles (empty)

        ⬇️ seeds.Load() ⬇️

🗃️ Database After Seeding
├── categories (20 items)
│   ├── 📂 "Technology" - "Description about tech..."
│   ├── 📂 "Travel" - "Description about travel..."
│   └── 📂 ... (18 more)
└── articles (50 items)
  ├── 📄 "How to Code Better" [Category: Technology]
  ├── 📄 "Best Places to Visit" [Category: Travel]
  └── 📄 ... (48 more)
```

## 🚀 การปรับปรุงที่แนะนำ

### 1. เพิ่ม Environment Check

```go
func Load() {
  if os.Getenv("APP_ENV") == "production" {
    fmt.Println("❌ Seeding is disabled in production!")
    return
  }

  // ... rest of seeding code
}
```

### 2. เพิ่ม Progress Indicator

```go
func createArticles(db *gorm.DB) {
  numOfArticles := 50

  for i := 0; i < numOfArticles; i++ {
    // Show progress
    if (i+1)%10 == 0 {
      fmt.Printf("📝 Created %d/%d articles\n", i+1, numOfArticles)
    }

    // ... article creation code
  }
}
```

### 3. Error Handling ที่ดีขึ้น

```go
func createCategories(db *gorm.DB) error {
  fmt.Println("📂 Creating categories...")

  for i := 0; i < numOfCategories; i++ {
    category := models.Category{
      Name: faker.Word(),
      Desc: faker.Paragraph(),
    }

    if err := db.Create(&category).Error; err != nil {
      return fmt.Errorf("failed to create category %d: %w", i, err)
    }
  }

  return nil
}
```

## 🔍 สรุปการเปลี่ยนแปลงหลัก

| เดิม (GORM v1)         | ใหม่ (GORM v2)           | เหตุผล                       |
| ---------------------- | ------------------------ | ---------------------------- |
| `DropTableIfExists()`  | `Migrator().DropTable()` | API ใหม่ใน GORM v2           |
| `Update(&struct)`      | `Updates(&struct)`       | ป้องกันการอัปเดต zero values |
| `Update(field, value)` | `Update(field, value)`   | ยังใช้ได้สำหรับ field เดียว  |

## 💡 Tips สำหรับการพัฒนา

1. **ใช้ seeder เฉพาะ development environment**
2. **สร้างข้อมูลที่สมจริง** ใช้ faker library
3. **จัดการ foreign key relationships** อย่างระมัดระวัง
4. **มี progress indicator** สำหรับข้อมูลจำนวนมาก
5. **ทำ transaction** เพื่อ rollback หากเกิดข้อผิดพลาด

Database seeding ช่วยให้การพัฒนาและทดสอบระบบมีประสิทธิภาพมากขึ้น และทำให้ทีมทำงานร่วมกันได้ง่ายขึ้นด้วย! 🎉
