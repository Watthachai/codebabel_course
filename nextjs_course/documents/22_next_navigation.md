# Next.js Navigation และ การจัดการ Routing 

## 📚 สารบัญ
- [การใช้งาน Link Component](#การใช้งาน-link-component)
- [การตั้งค่า Redirects](#การตั้งค่า-redirects)
- [Next Navigation Package](#next-navigation-package)
- [Hooks สำหรับ Navigation](#hooks-สำหรับ-navigation)
- [ตัวอย่างการใช้งานจริง](#ตัวอย่างการใช้งานจริง)
- [อัปเดตสำหรับ Next.js 15.3.2](#อัปเดตสำหรับ-nextjs-1532)

---

## การใช้งาน Link Component

### 🔗 Link Component คืออะไร?
Link component เป็น component ที่ Next.js จัดเตรียมไว้สำหรับการเปลี่ยนหน้าใน Single Page Application (SPA) โดยไม่ต้อง reload หน้าใหม่

### ✨ คุณสมบัติเด่น:
- ใช้งานได้ทั้ง **Server Component** และ **Client Component**
- ปรับปรุงประสิทธิภาพด้วย prefetching
- รองรับ SEO ที่ดี

### 📝 ตัวอย่างการใช้งาน:
```jsx
import Link from 'next/link'

function ArticleList({ articles }) {
    return (
        <div>
            {articles.map(article => (
                <Link 
                    key={article.id} 
                    href={`/articles/${article.id}`}
                    className="article-link"
                >
                    {article.title}
                </Link>
            ))}
        </div>
    )
}
```

---

## การตั้งค่า Redirects

### 🔄 Redirect คืออะไร?
การ redirect คือการเปลี่ยนเส้นทาง URL อัตโนมัติ เมื่อผู้ใช้เข้าถึง path หนึ่ง แล้วให้ไปยัง path อื่นแทน

### ⚙️ การตั้งค่าใน next.config.mjs:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/list',
                permanent: true // หรือ false สำหรับ temporary redirect
            },
            {
                source: '/old-blog/:slug',
                destination: '/blog/:slug',
                permanent: true
            }
        ]
    }
}

export default nextConfig
```

### 🎯 ความแตกต่างระหว่าง Permanent และ Temporary:

| ประเภท | HTTP Status Code | การใช้งาน |
|--------|------------------|-----------|
| **Permanent (true)** | 301 | เปลี่ยนถาวร เช่น rebrand หรือเปลี่ยนโครงสร้าง URL |
| **Temporary (false)** | 302 | เปลี่ยนชั่วคราว เช่น maintenance หรือ A/B testing |

---

## Next Navigation Package

### 📦 รู้จักกับ next/navigation
`next/navigation` เป็น package ที่รวบรวม hooks สำหรับจัดการ navigation ใน **Client Component** เท่านั้น

> ⚠️ **หมายเหตุสำคัญ**: hooks ทั้งหมดใน next/navigation ใช้ได้เฉพาะใน Client Component

---

## Hooks สำหรับ Navigation

### 1. 🧭 useRouter Hook

**ไว้สำหรับ**: การเปลี่ยนหน้าแบบ programmatic (ใช้โค้ดควบคุม)

```jsx
'use client'
import { useRouter } from 'next/navigation'

function NavigationButtons() {
    const router = useRouter()
    
    const handleNavigate = () => {
        // การใช้ push - เพิ่มใน history stack
        router.push('/list')
    }
    
    const handleReplace = () => {
        // การใช้ replace - แทนที่ใน history stack
        router.replace('/list')
    }
    
    const handleBack = () => {
        // ย้อนกลับหน้าก่อนหน้า
        router.back()
    }

    return (
        <div>
            <button onClick={handleNavigate}>Navigate with Push</button>
            <button onClick={handleReplace}>Navigate with Replace</button>
            <button onClick={handleBack}>Go Back</button>
        </div>
    )
}
```

#### 🔍 ความแตกต่างระหว่าง Push และ Replace:

```
📚 History Stack Visualization:

เริ่มต้น: [/articles]

หลัง router.push('/list'):
[/articles] → [/list]  ✅ สามารถ back ได้

หลัง router.replace('/list'):
[/list]  ❌ ไม่สามารถ back ไป /articles ได้
```

### 2. 📍 usePathname Hook

**ไว้สำหรับ**: ดึงข้อมูล pathname ปัจจุบัน

```jsx
'use client'
import { usePathname } from 'next/navigation'

function CurrentPath() {
    const pathname = usePathname()
    
    console.log(pathname) // เช่น: "/articles"
    
    return <div>Current path: {pathname}</div>
}
```

### 3. 🔍 useSearchParams Hook

**ไว้สำหรับ**: จัดการ query parameters

```jsx
'use client'
import { useSearchParams } from 'next/navigation'

function SearchFilter() {
    const searchParams = useSearchParams()
    
    // URL: /articles?category=food&page=2
    const category = searchParams.get('category') // "food"
    const page = searchParams.get('page') // "2"
    
    return (
        <div>
            <p>Category: {category}</p>
            <p>Page: {page}</p>
        </div>
    )
}
```

### 4. 📋 useParams Hook

**ไว้สำหรับ**: ดึงข้อมูล dynamic route parameters

```jsx
'use client'
import { useParams } from 'next/navigation'

// สำหรับ route: /articles/[id]/page.tsx
function ArticleDetail() {
    const params = useParams<{ id: string }>()
    
    console.log(params.id) // "123" (เป็น string เสมอ)
    
    return <div>Article ID: {params.id}</div>
}
```

---

## ตัวอย่างการใช้งานจริง

### 🏗️ โครงสร้างไฟล์:
```
app/
├── page.tsx                 # หน้า home
├── articles/
│   ├── page.tsx            # /articles
│   ├── [id]/
│   │   └── page.tsx        # /articles/[id]
│   └── components/
│       ├── ArticleList.tsx
│       └── ArticleDetail.tsx
└── list/
        └── page.tsx            # /list
```

### 📄 ตัวอย่าง ArticleList Component:

```jsx
// app/articles/components/ArticleList.tsx
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ArticleList({ articles }) {
    const router = useRouter()

    return (
        <div className="article-list">
            {articles.map(article => (
                <div key={article.id} className="article-item">
                    {/* วิธีที่ 1: ใช้ Link Component */}
                    <Link href={`/articles/${article.id}`}>
                        <h3>{article.title}</h3>
                    </Link>
                    
                    {/* วิธีที่ 2: ใช้ Button + useRouter */}
                    <button 
                        onClick={() => router.push(`/articles/${article.id}`)}
                        className="read-more-btn"
                    >
                        อ่านเพิ่มเติม
                    </button>
                </div>
            ))}
            
            {/* ปุ่มสำหรับทดสอบ navigation */}
            <div className="navigation-buttons">
                <button onClick={() => router.push('/list')}>
                    Navigate to List (Push)
                </button>
                <button onClick={() => router.replace('/list')}>
                    Navigate to List (Replace)
                </button>
                <button onClick={() => router.back()}>
                    Go Back
                </button>
            </div>
        </div>
    )
}
```

### 📝 ตัวอย่าง ArticleDetail Component:

```jsx
// app/articles/components/ArticleDetail.tsx
'use client'
import { useParams, useSearchParams, usePathname } from 'next/navigation'

export default function ArticleDetail({ article }) {
    const params = useParams<{ id: string }>()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    
    // ดึงข้อมูลจาก URL
    const articleId = params.id
    const source = searchParams.get('source') // เช่น ?source=homepage
    
    console.log('Current path:', pathname) // "/articles/123"
    console.log('Article ID:', articleId)  // "123"
    console.log('Source:', source)         // "homepage"

    return (
        <article>
            <h1>{article.title}</h1>
            <p>Article ID: {articleId}</p>
            {source && <p>มาจาก: {source}</p>}
            <div>{article.content}</div>
        </article>
    )
}
```

---

## อัปเดตสำหรับ Next.js 15.3.2

### 🚀 การปรับปรุงที่สำคัญ:

#### 1. **Enhanced TypeScript Support**
```jsx
// ✅ ใหม่: Type-safe params
const params = useParams<{ id: string; slug: string }>()

// ✅ ใหม่: Better search params typing
const searchParams = useSearchParams()
const category = searchParams.get('category') // string | null
```

#### 2. **Improved Performance**
- Link component มี prefetching ที่ดีขึ้น
- useRouter มีการ optimize สำหรับ Server Components

#### 3. **Better Error Handling**
```jsx
// ✅ ใหม่: Error boundaries สำหรับ navigation
'use client'
import { useRouter } from 'next/navigation'

function SafeNavigation() {
    const router = useRouter()
    
    const handleNavigate = async () => {
        try {
            router.push('/articles')
        } catch (error) {
            console.error('Navigation failed:', error)
        }
    }
    
    return <button onClick={handleNavigate}>Navigate</button>
}
```

#### 4. **New Configuration Options**
```javascript
// next.config.mjs - เพิ่มเติมใหม่
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/old-path',
                destination: '/new-path',
                permanent: true,
                // ✅ ใหม่: Support for locale redirects
                locale: false,
                // ✅ ใหม่: Conditional redirects
                has: [
                    {
                        type: 'header',
                        key: 'x-redirect-me',
                    },
                ],
            }
        ]
    }
}
```

### 🔧 Migration Guide จาก Version เก่า:

| Component/Hook | เปลี่ยนจาก | เป็น | หมายเหตุ |
|----------------|------------|------|----------|
| `useRouter` | `next/router` | `next/navigation` | ใช้ได้เฉพาะ Client Component |
| `router.push()` | รองรับ object | รองรับ string เท่านั้น | `router.push('/path')` |
| Link | `legacyBehavior` | ไม่จำเป็น | Automatic wrapping ใน Next.js 13+ |

### 📋 Best Practices สำหรับ Next.js 15.3.2:

1. **ใช้ TypeScript สำหรับ type safety**
```jsx
// ✅ Good
const params = useParams<{ id: string }>()

// ❌ Not recommended
const params = useParams()
```

2. **จัดการ Loading States**
```jsx
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function NavigationButton() {
    const router = useRouter()
    const [isNavigating, setIsNavigating] = useState(false)
    
    const handleClick = async () => {
        setIsNavigating(true)
        router.push('/articles')
        // Note: navigation ใน Next.js 13+ เป็น synchronous
        setIsNavigating(false)
    }
    
    return (
        <button disabled={isNavigating} onClick={handleClick}>
            {isNavigating ? 'กำลังโหลด...' : 'ไปที่บทความ'}
        </button>
    )
}
```

3. **Optimize Link Components**
```jsx
// ✅ Good: Use prefetch wisely
<Link href="/articles" prefetch={false}>
    External Articles
</Link>

// ✅ Good: Use replace for login redirects
<Link href="/dashboard" replace>
    Go to Dashboard
</Link>
```

### 🎯 สรุป Key Points:

- **Link Component**: ใช้สำหรับ navigation ทั่วไป (Server + Client Components)
- **next/navigation hooks**: ใช้เฉพาะใน Client Components
- **useRouter**: สำหรับ programmatic navigation
- **Redirects**: ตั้งค่าใน next.config.mjs สำหรับ automatic redirects
- **Type Safety**: ใช้ TypeScript generics สำหรับ params และ search params

> 💡 **เคล็ดลับ**: ใช้ Link Component เป็นหลัก และใช้ useRouter เมื่อจำเป็นต้องมี logic หรือ condition ในการ navigate เท่านั้น!

