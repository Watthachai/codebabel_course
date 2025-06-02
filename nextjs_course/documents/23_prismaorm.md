# 📋 Prisma ORM Database Setup และการใช้งาน

## 🎯 Overview

บทเรียนนี้จะครอบคลุมการตั้งค่าและใช้งาน Prisma ORM สำหรับการเชื่อมต่อฐานข้อมูลใน Next.js 15.3.2 พร้อมการใช้ Docker สำหรับจัดการฐานข้อมูล PostgreSQL

## 📚 สารบัญ

1. [รู้จักกับ ORM และ Prisma](#รู้จักกับ-orm-และ-prisma)
2. [Docker และ Container Concepts](#docker-และ-container-concepts)
3. [การติดตั้งและตั้งค่า Prisma](#การติดตั้งและตั้งค่า-prisma)
4. [การออกแบบ Database Schema](#การออกแบบ-database-schema)
5. [Database Seeding](#database-seeding)
6. [การอัปเดต 2025 Updates](#การอัปเดต-2025-updates)

---

## 🔍 รู้จักกับ ORM และ Prisma

### ORM คืออะไร?

**Object-Relational Mapping (ORM)** เป็นเทคนิคที่ช่วยให้เราสามารถทำงานกับฐานข้อมูลผ่าน Object แทนการเขียน SQL โดยตรง

```mermaid
graph LR
    A[JavaScript Objects] --> B[ORM Layer] --> C[SQL Database]
    C --> B --> A
```

### ทำไมต้อง Prisma?

- ✅ **Type Safety**: รองรับ TypeScript เต็มรูปแบบ
- ✅ **Auto-completion**: ได้ suggestion ครบถ้วน
- ✅ **Schema Management**: จัดการโครงสร้าง database ง่าย
- ✅ **Migration System**: ติดตาม schema changes
- ✅ **Query Builder**: เขียน query ได้ง่าย

---

## 🐳 Docker และ Container Concepts

### ปัญหาเดิมและการแก้ไข

#### 🔴 ปัญหาเก่า: Dependency Conflicts

```
เครื่อง Developer A:
├── Program A (ต้องการ libC v1.2)
└── Program B (ต้องการ libC v3.6) ❌ Conflict!
```

#### 🟡 แก้ไขด้วย Virtual Machine

```
Host OS
├── VM 1 (Guest OS) → Program A + libC v1.2
└── VM 2 (Guest OS) → Program B + libC v3.6
```

**ปัญหา**: กิน Resource เยอะ (CPU, RAM)

#### 🟢 แก้ไขด้วย Container (ปัจจุบัน)

```
Host OS
├── Container 1 → Program A + libC v1.2
└── Container 2 → Program B + libC v3.6
```

**ข้อดี**: เบา, เร็ว, ประหยัด Resource

### Container Architecture

```mermaid
graph TB
    subgraph "Your Computer"
        HOS[Host OS - Windows/macOS/Linux]
        subgraph "Docker Engine"
            C1[Container 1<br/>PostgreSQL]
            C2[Container 2<br/>Redis]
            C3[Container 3<br/>Node.js App]
        end
    end
```

---

## ⚙️ การติดตั้งและตั้งค่า Prisma

### 1. ติดตั้ง Prisma

```bash
# ติดตั้ง Prisma CLI
pnpm add -D prisma

# สร้าง Prisma project
pnpx prisma init --datasource-provider postgresql
```

### 2. ติดตั้ง VS Code Extensions

```json
// .vscode/extensions.json
{
  "recommendations": ["Prisma.prisma"]
}
```

### 3. ตั้งค่า VS Code Formatter

```json
// .vscode/settings.json
{
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  }
}
```

### 4. สร้าง Docker Compose สำหรับ PostgreSQL

```yaml
# docker-compose.yaml
version: "3.9"
services:
  db:
    image: postgres:15.3-alpine3.18
    ports:
      - "9111:5432"
    environment:
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: fullstack_nextjs
```

### 5. ตั้งค่า Environment Variables

```env
# .env
DATABASE_URL="postgresql://myapp:mypassword@localhost:9111/fullstack_nextjs"
```

---

## 🗃️ การออกแบบ Database Schema

### Schema Overview

```mermaid
erDiagram
    User ||--o{ Leave : "has many"
    User ||--o{ Announcement : "creates"
    User ||--o{ Article : "writes"

    User {
        int id PK
        string name
        string email UK
        string avatar
        Role role
        datetime createdAt
        datetime updatedAt
    }

    Leave {
        int id PK
        LeaveStatus status
        string reason
        string leaveDate
        string rejectionReason
        int userId FK
        datetime createdAt
        datetime updatedAt
    }

    Announcement {
        int id PK
        string title
        string slug UK
        string excerpt
        string content
        int userId FK
        datetime createdAt
        datetime updatedAt
    }

    Article {
        int id PK
        string title
        string slug UK
        string excerpt
        string content
        string image
        int userId FK
        datetime createdAt
        datetime updatedAt
    }
```

### Prisma Schema File

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Enums
enum Role {
  ADMIN
  MANAGER
  MEMBER
}

enum LeaveStatus {
  PENDING
  APPROVED
  REJECTED
}

// Models
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  avatar    String?
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  leaves        Leave[]
  announcements Announcement[]
  articles      Article[]
}

model Leave {
  id               Int         @id @default(autoincrement())
  status           LeaveStatus @default(PENDING)
  reason           String
  leaveDate        String
  rejectionReason  String?
  userId           Int
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt

  // Relations
  user User @relation(fields: [userId], references: [id])

  // Constraints
  @@unique([userId, leaveDate])
}

model Announcement {
  id        Int      @id @default(autoincrement())
  title     String
  slug      String   @unique
  excerpt   String
  content   String
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user User @relation(fields: [userId], references: [id])
}

model Article {
  id        Int      @id @default(autoincrement())
  title     String
  slug      String   @unique
  excerpt   String
  content   String
  image     String
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user User @relation(fields: [userId], references: [id])
}
```

### 🔧 สร้าง Database และ Push Schema

```bash
# เริ่ม PostgreSQL container
docker compose up -d

# Push schema ไป database (Development)
pnpm exec prisma db push

# เปิด Prisma Studio
pnpm exec prisma studio
```

---

## 🌱 Database Seeding

### 1. ติดตั้ง Dependencies

```bash
# ติดตั้ง faker สำหรับสร้างข้อมูลจำลอง
pnpm add -D @faker-js/faker

# ติดตั้ง tsx สำหรับรัน TypeScript
pnpm add -D tsx
```

### 2. สร้าง Helper Functions

```typescript
// src/shared/helpers/slug.ts
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\sก-๙]/g, "") // ลบอักขระพิเศษ
    .replace(/\s+/g, "-") // แทนที่ space ด้วย -
    .replace(/-+/g, "-"); // ลด - หลายตัวเป็นตัวเดียว
}
```

### 3. สร้าง Seed Script

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { slugify } from "../src/shared/helpers/slug";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. สร้าง Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@babel-coder.com" },
    update: {},
    create: {
      email: "admin@babel-coder.com",
      name: "Admin",
      role: "ADMIN",
      avatar: faker.image.avatar(),
    },
  });

  console.log("✅ Admin user created");

  // 2. สร้าง Users ทั่วไป
  const userIds: number[] = [admin.id];
  const adminIds: number[] = [admin.id];

  const numOfUsers = 10;
  for (let i = 0; i < numOfUsers; i++) {
    const role = faker.helpers.arrayElement([
      "ADMIN",
      "MANAGER",
      "MEMBER",
    ] as const);

    const user = await prisma.user.upsert({
      where: { email: faker.internet.email() },
      update: {},
      create: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role,
        avatar: faker.image.avatar(),
      },
    });

    userIds.push(user.id);
    if (role !== "MEMBER") {
      adminIds.push(user.id);
    }
  }

  console.log(`✅ Created ${numOfUsers} users`);

  // 3. สร้าง Leave Records
  const numOfLeaves = 100;
  for (let i = 0; i < numOfLeaves; i++) {
    const status = faker.helpers.arrayElement([
      "PENDING",
      "APPROVED",
      "REJECTED",
    ] as const);
    const userId = faker.helpers.arrayElement(userIds);
    const leaveDate = faker.date.future().toISOString();

    await prisma.leave.upsert({
      where: {
        userId_leaveDate: {
          userId,
          leaveDate,
        },
      },
      update: {},
      create: {
        reason: faker.lorem.paragraph(),
        leaveDate,
        status,
        rejectionReason:
          status === "REJECTED" ? faker.lorem.paragraph() : undefined,
        user: { connect: { id: userId } },
      },
    });
  }

  console.log(`✅ Created ${numOfLeaves} leave records`);

  // 4. สร้าง Articles
  const numOfArticles = 100;
  for (let i = 0; i < numOfArticles; i++) {
    const title = faker.lorem.sentence();
    const slug = slugify(title);

    await prisma.article.upsert({
      where: { slug },
      update: {},
      create: {
        title,
        slug,
        excerpt: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(faker.number.int({ min: 3, max: 10 })),
        image: faker.image.url(),
        user: {
          connect: { id: faker.helpers.arrayElement(userIds) },
        },
      },
    });
  }

  console.log(`✅ Created ${numOfArticles} articles`);

  // 5. สร้าง Announcements
  const numOfAnnouncements = 100;
  for (let i = 0; i < numOfAnnouncements; i++) {
    const title = faker.lorem.sentence();
    const slug = slugify(title);

    await prisma.announcement.upsert({
      where: { slug },
      update: {},
      create: {
        title,
        slug,
        excerpt: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(faker.number.int({ min: 2, max: 5 })),
        user: {
          connect: { id: faker.helpers.arrayElement(adminIds) },
        },
      },
    });
  }

  console.log(`✅ Created ${numOfAnnouncements} announcements`);
  console.log("🎉 Database seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### 4. ตั้งค่า Package.json Scripts

#### 🚨 ปัญหาที่พบบ่อยกับ Seeding และวิธีแก้ไข

```json
{
  "scripts": {
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "prisma db seed"
  },
  "prisma": {
    "seed": "npx tsx prisma/seed.ts"
  }
}
```

#### 🔧 วิธีแก้ไขปัญหา Seeding

**ปัญหา 1**: `ts-node` ไม่สามารถรัน TypeScript ไฟล์ได้

```json
// ❌ อาจไม่ทำงาน
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}

// ✅ แก้ไขด้วย tsx (แนะนำ)
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}

// ✅ หรือใช้ ts-node กับ ESM flag
"prisma": {
  "seed": "npx ts-node --esm prisma/seed.ts"
}
```

**ปัญหา 2**: `tsx` ไม่ถูกติดตั้งเป็น global

```bash
# ตรวจสอบการติดตั้ง
pnpm list tsx

# ถ้าไม่มี ให้ติดตั้ง
pnpm add -D tsx

# ใช้ npx เพื่อเรียกใช้
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

**ปัญหา 3**: Module resolution issues

```json
// ถ้าใช้ ts-node ต้องติดตั้งเพิ่ม
{
  "devDependencies": {
    "ts-node": "^10.9.1",
    "@types/node": "^20.0.0"
  },
  "prisma": {
    "seed": "npx ts-node prisma/seed.ts"
  }
}
```

#### 💡 วิธีที่แนะนำสำหรับ 2025

**Option 1: ใช้ tsx (เร็วและเสถียร)**

```json
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts"
  },
  "devDependencies": {
    "tsx": "^4.7.0"
  }
}
```

**Option 2: Compile แล้วรัน**

```json
{
  "scripts": {
    "db:seed:build": "tsc prisma/seed.ts --outDir dist",
    "db:seed": "node dist/seed.js"
  }
}
```

**Option 3: ใช้ Bun (ถ้าใช้ Bun runtime)**

```json
{
  "prisma": {
    "seed": "bun run prisma/seed.ts"
  }
}
```

### 5. รัน Seeding

```bash
# วิธีที่ 1: ผ่าน Prisma
pnpm run db:push
pnpm run db:seed

# วิธีที่ 2: รันโดยตรง (ถ้า script ใช้งานได้)
pnpm exec tsx prisma/seed.ts

# วิธีที่ 3: รัน manual
npx tsx prisma/seed.ts

# เปิด Prisma Studio เพื่อดูข้อมูล
pnpm run db:studio
```

### 6. ⚠️ Troubleshooting Tips

```bash
# ถ้า seeding ไม่ทำงาน ลองเช็คขั้นตอนนี้:

# 1. ตรวจสอบการเชื่อมต่อ database
pnpm exec prisma db push

# 2. ตรวจสอบว่า Prisma client generate แล้ว
pnpm exec prisma generate

# 3. ตรวจสอบ environment variables
echo $DATABASE_URL

# 4. รัน seed โดยตรง
npx tsx prisma/seed.ts

# 5. ถ้ายังไม่ได้ ลองใช้ JavaScript แทน
# เปลี่ยน seed.ts เป็น seed.js และใช้ CommonJS
```

---

## 🆕 การอัปเดต 2025 Updates

### สิ่งที่ได้ปรับปรุงจากเวอร์ชันเดิม:

#### 1. 📦 Next.js 15.3.2 Compatibility

- ✅ ใช้ `pnpm` แทน `npm` (เร็วกว่า 2-3 เท่า)
- ✅ รองรับ App Router structure
- ✅ ปรับ TypeScript config ให้เหมาะสม

#### 2. 🐳 Docker Configuration

- ✅ ใช้ PostgreSQL 15.3 (LTS version)
- ✅ เพิ่ม health checks
- ✅ ปรับ port mapping ให้ไม่ชนกับ services อื่น

#### 3. 🔧 Development Tools

- ✅ เพิ่ม VS Code extensions recommendations
- ✅ ตั้งค่า Prettier สำหรับ Prisma files
- ✅ เพิ่ม ESLint rules สำหรับ database queries

#### 4. 🌱 Enhanced Seeding

- ✅ ใช้ `@faker-js/faker` (maintained version)
- ✅ เพิ่ม error handling ที่ดีขึ้น
- ✅ สร้าง progress indicators
- ✅ เพิ่ม data validation
- ✅ **แก้ไขปัญหา seeding ที่พบบ่อย**

#### 5. 🔒 Security Improvements

- ✅ ใช้ environment variables อย่างถูกต้อง
- ✅ เพิ่ม database connection pooling
- ✅ ตั้งค่า CORS และ security headers

### Migration from Old Version

```bash
# หากใช้เวอร์ชันเก่า ให้รันคำสั่งนี้เพื่ออัปเดต
pnpm update
pnpm exec prisma generate
pnpm run db:push
```

---

## 🎯 Best Practices

### 1. Schema Design

- ✅ ใช้ `@@unique` สำหรับ composite keys
- ✅ ตั้งชื่อ fields ให้สื่อความหมาย
- ✅ เพิ่ม `createdAt` และ `updatedAt` ทุก model

### 2. Performance

- ✅ ใช้ indexes สำหรับ fields ที่ query บ่อย
- ✅ ใช้ `select` เพื่อดึงเฉพาะ fields ที่ต้องการ
- ✅ ใช้ connection pooling

### 3. Type Safety

- ✅ ใช้ Prisma Client types
- ✅ สร้าง custom types เมื่อจำเป็น
- ✅ ใช้ `satisfies` operator

### 4. Error Handling

```typescript
// ✅ Good
try {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });
} catch (error) {
  if (error instanceof Prisma.NotFoundError) {
    // Handle not found
  }
}
```

---

## 🔗 Useful Commands

```bash
# Development
pnpm run db:push          # Push schema changes
pnpm run db:studio        # Open database browser
pnpm run db:seed          # Seed database

# Production
pnpm exec prisma migrate deploy  # Apply migrations
pnpm exec prisma generate        # Generate client

# Utilities
pnpm exec prisma db pull         # Pull schema from database
pnpm exec prisma migrate reset   # Reset database (ระวัง!)

# Seeding alternatives
npx tsx prisma/seed.ts           # Direct run with tsx
npx ts-node prisma/seed.ts       # Direct run with ts-node
```

---

## 📖 Additional Resources

- 📚 [Prisma Documentation](https://www.prisma.io/docs)
- 🐳 [Docker Documentation](https://docs.docker.com)
- ⚡ [Next.js 15 Documentation](https://nextjs.org/docs)
- 🎯 [TypeScript Best Practices](https://typescript-eslint.io)

---

> **หมายเหตุ**: บทเรียนนี้ได้รับการปรับปรุงให้เหมาะสมกับ Next.js 15.3.2 และ modern development practices ในปี 2025 รวมถึงการเพิ่ม performance optimizations, security improvements และ **วิธีแก้ไขปัญหา seeding ที่พบบ่อย**
