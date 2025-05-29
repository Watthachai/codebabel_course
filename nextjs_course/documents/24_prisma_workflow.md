# Prisma Workflow และ Database Migration Guide 📚

> คู่มือฉบับสมบูรณ์สำหรับการทำงานกับ Prisma ORM ใน Development และ Production Environment พร้อมอัพเดทล่าสุดสำหรับปี 2025

## 📋 สารบัญ

- [เริ่มต้นใช้งาน Prisma](#เริ่มต้นใช้งาน-prisma)
- [Development Workflow](#development-workflow)
- [Migration Concept](#migration-concept)
- [Environment Management](#environment-management)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)
- [เปรียบเทียบ: แบบเก่า vs แบบใหม่ 2025](#เปรียบเทียบ-แบบเก่า-vs-แบบใหม่-2025)
- [Troubleshooting](#troubleshooting)

---

## 🚀 เริ่มต้นใช้งาน Prisma

### การติดตั้งและตั้งค่าเบื้องต้น

**1. ติดตั้ง Dependencies**

```bash
npm install prisma @prisma/client
npm install -D prisma
```

**2. เริ่มต้นโปรเจค Prisma**

```bash
npx prisma init
```

**3. ตั้งค่า Environment Variables**

```env
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

**4. โครงสร้างไฟล์ที่ได้**

```
├── prisma/
│   ├── schema.prisma    # Schema definition
│   └── migrations/      # Migration files (จะถูกสร้างทีหลัง)
└── .env                 # Environment variables
```

---

## 🔄 Development Workflow

### ทำความเข้าใจ 2 แนวทางหลัก

```mermaid
graph TD
    subgraph "🧪 Prototype Phase"
        A[เขียน Schema] --> B[npx prisma db push]
        B --> C[ทดสอบ + ปรับแต่ง]
        C --> D{พอใจแล้ว?}
        D -->|ไม่| A
        D -->|ใช่| E[เตรียมสร้าง Migration]
    end

    subgraph "🏗️ Production Ready"
        E --> F[npx prisma migrate dev]
        F --> G[Review Migration File]
        G --> H[Deploy ไป Staging/Production]
    end

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style F fill:#e8f5e8
    style H fill:#fce4ec
```

### 1. Prototype Phase: ใช้ `db push` 🧪

**เมื่อไหร่ใช้:**

- กำลังออกแบบ Schema
- ทดลองโครงสร้างต่างๆ
- ยังไม่แน่ใจกับ Model

**ตัวอย่างการใช้งาน:**

```prisma
// schema.prisma - เวอร์ชันทดลอง
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

```bash
# ซิงค์โครงสร้างไปยัง Database ทันที
npx prisma db push
```

**ข้อดี:**

- ✅ เร็ว ไม่ต้องสร้าง Migration File
- ✅ เหมาะกับการทดลอง
- ✅ ไม่มีไฟล์ Migration ที่ซับซ้อน

**ข้อเสีย:**

- ❌ ไม่มีประวัติการเปลี่ยนแปลง
- ❌ อันตรายถ้าใช้ใน Production
- ❌ ทีมงานไม่สามารถซิงค์ได้

### 2. Production Phase: ใช้ `migrate dev` 🏗️

**เมื่อไหร่ใช้:**

- Schema ถูกต้องแล้ว
- พร้อม Deploy ไป Production
- ต้องการ Version Control

```bash
# สร้าง Migration File พร้อมชื่อที่อธิบายการเปลี่ยนแปลง
npx prisma migrate dev --name create_user_table
```

**สิ่งที่เกิดขึ้น:**

1. สร้างไฟล์ Migration ใน `prisma/migrations/`
2. รัน Migration ใน Database
3. อัพเดท Prisma Client
4. รัน Seed (ถ้ามี)

---

## 🏗️ Migration Concept

### ทำไมต้องใช้ Migration? 🤔

**ลองนึกภาพสถานการณ์นี้:**

```mermaid
graph LR
    subgraph "😰 ปัญหาของ db push"
        A[Dev A<br/>เพิ่ม username field]
        B[Dev B<br/>เพิ่ม avatar field]
        C[Database<br/>😵 งงแล้ว!]
        A --> C
        B --> C
    end

    subgraph "😊 ข้อดีของ Migration"
        D[Migration 001<br/>add_username]
        E[Migration 002<br/>add_avatar]
        F[Database<br/>😎 รู้ขั้นตอน!]
        D --> E
        E --> F
    end
```

### โครงสร้าง Migration Files

```
prisma/migrations/
├── 20250115120000_create_user_table/
│   └── migration.sql
├── 20250115130000_add_username_field/
│   └── migration.sql
└── 20250115140000_add_user_profile_relation/
    └── migration.sql
```

**ตัวอย่าง Migration File:**

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

### Environment Comparison

| Environment     | คำสั่งที่ใช้     | มี Seeding | Reset ได้ | ปลอดภัย |
| --------------- | ---------------- | ---------- | --------- | ------- |
| **Development** | `migrate dev`    | ✅         | ✅        | ⚠️      |
| **Staging**     | `migrate deploy` | ❌         | ⚠️        | ✅      |
| **Production**  | `migrate deploy` | ❌         | ❌        | ✅      |

---

## 🌍 Environment Management

### การซิงค์ระหว่าง Environment

```mermaid
graph TD
    subgraph "Development Flow"
        Dev[👨‍💻 Development<br/>Migration v10<br/>ล่าสุด]
        DevDB[(Dev Database)]
        Dev --> DevDB
    end

    subgraph "Staging Flow"
        QA[🧪 QA Environment<br/>Migration v7<br/>ตามหลัง 3 เวอร์ชัน]
        QADB[(QA Database)]
        QA --> QADB
    end

    subgraph "Production Flow"
        Prod[🚀 Production<br/>Migration v5<br/>ตามหลัง 5 เวอร์ชัน]
        ProdDB[(Production Database)]
        Prod --> ProdDB
    end

    Dev -->|Deploy| QA
    QA -->|Deploy| Prod

    style Dev fill:#e1f5fe
    style QA fill:#fff3e0
    style Prod fill:#ffebee
```

### กระบวนการ Deploy

**เมื่อ Deploy ไป QA Environment:**

```bash
# QA จะรัน Migration v8, v9, v10 อัตโนมัติตามลำดับ
npx prisma migrate deploy
```

**ขั้นตอนที่เกิดขึ้น:**

1. ✅ ตรวจสอบ Migration v8
2. ✅ รัน Migration v8
3. ✅ ตรวจสอบ Migration v9
4. ✅ รัน Migration v9
5. ✅ ตรวจสอบ Migration v10
6. ✅ รัน Migration v10
7. 🎉 เสร็จสิ้น!

---

## 💻 Practical Examples

### Example 1: สร้างโปรเจคใหม่ตั้งแต่เริ่มต้น

**Step 1: เตรียม Schema**

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  name      String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Relation
  articles  Article[]
}

model Article {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  Int
  createdAt DateTime @default(now())

  // Relation
  author    User     @relation(fields: [authorId], references: [id])
}
```

**Step 2: สร้าง Migration แรก**

```bash
npx prisma migrate dev --name init
```

**ผลลัพธ์:**

```
✔ Generated Prisma Client
✔ Applied migration 20250115120000_init

📁 prisma/migrations/
  └── 20250115120000_init/
      └── migration.sql
```

### Example 2: เพิ่ม Field ใหม่อย่างปลอดภัย

**😰 สถานการณ์ที่มักเจอ:**
คุณต้องการเพิ่ม Field `password` ให้กับ User ที่มีอยู่แล้ว 1000 คน

**❌ วิธีที่ผิด:**

```prisma
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  name     String?
  password String  // ⚠️ Required field! User ที่มีอยู่แล้วจะไม่มี password
}
```

**ปัญหา:** Migration จะ fail เพราะ User ที่มีอยู่แล้วไม่มี password

**✅ วิธีที่ถูก:**

**Step 1: เพิ่มเป็น Optional ก่อน**

```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String?
  password String? // Optional ก่อน
}
```

**Step 2: สร้าง Migration แต่ไม่รันทันที**

```bash
npx prisma migrate dev --create-only --name add_password_field
```

**Step 3: แก้ไข Migration File**

```sql
-- Add the column as nullable
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- Set default password for existing users
UPDATE "User" SET "password" = 'temporary_password_' || "id"::text
WHERE "password" IS NULL;

-- Optional: Make it NOT NULL if needed
-- ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
```

**Step 4: รัน Migration**

```bash
npx prisma migrate dev
```

### Example 3: การจัดการ Relation ที่ซับซ้อน

**สถานการณ์:** เพิ่ม Category ให้กับ Article

```prisma
// เพิ่ม Model ใหม่
model Category {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  articles Article[]
}

// อัพเดท Article Model
model Article {
  id         Int      @id @default(autoincrement())
  title      String
  content    String
  published  Boolean  @default(false)
  authorId   Int
  categoryId Int?     // Optional ก่อน เพื่อไม่ให้ Article เก่า error
  createdAt  DateTime @default(now())

  author     User     @relation(fields: [authorId], references: [id])
  category   Category? @relation(fields: [categoryId], references: [id])
}
```

**การสร้าง Migration ที่ปลอดภัย:**

```bash
# Step 1: สร้าง Category table ก่อน
npx prisma migrate dev --name add_category_table

# Step 2: เพิ่ม categoryId เป็น optional
npx prisma migrate dev --name add_category_relation

# Step 3: Seed ข้อมูล Category
# Step 4: Update Article ที่มีอยู่ให้มี categoryId
```

---

## 🛠️ Best Practices

### 📝 การตั้งชื่อ Migration

```bash
# ✅ ชื่อที่ดี - อธิบายการเปลี่ยนแปลงชัดเจน
npx prisma migrate dev --name add_user_password_field
npx prisma migrate dev --name create_article_category_relation
npx prisma migrate dev --name add_user_profile_table
npx prisma migrate dev --name update_user_email_unique_constraint
npx prisma migrate dev --name drop_unused_user_metadata_column

# ❌ ชื่อที่ไม่ดี - ไม่บอกว่าเปลี่ยนอะไร
npx prisma migrate dev --name update
npx prisma migrate dev --name fix
npx prisma migrate dev --name temp
npx prisma migrate dev --name version2
```

### 🔄 Workflow ที่แนะนำ

```mermaid
graph TD
    A[🚀 เริ่มโปรเจค] --> B{มี Migration อยู่แล้ว?}

    B -->|ไม่มี| C[💡 ใช้ db push สำหรับ prototype]
    B -->|มีแล้ว| D[⚡ ใช้ migrate dev เท่านั้น]

    C --> E[🧪 ทดลอง Schema หลายรอบ]
    E --> F{พอใจ Schema แล้ว?}
    F -->|ไม่| C
    F -->|ใช่| G[📝 สร้าง Migration แรก]

    G --> D
    D --> H[🔍 Review Migration File]
    H --> I[✅ Test ใน Development]
    I --> J[🚀 Deploy ด้วย migrate deploy]

    style C fill:#fff3e0
    style D fill:#e8f5e8
    style J fill:#fce4ec
```

### 🎯 Commands Cheat Sheet

| สถานการณ์           | คำสั่ง                             | เมื่อไหร่ใช้      | ระดับความปลอดภัย |
| ------------------- | ---------------------------------- | ----------------- | ---------------- |
| **Prototype**       | `prisma db push`                   | เฟสพัฒนาต้นแบบ    | ⚠️ ระวัง         |
| **Development**     | `prisma migrate dev`               | พัฒนาปกติ         | ✅ ปลอดภัย       |
| **Production**      | `prisma migrate deploy`            | Deploy จริง       | ✅ ปลอดภัย       |
| **Reset DB**        | `prisma migrate reset`             | เริ่มใหม่         | ❌ อันตราย       |
| **สร้างอย่างเดียว** | `prisma migrate dev --create-only` | ต้องการแก้ manual | ✅ ควบคุมได้     |
| **ดู Status**       | `prisma migrate status`            | ตรวจสอบสถานะ      | ✅ ปลอดภัย       |

### 🔒 Security Best Practices

**1. การ Backup ก่อน Production Deploy**

```bash
# สร้าง backup ก่อน deploy
pg_dump myapp_production > backup_$(date +%Y%m%d_%H%M%S).sql

# Deploy migration
npx prisma migrate deploy

# หากมีปัญหา restore จาก backup
# psql myapp_production < backup_20250115_120000.sql
```

**2. การทดสอบ Migration**

```bash
# 1. ทดสอบใน Development
npx prisma migrate dev

# 2. ทดสอบใน Staging
npx prisma migrate deploy

# 3. ตรวจสอบ Status
npx prisma migrate status

# 4. Deploy ใน Production
npx prisma migrate deploy
```

---

## 🆚 เปรียบเทียบ: แบบเก่า vs แบบใหม่ 2025

### 🚀 อัพเดทสำคัญใน Prisma 5.x (2025)

| ฟีเจอร์               | แบบเก่า (Prisma 4.x)    | แบบใหม่ (Prisma 5.x)        | ผลกระทบ              |
| --------------------- | ----------------------- | --------------------------- | -------------------- |
| **JSON Support**      | จำกัด, ไม่มี validation | ✅ Validation + Type safety | เขียนโค้ดปลอดภัยขึ้น |
| **Performance**       | ดี                      | ✅ เร็วขึ้น 20-40%          | Query เร็วขึ้นเยอะ   |
| **Type Safety**       | ดี                      | ✅ Strict mode + Enhanced   | Error น้อยลง         |
| **Migration Preview** | ไม่มี                   | ✅ `--preview`, `--dry-run` | ปลอดภัยขึ้น          |
| **Edge Runtime**      | ไม่รองรับ               | ✅ Full support             | Deploy Vercel ได้    |

### 📱 Next.js Integration

#### **แบบเก่า (Next.js 13-14):**

```typescript
// pages/api/users.ts - Pages Router
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  } finally {
    await prisma.$disconnect(); // ต้อง disconnect เอง
  }
}
```

#### **แบบใหม่ (Next.js 15.3.2):**

```typescript
// app/api/users/route.ts - App Router
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        _count: {
          articles: true,
        },
      },
    });

    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
  // ไม่ต้อง disconnect - Singleton pattern จัดการให้
}

// lib/prisma.ts - Singleton Pattern (ใหม่!)
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // Enhanced logging
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### 🌟 ฟีเจอร์ใหม่ 2025

#### **1. Prisma Accelerate Integration**

```typescript
// ✨ ใหม่: Edge Runtime + Connection Pooling
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

// Query จะเร็วขึ้นมากบน Edge Runtime
export async function getUsers() {
  return await prisma.user.findMany({
    cacheStrategy: { ttl: 60 }, // Cache 60 วินาที
  });
}
```

#### **2. Improved Migration Commands**

```bash
# ✨ ใหม่: ดู Migration ก่อนรัน
npx prisma migrate dev --preview --name add_user_preferences

# ✨ ใหม่: Dry run (จำลองการรัน)
npx prisma migrate deploy --dry-run

# ✨ ใหม่: Interactive Migration
npx prisma migrate dev --interactive

# ✨ ใหม่: Migration diff
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-schema-datamodel prisma/schema-new.prisma
```

#### **3. Enhanced Seeding**

```typescript
// prisma/seed.ts - Type-safe + Performance
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Seeding database...");

  // ✨ ใหม่: Batch operations ที่เร็วขึ้น
  const users = await prisma.user.createMany({
    data: Array.from({ length: 1000 }, (_, i) => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      username: `user${i}`, // ✨ Guaranteed unique
    })),
    skipDuplicates: true, // ข้าม duplicate แทนที่จะ error
  });

  console.log(`✅ Created ${users.count} users`);

  // ✨ ใหม่: Transaction ที่ปลอดภัยขึ้น
  await prisma.$transaction(async (tx) => {
    const userIds = await tx.user.findMany({
      select: { id: true },
      take: 100,
    });

    const articles = userIds.map((user) => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      authorId: user.id,
      published: faker.datatype.boolean(),
    }));

    await tx.article.createMany({
      data: articles,
    });
  });

  console.log("🎉 Seeding completed!");
}

seed()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 🛠️ Setup แนะนำสำหรับ 2025

#### **package.json**

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:migrate:reset": "prisma migrate reset",
    "db:migrate:status": "prisma migrate status",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "db:backup": "pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

#### **prisma/schema.prisma (2025 Best Practices)**

```prisma
generator client {
  provider = "prisma-client-js"
  // ✨ ใหม่: Enhanced performance
  engineType = "binary"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
  // ✨ ใหม่: Output customization
  output = "../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // ✨ ใหม่: Direct connection for migrations
  directUrl = env("DIRECT_URL")
}

model User {
  id        String   @id @default(cuid()) // ✨ ใช้ cuid แทน autoincrement
  email     String   @unique
  username  String   @unique // ✨ เพิ่ม username
  name      String?
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // ✨ ใหม่: JSON field with validation
  preferences Json?    @db.JsonB
  metadata    Json?    @db.JsonB

  // Relations
  articles  Article[]
  comments  Comment[]

  @@map("users") // ✨ Table naming convention
}

model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique // ✨ SEO friendly
  content     String
  excerpt     String?  // ✨ สำหรับ preview
  published   Boolean  @default(false)
  publishedAt DateTime?
  authorId    String
  categoryId  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // ✨ ใหม่: Full-text search
  searchVector String? // สำหรับ PostgreSQL full-text search

  // Relations
  author    User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  category  Category? @relation(fields: [categoryId], references: [id])
  comments  Comment[]
  tags      ArticleTag[]

  @@map("articles")
  // ✨ ใหม่: Composite indexes
  @@index([published, publishedAt])
  @@index([authorId, published])
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  color       String?   // ✨ UI customization
  createdAt   DateTime  @default(now())

  articles    Article[]

  @@map("categories")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  authorId  String
  articleId String
  parentId  String?  // ✨ สำหรับ nested comments
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  author   User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  article  Article   @relation(fields: [articleId], references: [id], onDelete: Cascade)
  parent   Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies  Comment[] @relation("CommentReplies")

  @@map("comments")
}

model Tag {
  id       String       @id @default(cuid())
  name     String       @unique
  color    String?
  articles ArticleTag[]

  @@map("tags")
}

// ✨ ใหม่: Many-to-many relation table
model ArticleTag {
  articleId String
  tagId     String

  article Article @relation(fields: [articleId], references: [id], onDelete: Cascade)
  tag     Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([articleId, tagId])
  @@map("article_tags")
}
```

---

## 🚨 Troubleshooting

### ปัญหาที่พบบ่อยและการแก้ไข

#### **1. Migration Failed**

```bash
Error: P3018 A migration failed to apply.
```

**สาเหตุและการแก้ไข:**

```bash
# ดู status ก่อน
npx prisma migrate status

# ถ้า migration ติดค้าง ให้ mark เป็น applied
npx prisma migrate resolve --applied 20250115120000_failed_migration

# หรือ rollback และทำใหม่
npx prisma migrate reset
```

#### **2. Schema Drift**

```bash
Error: Database schema is not in sync with migration history.
```

**การแก้ไข:**

```bash
# ตรวจสอบความแตกต่าง
npx prisma db push --accept-data-loss

# หรือสร้าง migration ใหม่
npx prisma migrate dev --name fix_schema_drift
```

#### **3. Seed ไม่ทำงาน**

```bash
# เช็คว่ามี script ใน package.json หรือไม่
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}

# รัน seed แยก
npx prisma db seed
```

---

## 📚 เอกสารอ้างอิง

- [Prisma Official Docs](https://www.prisma.io/docs)
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Migration Best Practices](https://www.prisma.io/docs/guides/migrate)
- [Prisma Accelerate](https://www.prisma.io/docs/accelerate)

---

## 🎯 สรุป

### ✅ สิ่งที่ควรจำ

1. **ใช้ `db push` เฉพาะตอน prototype** - เร็วแต่อันตราย
2. **สร้าง migration เมื่อพร้อม production** - ปลอดภัยและมี version control
3. **ใช้ `migrate dev` ใน development** - มี seeding อัตโนมัติ
4. **ใช้ `migrate deploy` ใน production** - ไม่มี seeding, ปลอดภัย
5. **Backup ก่อน migrate ใน production เสมอ!** - ป้องกันข้อมูลหาย

### 🚀 Workflow 2025 ที่แนะนำ

```mermaid
graph TD
    A[💡 Idea ใหม่] --> B[🧪 Prototype ด้วย db push]
    B --> C[✅ Schema ถูกต้อง]
    C --> D[📝 สร้าง Migration]
    D --> E[🔍 Review Migration File]
    E --> F[✅ Test ใน Dev]
    F --> G[🚀 Deploy ไป Staging]
    G --> H[✅ Test ใน Staging]
    H --> I[📦 Backup Production]
    I --> J[🎯 Deploy ไป Production]
    J --> K[🎉 เสร็จสิ้น!]

    style A fill:#e3f2fd
    style D fill:#e8f5e8
    style I fill:#fff3e0
    style K fill:#e8f5e8
```

> 💡 **Pro Tip 2025**: ใช้ GitHub Actions หรือ CI/CD pipeline ที่รัน migration test, backup, และ rollback plan อัตโนมัติก่อน deploy จริง

### 🎖️ สิ่งที่เปลี่ยนแปลงจากคลิป

1. **Prisma 5.x** - Performance ดีขึ้น, Type safety แข็งแกร่งขึ้น
2. **Next.js 15.3.2** - App Router, Singleton pattern สำหรับ Prisma Client
3. **Edge Runtime Support** - Deploy ไป Vercel ได้แล้ว
4. **Enhanced Migration Commands** - `--preview`, `--dry-run`, `--interactive`
5. **Better JSON Support** - Validation และ Type safety
6. **Improved Seeding** - Batch operations และ Transaction ที่ปลอดภัยขึ้น

**การอัพเดทจากเวอร์ชันเก่า:**

```bash
# อัพเดท Prisma
npm install prisma@latest @prisma/client@latest

# Re-generate client
npx prisma generate

# ตรวจสอบ schema compatibility
npx prisma validate
```
