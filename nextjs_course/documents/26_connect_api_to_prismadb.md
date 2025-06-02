# เชื่อมต่อ API กับ Prisma Database

## Overview

ในตอนนี้เราจะทำการปรับปรุงและเชื่อมต่อ API ของเราเข้ากับ Prisma Database เพื่อให้สามารถจัดการข้อมูลจริงแทนการใช้ mock data

## 📋 สิ่งที่จะได้เรียนรู้

- สร้างไฟล์ DB เพื่อจัดการ Prisma instance
- ปรับปรุง API ให้ใช้งานกับฐานข้อมูลจริง
- แยก API สำหรับ Admin และ User ทั่วไป
- สร้าง Type-safe API endpoints

## 🗂️ โครงสร้างที่จะสร้างใหม่

```
📁 src/
├── 📁 lib/
│   └── 📁 shared/
│       └── 📄 db.ts        # Prisma instance
├── 📁 app/
│   └── 📁 api/
│       ├── 📁 articles/
│       │   ├── 📄 route.ts  # Public API (Read only)
│       │   ├── 📁 [id]/
│       │   │   └── 📄 route.ts
│       │   └── 📁 admin/
│       │       └── 📄 route.ts  # Admin API (CRUD)
│       └── 📁 announcements/
│           ├── 📄 route.ts
│           └── 📁 [id]/
│               └── 📄 route.ts
```

## 1. สร้างไฟล์ DB สำหรับจัดการ Prisma

### 📄 `src/lib/shared/db.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export default prisma;
```

### 🔍 อธิบายการตั้งค่า Log

- **Development Mode**: แสดง query, error, และ warning เพื่อช่วยในการ debug
- **Production Mode**: แสดงเฉพาะ error เพื่อประหยัด performance

## 2. ปรับปรุง Articles API

### 📄 `src/app/api/articles/route.ts` (Public API)

```typescript
import db from "@/lib/shared/db";

// GET: ดึงรายการบทความทั้งหมด (สำหรับหน้าแรก)
export async function GET() {
  const articles = await db.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return Response.json(articles);
}

// Type definition สำหรับ frontend
export type ArticleItem = Awaited<ReturnType<typeof GET>>["articles"][number];
```

### 📄 `src/app/api/articles/[id]/route.ts`

```typescript
import db from "@/lib/shared/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const article = await db.article.findUnique({
    where: { id: Number(params.id) },
  });

  if (!article) {
    throw new Error("Article not found");
  }

  return Response.json(article);
}

export type ArticleDetail = NonNullable<
  Awaited<ReturnType<typeof GET>>["article"]
>;
```

### 🔑 เทคนิคการ Select เฉพาะ Field ที่ต้องการ

```typescript
// ❌ ไม่ดี - ดึงข้อมูลทั้งหมด
const articles = await db.article.findMany();

// ✅ ดี - ดึงเฉพาะที่ต้องใช้
const articles = await db.article.findMany({
  select: {
    id: true,
    title: true,
    excerpt: true,
    image: true,
  },
});
```

**เหตุผล**: ลด bandwidth และปรับปรุง performance

## 3. สร้าง Admin API สำหรับ CRUD Operations

### 📄 `src/app/api/articles/admin/route.ts`

```typescript
import db from "@/lib/shared/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

// Validation schemas
const addValidator = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
});

const updateValidator = addValidator.partial();

// CREATE: เพิ่มบทความใหม่
export async function POST(request: Request) {
  const input = addValidator.parse(await request.json());

  const article = await db.article.create({
    data: {
      ...input,
      userId: 1, // TODO: ใช้ user ID จริงจากระบบ authentication
      image: "https://example.com/default-image.jpg", // TODO: ใช้ระบบ upload รูปภาพ
      slug: slugify(input.title),
    },
  });

  revalidatePath("/articles");
  return Response.json(article);
}

// UPDATE: แก้ไขบทความ
export async function PUT(request: Request) {
  const { id, ...input } = updateValidator
    .extend({
      id: z.number(),
    })
    .parse(await request.json());

  const article = await db.article.update({
    where: { id },
    data: {
      ...input,
      userId: 1, // TODO: ใช้ user ID จริง
      image: "https://example.com/default-image.jpg", // TODO: ระบบ upload
      slug: input.title ? slugify(input.title) : undefined,
    },
  });

  // Revalidate both list and detail pages
  revalidatePath("/articles");
  revalidatePath(`/articles/${id}`);

  return Response.json(article);
}

// DELETE: ลบบทความ
export async function DELETE(request: Request) {
  const { id } = z.object({ id: z.number() }).parse(await request.json());

  const article = await db.article.delete({
    where: { id },
  });

  revalidatePath("/articles");
  revalidatePath(`/articles/${id}`);

  return Response.json(article);
}

// Type definitions
export type AddArticleInput = z.infer<typeof addValidator>;
export type UpdateArticleInput = z.infer<typeof updateValidator>;
```

### 🔐 การแยก API ระหว่าง Public และ Admin

| API Type   | Endpoints                                                                               | Permissions       |
| ---------- | --------------------------------------------------------------------------------------- | ----------------- |
| **Public** | `GET /api/articles`<br>`GET /api/articles/[id]`                                         | อ่านได้อย่างเดียว |
| **Admin**  | `POST /api/articles/admin`<br>`PUT /api/articles/admin`<br>`DELETE /api/articles/admin` | สร้าง แก้ไข ลบ    |

## 4. ปรับปรุง Announcements API

### 📄 `src/app/api/announcements/route.ts`

```typescript
import db from "@/lib/shared/db";

export async function GET() {
  const announcements = await db.announcement.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(announcements);
}

export type AnnouncementItem = Awaited<
  ReturnType<typeof GET>
>["announcements"][number];
```

### 📄 `src/app/api/announcements/[id]/route.ts`

```typescript
import db from "@/lib/shared/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const announcement = await db.announcement.findUnique({
    where: { id: Number(params.id) },
  });

  if (!announcement) {
    throw new Error("Announcement not found");
  }

  return Response.json(announcement);
}

export type AnnouncementDetail = NonNullable<
  Awaited<ReturnType<typeof GET>>["announcement"]
>;
```

## 5. Type Safety Strategy - Single Source of Truth

### 🎯 แนวคิด: API เป็น Single Source of Truth

แทนที่จะสร้าง type definitions หลายที่ เราใช้ Return Type จาก API functions เป็น source ของข้อมูล

```typescript
// ❌ ไม่ดี - มี type definitions หลายที่
// types/article.ts
export interface Article {
  id: number;
  title: string;
  // ...
}

// api/articles/route.ts
export async function GET() {
  // return different structure
}

// ✅ ดี - API เป็น source เดียว
// api/articles/route.ts
export async function GET() {
  const articles = await db.article.findMany({
    select: { id: true, title: true },
  });
  return Response.json(articles);
}

export type ArticleItem = Awaited<ReturnType<typeof GET>>["articles"][number];
```

### 🔧 การสร้าง Type จาก API Response

```typescript
// วิธีการสร้าง type จาก function return
export type ArticleItem = Awaited<ReturnType<typeof findAllArticles>>[number];
export type ArticleDetail = NonNullable<
  Awaited<ReturnType<typeof findArticleById>>
>;

// สำหรับ input validation
export type AddArticleInput = Parameters<typeof addArticle>[0];
export type UpdateArticleInput = Parameters<typeof updateArticle>[1];
```

## 6. Prisma Client และ Development vs Production

### 🤔 ทำไม Prisma ถึงติดตั้งเป็น devDependency?

```bash
npm install -D prisma
npm install @prisma/client
```

### 📊 การทำงานของ Prisma

```mermaid
graph LR
        A[prisma schema] --> B[prisma generate]
        B --> C[@prisma/client]
        C --> D[Production Code]

        E[Development] --> F[prisma db push]
        F --> G[Generate Client]

        H[Production] --> I[prisma migrate deploy]
        I --> J[Generate Client]
```

### 🔄 Prisma Workflow

1. **Development**:

   ```bash
   npm run prisma db push
   # หรือ
   npm run prisma migrate dev
   ```

2. **Production Deployment**:

   ```bash
   npm run prisma migrate deploy
   ```

3. **ทั้งสอง environment จะ generate `@prisma/client` ใน `node_modules`**

### 💡 เหตุผลที่ใช้ devDependency

- **Prisma CLI** ใช้เฉพาะตอน development และ CI/CD
- **@prisma/client** ถูก generate และใช้ใน production
- ทำให้ production bundle เบาขึ้น

## 7. การจัดการ Error และ Validation

### 🛡️ Error Handling

```typescript
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = await db.article.findUnique({
      where: { id: Number(params.id) },
    });

    if (!article) {
      return Response.json({ error: "Article not found" }, { status: 404 });
    }

    return Response.json(article);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

## 8. การใช้ revalidatePath

### 🔄 Cache Invalidation

```typescript
import { revalidatePath } from "next/cache";

// หลังจาก CREATE/UPDATE/DELETE
revalidatePath("/articles"); // รายการบทความ
revalidatePath(`/articles/${id}`); // บทความแต่ละเรื่อง
```

**จุดประสงค์**: บังคับให้ Next.js สร้าง page ใหม่เมื่อข้อมูลเปลี่ยน

## ✅ สิ่งที่ได้ปรับปรุงจากเดิม

### 🔄 การเปลี่ยนแปลงหลัก

1. **เปลี่ยนจาก Mock Data เป็น Database**

   - ใช้ Prisma เชื่อมต่อฐานข้อมูลจริง
   - Query ข้อมูลแบบ type-safe

2. **แยก API Architecture**

   - Public API: อ่านอย่างเดียว
   - Admin API: CRUD operations

3. **Type Safety Improvements**

   - API เป็น Single Source of Truth
   - ใช้ ReturnType และ Parameters

4. **Performance Optimization**

   - Select เฉพาะ fields ที่ต้องการ
   - Proper indexing และ ordering

5. **Better Error Handling**
   - Validation ด้วย Zod
   - Proper HTTP status codes

### 📈 ประโยชน์ที่ได้รับ

- **Type Safety**: ป้องกัน runtime errors
- **Performance**: ลด bandwidth ด้วยการ select เฉพาะที่ต้องการ
- **Maintainability**: Code ที่ clean และ organized
- **Scalability**: พร้อมสำหรับการขยายระบบ

## 🚀 Next Steps

1. เพิ่มระบบ Authentication
2. ระบบ Upload รูปภาพ
3. Pagination สำหรับรายการข้อมูล
4. Rate limiting และ Security measures
