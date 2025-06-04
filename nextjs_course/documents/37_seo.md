# Next.js SEO Implementation Guide 🚀

## Overview

การทำ SEO (Search Engine Optimization) ใน Next.js เป็นสิ่งสำคัญที่จะทำให้เว็บไซต์ของเราสามารถถูกค้นพบบน Search Engine อย่าง Google ได้ง่ายขึ้น ในคู่มือนี้จะแสดงวิธีการ config ค่าต่างๆ เพื่อให้ได้ผลลัพธ์ SEO ที่ดี

## 🎯 สิ่งที่เราจะได้เรียนรู้

- การตั้งค่า Meta Data สำหรับ Title และ Description
- การใช้งาน Dynamic Meta Data Generation
- การปรับ URL Structure ให้เป็น SEO-friendly
- การสร้าง robots.txt
- การสร้าง sitemap.xml
- การทดสอบ Social Media Preview

---

## 1. การตั้งค่า Meta Data พื้นฐาน 📝

### ปัญหาเริ่มต้น

เมื่อเราสร้าง Next.js project ใหม่ หน้าเว็บจะแสดง title เป็น "Create Next App" ซึ่งไม่ได้สื่อความหมายอะไรเลย

### วิธีแก้ไข: ปรับ Layout Meta Data

**ไฟล์: `app/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdSense Management", // เปลี่ยนจาก "Create Next App"
  description: "หน้าจอที่เกี่ยวกับเนื้อหาของ article ทั้งหมด",
  icons: {
    icon: "/favicon.ico",
  },
};
```

### ผลลัพธ์

- Title บน browser tab จะเปลี่ยนเป็น "AdSense Management"
- Search Engine จะเห็น description ที่มีความหมาย
- Favicon จะแสดงไอคอนที่เราต้องการ

---

## 2. Dynamic Meta Data Generation 🔄

สำหรับหน้าที่มีเนื้อหาแบบ dynamic (เช่น หน้า article detail) เราต้องสร้าง meta data แบบ dynamic

### ตัวอย่าง: หน้า Article Detail

**ไฟล์: `app/article/[id]/page.tsx`**

```typescript
import type { Metadata } from "next";
import { findById } from "@/features/article/api";

// ฟังก์ชันสำหรับ generate meta data แบบ dynamic
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = params;
  const article = await findById(+id);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      image: getImagePath(article.image), // สำหรับ social media preview
    },
  };
}
```

### 🎨 Visual Representation

```
┌─────────────────────────────────────┐
│ Article Detail Page                 │
├─────────────────────────────────────┤
│ <title>Dynamic Article Title</title>│
│ <meta name="description"            │
│       content="Article excerpt..." />│
│ <meta property="og:image"           │
│       content="/images/article.jpg"/>│
└─────────────────────────────────────┘
```

---

## 3. SEO-Friendly URL Structure 🔗

### ปัญหาเดิม

URL แบบ `/article/123` ไม่ได้บอกอะไรเกี่ยวกับเนื้อหา

### วิธีแก้ไข: ใช้ Slug แทน ID

**1. เพิ่ม API สำหรับค้นหาด้วย slug**

```typescript
// features/article/api.ts
export const findBySlug = async (slug: string) => {
  return await prisma.article.findFirst({
    where: { slug },
  });
};
```

**2. ปรับ Route Structure**

```
เดิม: /article/[id]
ใหม่: /article/[slug]
```

**3. ปรับ Component ให้ใช้ slug**

```typescript
// app/article/[slug]/page.tsx
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await findBySlug(params.slug);
  // ...
}
```

### ผลลัพธ์

```
Before: /article/123
After:  /article/how-to-improve-website-seo
```

---

## 4. การสร้าง robots.txt 🤖

robots.txt จะบอก Search Engine ว่าสามารถเข้าถึงหน้าไหนได้บ้าง

**ไฟล์: `app/robots.ts`**

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // อนุญาตทุก bot
      allow: "/", // เข้าได้ทุกหน้า
      disallow: "/private/", // ห้ามเข้าหน้า private
    },
    sitemap: `${process.env.NEXT_APP_URL}/sitemap.xml`,
  };
}
```

### 📋 ผลลัพธ์ที่ได้

เมื่อเข้า `/robots.txt` จะได้:

```
User-agent: *
Allow: /
Disallow: /private/
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 5. การสร้าง Sitemap.xml 🗺️

Sitemap เป็นแผนที่ที่บอก Search Engine ว่าเว็บเรามีหน้าอะไรบ้าง

**ไฟล์: `app/sitemap.ts`**

```typescript
import { MetadataRoute } from "next";
import * as articleAPI from "@/features/article/api";
import * as announcementAPI from "@/features/announcement/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_APP_URL!;

  const sitemap: MetadataRoute.Sitemap = [
    // Home page
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // เพิ่ม articles
  const articles = await articleAPI.findAll();
  articles.forEach((article) => {
    sitemap.push({
      url: `${baseURL}/article/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // เพิ่ม announcements
  const announcements = await announcementAPI.findAll();
  announcements.forEach((announcement) => {
    sitemap.push({
      url: `${baseURL}/announcement/${announcement.id}`,
      lastModified: announcement.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return sitemap;
}
```

### 🎯 ความหมายของ Parameters

- **priority**: ความสำคัญ (0.0 - 1.0)
- **changeFrequency**: ความถี่การเปลี่ยนแปลง
  - `always` - เปลี่ยนทุกครั้งที่เข้า
  - `hourly` - ทุกชั่วโมง
  - `daily` - ทุกวัน
  - `weekly` - ทุกสัปดาห์
  - `monthly` - ทุกเดือน
  - `yearly` - ทุกปี
  - `never` - ไม่เปลี่ยน

---

## 6. การทดสอบ Social Media Preview 📱

### ใช้ Tunnel สำหรับทดสอบ

```bash
# ติดตั้ง tunnel
npx tunnelmole 3000
```

### ทดสอบกับ Facebook Debugger

1. ไปที่ [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. ใส่ URL ที่ได้จาก tunnel
3. กด "Debug" เพื่อดู preview

### ตัวอย่างผลลัพธ์

```
┌─────────────────────────────────────┐
│ 📰 Article Title                    │
├─────────────────────────────────────┤
│ 🖼️  [Article Image]                 │
│                                     │
│ 📝 Article excerpt text here...     │
│                                     │
│ 🔗 yourdomain.com                   │
└─────────────────────────────────────┘
```

---

## 7. Environment Variables ⚙️

**ไฟล์: `.env.local`**

```env
NEXT_APP_URL=http://localhost:3000
```

**ไฟล์: `.env.example`**

```env
NEXT_APP_URL=http://localhost:3000
```

---

## 8. การปรับปรุงเพิ่มเติม 🔧

### เพิ่ม updatedAt ใน API Response

```typescript
// features/article/api.ts
export const findAll = async () => {
  return await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image: true,
      createdAt: true,
      updatedAt: true, // ✅ เพิ่มส่วนนี้
    },
  });
};
```

### ปรับ Article Component ให้ใช้ slug

```typescript
// components/ArticleItem.tsx
export default function ArticleItem({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`}>
      {" "}
      {/* ✅ เปลี่ยนจาก id เป็น slug */}
      {/* article content */}
    </Link>
  );
}
```

---

## 🚀 การ Build และ Deploy

```bash
# Lint และ Fix
npm run lint
npm run lint -- --fix

# Build project
npm run build
```

### ผลลัพธ์การ Build

หลังจาก build สำเร็จ จะได้ไฟล์:

- `robots.txt` - ที่ root URL
- `sitemap.xml` - แผนที่เว็บไซต์

---

## 📊 Summary Checklist

- ✅ ตั้งค่า Meta Data พื้นฐานใน layout.tsx
- ✅ สร้าง Dynamic Meta Data สำหรับหน้า detail
- ✅ เปลี่ยน URL structure จาก ID เป็น slug
- ✅ สร้าง robots.txt
- ✅ สร้าง sitemap.xml
- ✅ ทดสอบ Social Media Preview
- ✅ ตั้งค่า Environment Variables
- ✅ Build project สำเร็จ

## 🎉 ผลลัพธ์สุดท้าย

หลังจากทำตามขั้นตอนทั้งหมด เว็บไซต์ของเราจะ:

1. มี SEO-friendly URLs
2. แสดง Meta Data ที่ถูกต้องใน Search Results
3. มี Social Media Preview ที่สวยงาม
4. มี robots.txt และ sitemap.xml สำหรับ Search Engines
5. พร้อมสำหรับการ index โดย Google และ Search Engines อื่นๆ

---

> 💡 **Pro Tip**: SEO เป็นกระบวนการต่อเนื่อง ควรติดตาม Google Search Console และปรับปรุงเนื้อหาอย่างสม่ำเสมอ
