# Next.js Demo และการใช้งานเบื้องต้น

## การติดตั้งและเตรียมสภาพแวดล้อม

### 1. การติดตั้ง Node.js

ก่อนเริ่มใช้งาน Next.js เราจำเป็นต้องติดตั้ง Node.js เป็นอันดับแรก

**สำหรับ macOS:**
- ติดตั้ง Homebrew (Package Manager)
```bash
# ติดตั้ง Node.js ผ่าน Homebrew
brew install node
```

**สำหรับ Windows:**
- ติดตั้ง Chocolatey (Package Manager)
```bash
# ติดตั้ง Node.js ผ่าน Chocolatey
choco install nodejs
```

### 2. การติดตั้ง pnpm

pnpm เป็น Package Manager ที่เร็วกว่า npm และใช้พื้นที่น้อยกว่า
```bash
npm install -g pnpm
```

### 3. การตั้งค่าสำหรับ Windows (เพิ่มเติม)

**ติดตั้ง Git Bash:**
- ดาวน์โหลด Git SCM จาก [git-scm.com](https://git-scm.com)
- ใช้ Git Bash แทน PowerShell เพื่อหลีกเลี่ยงปัญหา script execution policy

**แนะนำ WSL (Windows Subsystem for Linux):**
- เป็นวิธีที่ดีที่สุดสำหรับการพัฒนาบน Windows
- สามารถใช้คำสั่ง Unix-like ได้โดยตรง

## การสร้างโปรเจค Next.js

### สร้างโปรเจคใหม่

```bash
# สร้างโปรเจค Next.js ใหม่
pnpm create next-app@latest

# ตัวอย่างการตอบคำถามเมื่อสร้างโปรเจค
? What is your project named? → demo
? Would you like to use TypeScript? → Yes
? Would you like to use ESLint? → Yes
? Would you like to use Tailwind CSS? → Yes
? Would you like to use `src/` directory? → No
? Would you like to use App Router? → Yes
? Would you like to customize the default import alias? → No
```

### เปิดโปรเจคด้วย VS Code

```bash
# เปิด VS Code ที่โฟลเดอร์โปรเจค
code demo
```

## การตั้งค่า VS Code

### สร้างไฟล์ `.vscode/settings.json`

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
}
```

**คำอธิบาย:**
- `formatOnSave`: จัดรูปแบบโค้ดอัตโนมัติเมื่อกด Save
- `defaultFormatter`: ใช้ Prettier เป็นเครื่องมือจัดรูปแบบ
- `tabSize`: ใช้ 2 spaces แทน 4 spaces (มาตรฐาน JavaScript)

### การติดตั้ง Extension

ติดตั้ง Prettier extension ใน VS Code:
- ไปที่ Extensions (Ctrl+Shift+X)
- ค้นหา "Prettier - Code formatter"
- กด Install

## โครงสร้างโฟลเดอร์ Next.js (App Router)

```
demo/
├── app/                    # App Router (Next.js 13+)
│   ├── page.tsx           # หน้าหลัก (/)
│   ├── books/             # Route: /books
│   │   ├── page.tsx       # หน้าแสดงรายการหนังสือ
│   │   ├── ssg/           # Static Site Generation
│   │   │   └── page.tsx
│   │   ├── isr/           # Incremental Static Regeneration
│   │   │   └── page.tsx
│   │   ├── ssr/           # Server Side Rendering
│   │   │   └── page.tsx
│   │   └── client-side-rendering/
│   │       └── page.tsx
│   └── api/               # API Routes
│       └── books/
│           └── route.ts   # API endpoint: /api/books
├── util/                  # Utility functions
│   ├── generator.ts       # ฟังก์ชันสร้างข้อมูลจำลอง
│   ├── api.ts            # ฟังก์ชันเรียก API
│   └── types.ts          # TypeScript type definitions
└── .vscode/
        └── settings.json      # VS Code settings
```

## การสร้าง API Routes

### 1. สร้าง Type Definitions

สร้างไฟล์ `util/types.ts`:
```typescript
export interface Book {
    id: number;
    title: string;
    description: string;
}
```

### 2. สร้างฟังก์ชันสำหรับจำลองข้อมูล

ติดตั้ง faker.js:
```bash
pnpm add @faker-js/faker
```

สร้างไฟล์ `util/generator.ts`:
```typescript
import { faker } from '@faker-js/faker';
import { Book } from './types';

export function generateBooks(): Book[] {
    const length = faker.helpers.rangeToNumber({ min: 3, max: 10 });
    
    return Array.from({ length }, () => ({
        id: faker.number.int(),
        title: faker.lorem.word(),
        description: faker.lorem.paragraph()
    }));
}
```

### 3. สร้าง API Endpoint

สร้างไฟล์ `app/api/books/route.ts`:
```typescript
import { generateBooks } from '@/util/generator';

export function GET() {
    const books = generateBooks();
    return Response.json(books);
}
```

**คำอธิบาย:**
- ใช้ชื่อฟังก์ชันตาม HTTP method (GET, POST, PUT, DELETE)
- ส่งข้อมูลกลับในรูปแบบ JSON

## การสร้างฟังก์ชันเรียก API

สร้างไฟล์ `util/api.ts`:
```typescript
import { Book } from './types';

export async function getBooks(
    options?: Parameters<typeof fetch>[1]
): Promise<Book[]> {
    const response = await fetch('http://localhost:3000/api/books', options);
    return response.json() as Promise<Book[]>;
}
```

## รูปแบบการ Rendering ต่างๆ

### 1. Static Site Generation (SSG)

**คุณสมบัติ:**
- สร้าง HTML ล่วงหน้าตอน build time
- เหมาะสำหรับเนื้อหาที่ไม่เปลี่ยนแปลงบ่อย (เช่น About page)
- ประสิทธิภาพสูง, SEO ดี

สร้างไฟล์ `app/books/ssg/page.tsx`:
```typescript
import { getBooks } from '@/util/api';

export default async function SSGPage() {
    const books = await getBooks(); // ไม่ใส่ options = SSG
    
    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>{book.title}</li>
            ))}
        </ul>
    );
}
```

### 2. Incremental Static Regeneration (ISR)

**คุณสมบัติ:**
- สร้าง HTML ล่วงหน้า แต่อัพเดทตามช่วงเวลาที่กำหนด
- เหมาะสำหรับเนื้อหาที่เปลี่ยนแปลงเป็นระยะ (เช่น บทความบล็อก)
- ผสมประสิทธิภาพของ SSG กับความทันสมัยของข้อมูล

สร้างไฟล์ `app/books/isr/page.tsx`:
```typescript
import { getBooks } from '@/util/api';

export default async function ISRPage() {
    const books = await getBooks({
        next: { revalidate: 10 } // อัพเดททุก 10 วินาที
    });
    
    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>{book.title}</li>
            ))}
        </ul>
    );
}
```

### 3. Server Side Rendering (SSR)

**คุณสมบัติ:**
- สร้าง HTML ทุกครั้งที่มี request
- เหมาะสำหรับข้อมูลที่เปลี่ยนแปลงตลอดเวลา (เช่น ราคาหุ้น)
- SEO ดี แต่ใช้ทรัพยากร server มาก

สร้างไฟล์ `app/books/ssr/page.tsx`:
```typescript
import { getBooks } from '@/util/api';

export default async function SSRPage() {
    const books = await getBooks({
        cache: 'no-store' // ไม่เก็บ cache = SSR
    });
    
    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>{book.title}</li>
            ))}
        </ul>
    );
}
```

### 4. Client Side Rendering (CSR)

**คุณสมบัติ:**
- โหลดข้อมูลที่ browser
- เหมาะสำหรับระบบ admin หรือเนื้อหาที่ไม่ต้องการ SEO
- ลด load ของ server

สร้างไฟล์ `app/books/client-side-rendering/page.tsx`:
```typescript
'use client'; // บังคับให้เป็น Client Component

import { useState, useEffect } from 'react';
import { getBooks } from '@/util/api';
import { Book } from '@/util/types';

export default function ClientSideRenderingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    
    async function loadBooks() {
        const booksData = await getBooks();
        setIsLoading(false);
        setBooks(booksData);
    }
    
    useEffect(() => {
        loadBooks();
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (books.length === 0) {
        return <div>No books found</div>;
    }
    
    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>{book.title}</li>
            ))}
        </ul>
    );
}
```

## การเรียกใช้งาน

```bash
# รันโปรเจคในโหมด development
pnpm dev

# เข้าดูผลลัพธ์ที่:
# http://localhost:3000          - หน้าหลัก
# http://localhost:3000/books    - รายการหนังสือ
# http://localhost:3000/api/books - API endpoint
```

## การเปรียบเทียบรูปแบบการ Rendering

| รูปแบบ | เวลาสร้าง HTML | อัพเดทข้อมูล | SEO | ประสิทธิภาพ | เหมาะสำหรับ |
|--------|----------------|---------------|-----|-------------|-------------|
| **SSG** | Build time | ไม่อัพเดท | ดีมาก | ดีมาก | About page, Landing page |
| **ISR** | Build time + Revalidate | ตามช่วงเวลา | ดีมาก | ดี | บทความบล็อก, Product catalog |
| **SSR** | Request time | ทุก request | ดีมาก | ปานกลาง | ราคาหุ้น, ข่าวสด |
| **CSR** | Client side | Real-time | ไม่ดี | ดี | ระบบ Admin, Dashboard |

## เทคนิคการใช้งานร่วมกัน

สามารถใช้หลายรูปแบบในแอปเดียวกันได้:

**ตัวอย่าง: บทความบล็อก**
- **หัวข้อบทความ**: ใช้ SSG (ไม่เปลี่ยนแปลง)
- **เนื้อหาบทความ**: ใช้ ISR (อาจแก้ไขเป็นระยะ)
- **ความคิดเห็น**: ใช้ CSR (โหลดเมื่อ scroll ถึง)

```typescript
// ตัวอย่างการใช้ Intersection Observer สำหรับโหลดความคิดเห็น
useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadComments(); // โหลดความคิดเห็นเมื่อ scroll ถึง
        }
    });
    
    observer.observe(commentSectionRef.current);
}, []);
```

## การแก้ปัญหาเบื้องต้น

### ปัญหา: คำสั่ง `pnpm` ไม่ทำงาน
**วิธีแก้:**
- Windows: ปิด Terminal แล้วเปิดใหม่
- ตรวจสอบการติดตั้ง Node.js

### ปัญหา: Git Bash ไม่แสดงใน VS Code Terminal
**วิธีแก้:** เพิ่มใน `.vscode/settings.json`:
```json
{
    "terminal.integrated.profiles.windows": {
        "Git Bash": {
            "path": "C:\\Program Files\\Git\\bin\\bash.exe"
        }
    },
    "terminal.integrated.defaultProfile.windows": "Git Bash"
}
```

### ปัญหา: use effect ทำงาน 2 รอบ
**สาเหตุ:** React Strict Mode ในโหมด development
**วิธีแก้:** ปกติแล้วไม่ต้องแก้ เพราะใน production จะทำงานรอบเดียว

## สรุป

Next.js เป็น framework ที่ยืดหยุ่นสูง สามารถเลือกใช้รูปแบบ rendering ที่เหมาะสมกับลักษณะของข้อมูลแต่ละส่วน การเลือกใช้ให้ถูกต้องจะทำให้แอปพลิเคชันมีประสิทธิภาพและ user experience ที่ดี

**หลักการเลือกใช้:**
- **ข้อมูลไม่เปลี่ยน** → SSG
- **ข้อมูลเปลี่ยนเป็นระยะ** → ISR  
- **ข้อมูลเปลี่ยนตลอดเวลา + ต้องการ SEO** → SSR
- **ข้อมูลเปลี่ยนตลอดเวลา + ไม่ต้องการ SEO** → CSR