# Styling Articles & Announcements with TailwindCSS and shadcn/ui

## 📋 บทนำ

ในบทเรียนนี้เราจะทำการจัดสไตล์หน้า Article และ Announcement ให้ดูสวยงามและใช้งานง่าย โดยใช้ TailwindCSS และ shadcn/ui components ซึ่งจะทำให้เว็บไซต์ของเรามีความโปรเฟสชันนัลมากขึ้น

## 🎯 สิ่งที่จะได้เรียนรู้

- การใช้งาน shadcn/ui components (Card, Separator)
- การสร้าง Responsive Grid Layout
- การ Optimize รูปภาพด้วย Next.js Image
- การใช้ lodash สำหรับ Text Truncation
- การแยก Components เพื่อ Reusability

## 🚀 การเริ่มต้น: Article List Styling

### 1. สร้าง Layout พื้นฐาน

เริ่มต้นด้วยการสร้างโครงสร้างพื้นฐานของหน้า Article List

```tsx
// components/ArticleList.tsx
<section>
  <h1 className="my-4 text-center text-4xl font-bold">All Articles</h1>

  {/* เพิ่ม Separator */}
  <Separator className="my-4" />

  {/* Grid Container */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
    {/* Article Items จะอยู่ตรงนี้ */}
  </div>
</section>
```

### 2. ติดตั้ง shadcn/ui Components

**Separator Component:**

```bash
npx shadcn@latest add separator
```

**Card Component:**

```bash
npx shadcn@latest add card
```

> 💡 **สิ่งที่เปลี่ยนไป (2025 Update):**
>
> - ใน Next.js 15.3.2 การติดตั้ง shadcn/ui ใช้ `npx shadcn@latest` แทน `npx shadcn-ui@latest`
> - Support TypeScript 5.0+ และ React 18+ ออกจากกล่อง

## 🎨 การสร้าง Article Card Component

### 3. สร้าง ArticleItem Component

เพื่อความ Clean และ Reusable เราจะแยกการ์ดออกมาเป็น Component แยก

```tsx
// components/ArticleItem.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { truncate } from "lodash";
import * as Type from "@/lib/types";

interface ArticleItemProps {
  article: Type.ArticleItem;
}

export default function ArticleItem({ article }: ArticleItemProps) {
  const { id, title, excerpt, image } = article;

  return (
    <Link href={`/articles/${id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-[200px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
          />
        </div>

        {/* Card Content */}
        <CardHeader>
          <CardTitle className="text-lg">
            {truncate(title, { length: 30 })}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600">{truncate(excerpt, { length: 100 })}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
```

### 4. การติดตั้งและใช้งาน lodash

**ติดตั้ง lodash:**

```bash
npm add lodash
npm add -D @types/lodash
```

> 📝 **เหตุผลที่ต้องติดตั้ง @types/lodash:**
> lodash เขียนด้วย JavaScript ล้วน ไม่มี TypeScript definitions มาให้
> เราต้องติดตั้ง type definitions แยกเพื่อให้ IDE แสดง IntelliSense ได้

## 🖼️ การ Configure Next.js Image สำหรับ Remote URLs

### 5. Configure next.config.mjs

เมื่อใช้รูปภาพจาก External URLs เราต้อง configure Next.js ให้รู้จัก domains เหล่านั้น

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
```

> ⚠️ **Security Note:**
> การเพิ่ม remote patterns ช่วยป้องกัน unauthorized image loading และ optimize การโหลดรูปภาพ

## 📱 Responsive Grid Layout

### 6. การสร้าง Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
  {articles.map((article) => (
    <ArticleItem key={article.id} article={article} />
  ))}
</div>
```

**Breakpoints Explanation:**

- `grid-cols-1`: Mobile (< 768px) - 1 column
- `md:grid-cols-2`: Tablet (768px+) - 2 columns
- `lg:grid-cols-3`: Desktop (1024px+) - 3 columns

```
📱 Mobile        📊 Tablet        🖥️ Desktop
┌─────────┐     ┌─────┬─────┐    ┌─────┬─────┬─────┐
│  Card   │     │Card │Card │    │Card │Card │Card │
├─────────┤     ├─────┼─────┤    ├─────┼─────┼─────┤
│  Card   │     │Card │Card │    │Card │Card │Card │
├─────────┤     └─────┴─────┘    └─────┴─────┴─────┘
│  Card   │
└─────────┘
```

## 🔧 Article Detail Page Styling

### 7. ArticleDetail Component

```tsx
// components/ArticleDetail.tsx
import Image from "next/image";
import * as Type from "@/lib/types";

interface ArticleDetailProps {
  article: Type.ArticleDetail;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const { title, image, content } = article;

  return (
    <article className="max-w-4xl mx-auto px-4">
      {/* Hero Image */}
      <div className="relative h-[500px] mb-8">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Title */}
      <h2 className="my-4 text-center text-4xl font-bold">{title}</h2>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <p className="my-4 text-xl leading-relaxed">{content}</p>
      </div>
    </article>
  );
}
```

## 📢 Announcement Components

### 8. สร้าง Announcement Components

เนื่องจาก Announcement ไม่มีรูปภาพ เราจะปรับแต่งจาก Article Components

**AnnouncementItem.tsx:**

```tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { truncate } from "lodash";
import * as Type from "@/lib/types";

interface AnnouncementItemProps {
  announcement: Type.AnnouncementItem;
}

export default function AnnouncementItem({
  announcement,
}: AnnouncementItemProps) {
  const { id, title, excerpt } = announcement;

  return (
    <Link href={`/announcements/${id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg">
            {truncate(title, { length: 30 })}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600">{truncate(excerpt, { length: 100 })}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
```

## 🔄 สิ่งที่เปลี่ยนไปจากเวอร์ชันเก่า

### การเปลี่ยนแปลงสำคัญ (2025 Update):

| หัวข้อ                  | แบบเก่า (ตามคลิป)          | แบบใหม่ (Next.js 15.3.2) |
| ----------------------- | -------------------------- | ------------------------ |
| **shadcn Installation** | `npx shadcn-ui@latest add` | `npx shadcn@latest add`  |
| **Image Optimization**  | `domains` config           | `remotePatterns` config  |
| **TypeScript Support**  | TypeScript 4.x             | TypeScript 5.0+          |
| **React Version**       | React 17/18                | React 18+ (Required)     |
| **App Router**          | Pages Router Compatible    | App Router Optimized     |

### ตัวอย่างการเปลี่ยนแปลง Config:

**แบบเก่า:**

```javascript
// next.config.js (เก่า)
module.exports = {
  images: {
    domains: ["loremflickr.com", "picsum.photos"],
  },
};
```

**แบบใหม่:**

```javascript
// next.config.mjs (ใหม่)
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
};
```

## 🎨 CSS Custom Properties & Advanced Styling

### 9. เพิ่ม Custom Animations

```css
/* globals.css */
.card-hover {
  @apply transition-all duration-300 ease-in-out;
}

.card-hover:hover {
  @apply transform scale-105 shadow-xl;
}
```

### 10. Dark Mode Support (Bonus)

```tsx
// หากต้องการเพิ่ม Dark Mode
<Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
  {/* Card Content */}
</Card>
```

## 📊 Performance Optimizations

### 11. Image Performance Best Practices

```tsx
// ใช้ priority สำหรับรูปภาพที่สำคัญ
<Image
  src={image}
  alt={title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  priority={index < 3} // โหลดรูป 3 อันแรกก่อน
/>
```

### 12. Code Splitting & Lazy Loading

```tsx
// ใช้ dynamic import สำหรับ components ที่ไม่จำเป็นต้องโหลดทันที
import dynamic from "next/dynamic";

const AnnouncementList = dynamic(() => import("./AnnouncementList"), {
  loading: () => <div>Loading announcements...</div>,
});
```

## 🔍 Testing & Debugging

### 13. การ Debug Common Issues

**ปัญหา: รูปภาพไม่แสดง**

```bash
# ตรวจสอบ next.config.mjs
# ตรวจสอบ remotePatterns
# ตรวจสอบ Network tab ใน DevTools
```

**ปัญหา: Layout ไม่ responsive**

```bash
# ตรวจสอบ breakpoints
# ใช้ DevTools responsive mode
# ทดสอบใน browser จริง
```

## 📝 สรุป

เราได้เรียนรู้การสร้าง UI ที่สวยงามและใช้งานได้จริงด้วย:

1. ✅ **shadcn/ui Components** - Card, Separator สำหรับ UI ที่สวยงาม
2. ✅ **Responsive Design** - Grid layout ที่ใช้งานได้ทุกอุปกรณ์
3. ✅ **Image Optimization** - Next.js Image component พร้อม remote patterns
4. ✅ **Text Truncation** - lodash truncate สำหรับข้อความที่ยาว
5. ✅ **Component Reusability** - แยก components ให้ใช้งานซ้ำได้
6. ✅ **Performance** - Lazy loading และ image optimization
7. ✅ **Modern Practices** - ใช้เทคโนโลยีล่าสุดของ Next.js 15.3.2

ผลลัพธ์ที่ได้คือเว็บไซต์ที่มีประสิทธิภาพสูง โหลดเร็ว และใช้งานง่ายในทุกอุปกรณ์! 🚀

> 💡 **Next Steps:** ในบทต่อไปเราจะเรียนรู้การเพิ่ม Authentication และ User Management เพื่อให้ผู้ใช้สามารถล็อกอินและจัดการข้อมูลส่วนตัวได้
