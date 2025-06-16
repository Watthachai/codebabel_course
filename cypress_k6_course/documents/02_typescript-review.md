# ทบทวนการใช้งาน TypeScript

## 📚 คู่มือการเรียนรู้ TypeScript สำหรับมือใหม่

> **หมายเหตุ**: เอกสารนี้ได้รับการปรับปรุงและเพิ่มเติมจากเนื้อหาต้นฉบับ โดยเน้นการอธิบายที่เข้าใจง่าย พร้อมตัวอย่างที่ชัดเจน และการนำเสนอแบบ step-by-step

---

## 🎯 วัตถุประสงค์
เอกสารนี้จัดทำขึ้นเพื่อช่วยให้ทีมงานและผู้เรียนรู้ใหม่เข้าใจ TypeScript ได้อย่างรวดเร็วและมีประสิทธิภาพ

---

## 🚀 การติดตั้งและเตรียมโปรเจค

### ขั้นตอนที่ 1: ติดตั้ง TypeScript

```bash
# ติดตั้ง TypeScript เป็น dev dependency
npm install -D typescript

# สร้างไฟล์ tsconfig.json
npx tsc --init

# ติดตั้ง tsx สำหรับรัน TypeScript โดยตรง
npm install -D tsx
```

### ขั้นตอนที่ 2: ตั้งค่า package.json

```json
{
  "scripts": {
    "dev": "tsx --watch index.ts"
  }
}
```

### ขั้นตอนที่ 3: สร้างไฟล์และทดสอบ

สร้างไฟล์ `index.ts`:
```typescript
console.log("Hello World");
```

รันโปรเจค:
```bash
npm run dev
```

**✨ การปรับปรุง**: เพิ่มขั้นตอนการติดตั้งที่ชัดเจน พร้อมคำอธิบายแต่ละคำสั่ง

---

## 🔧 พื้นฐาน TypeScript

### 🎨 ชนิดข้อมูล (Data Types)

#### ปัญหาของ JavaScript
```javascript
// JavaScript - ไม่ปลอดภัย
function add(a, b) {
    return a + 1;
}

add([1, 2, 3]); // ไม่เกิด error แต่ผลลัพธ์ผิด
```

#### วิธีแก้ไขด้วย TypeScript
```typescript
// TypeScript - ปลอดภัย
function add(a: number, b: number): number {
    return a + 1; // จะเกิด error ทันทีถ้าใช้ผิด
}

add(5, 10); // ✅ ถูกต้อง
add([1, 2, 3]); // ❌ Error: Argument of type 'number[]' is not assignable
```

### 📊 การประกาศตัวแปร

```typescript
// การกำหนดชนิดข้อมูลแบบชัดเจน
let age: number = 25;
let name: string = "สมชาย";
let isActive: boolean = true;

// TypeScript อนุมานชนิดข้อมูลได้ (Type Inference)
let score = 100; // อนุมานเป็น number
let title = "Hello"; // อนุมานเป็น string

// Literal Types
const status = "success"; // ชนิดข้อมูลเป็น "success" ไม่ใช่ string
```

**🔍 คำอธิบาย**: TypeScript ช่วยตรวจจับข้อผิดพลาดตั้งแต่เวลาเขียนโค้ด ไม่ต้องรอถึงเวลารัน

### 📋 Arrays และ Objects

#### Arrays
```typescript
// วิธีประกาศ Array
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Mixed types
let mixed: (string | number)[] = [1, "hello", 2, "world"];
```

#### Functions
```typescript
// Function แบบปกติ
function multiply(x: number, y: number): number {
    return x * y;
}

// Arrow Function
const divide = (x: number, y: number): number => x / y;

// TypeScript อนุมานได้เอง
const subtract = (x: number, y: number) => x - y; // return type เป็น number อัตโนมัติ
```

**✨ การปรับปรุง**: เพิ่มตัวอย่างการใช้งาน Arrays และ Functions ที่หลากหลาย

---

## 🔗 Union Types และ Function Overloading

### Union Types (|)
```typescript
// สามารถรับได้หลายชนิดข้อมูล
function formatPath(path: string | null): string | null {
    if (path) {
        return `/upload${path}`;
    }
    return null;
}

// การใช้งาน
const result1 = formatPath("/images/logo.png"); // ได้ "/upload/images/logo.png"
const result2 = formatPath(null); // ได้ null
```

### Function Overloading
```typescript
// ประกาศ overload signatures
function uploadPath(path: string): string;
function uploadPath(path: null): null;

// Implementation
function uploadPath(path: string | null): string | null {
    if (path) {
        return `/upload${path}`;
    }
    return null;
}

// การใช้งาน - TypeScript รู้ผลลัพธ์ที่แน่นอน
const resource1 = uploadPath("/image.jpg"); // ชนิดข้อมูล: string
const resource2 = uploadPath(null); // ชนิดข้อมูล: null
```

**💡 ประโยชน์**: Function Overloading ช่วยให้ TypeScript รู้ผลลัพธ์ที่แน่นอนตามชนิดข้อมูลที่ส่งเข้าไป

### Literal Types + Union
```typescript
// แทนที่จะใช้ string ธรรมดา
type Role = "admin" | "moderator" | "member" | "anonymous";

function renderDashboard(role: Role) {
    if (role !== "admin") {
        return null;
    }
    return "<dashboard>Admin Dashboard</dashboard>";
}

// การใช้งาน
renderDashboard("admin"); // ✅ ถูกต้อง
renderDashboard("user"); // ❌ Error: Argument of type '"user"' is not assignable
```

**✨ การปรับปรุง**: เพิ่มการอธิบายประโยชน์ของ Literal Types และตัวอย่างการใช้งานจริง

---

## 🏗️ Interfaces และ Type Aliases

### Interface
```typescript
interface Person {
    name: string;
    age: number;
    gender: "male" | "female";
    social?: Social; // optional property
}

interface Social {
    line?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    instagram?: string;
}

// การใช้งาน
const user: Person = {
    name: "สมชาย",
    age: 24,
    gender: "male",
    // social เป็น optional ไม่ใส่ก็ได้
};
```

### Type Aliases
```typescript
type PersonType = {
    name: string;
    age: number;
    gender: "male" | "female";
    social?: Social;
};

// Union types ใช้ type ได้
type Role = "admin" | "member";
```

### Interface vs Type Aliases

| Feature | Interface | Type |
|---------|-----------|------|
| Object definition | ✅ | ✅ |
| Union types | ❌ | ✅ |
| Intersection | ✅ (extends) | ✅ (&) |
| **Augmentation** | ✅ | ❌ |
| Computed properties | ❌ | ✅ |

### Interface Inheritance
```typescript
interface Website {
    url: string;
}

interface Article {
    title: string;
    content: string;
}

// การสืบทอด (extends) หลาย interfaces
interface BlogPost extends Website, Article {
    viewCount: number;
}

const post: BlogPost = {
    url: "https://example.com",
    title: "TypeScript Guide",
    content: "Content here...",
    viewCount: 200
};
```

### Type Intersection
```typescript
type Website = {
    url: string;
};

type Article = {
    title: string;
    content: string;
};

// การรวม types ด้วย &
type BlogPost = Website & Article & {
    viewCount: number;
};
```

### Interface Augmentation (Declaration Merging)
```typescript
// ไฟล์ library
interface Session {
    userId: string | number;
}

// ในโค้ดของเรา - เพิ่ม property ได้
interface Session {
    role: "admin" | "member";
}

// ตอนนี้ Session มีทั้ง userId และ role
const session: Session = {
    userId: 1,
    role: "admin"
};
```

**💡 เคล็ดลับ**: ใช้ Interface สำหรับ objects ที่อาจต้อง extend หรือ augment ในอนาคต ใช้ Type สำหรับ Union types และ computed types

**✨ การปรับปรุง**: เพิ่มตารางเปรียบเทียบ Interface vs Type และตัวอย่าง Augmentation ที่ใช้ได้จริง

---

## 🧬 Generics

### Generic Functions
```typescript
// แทนที่จะเขียนหลายฟังก์ชัน
function getFirstNumber(arr: number[]): number | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

function getFirstString(arr: string[]): string | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

// ใช้ Generic แทน
function getFirst<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

// การใช้งาน - TypeScript อนุมานได้เอง
const firstNumber = getFirst([1, 2, 3]); // ชนิดข้อมูล: number | undefined
const firstString = getFirst(["a", "b", "c"]); // ชนิดข้อมูล: string | undefined
const firstBoolean = getFirst([true, false]); // ชนิดข้อมูล: boolean | undefined
```

### Generic Constraints
```typescript
// กำหนดข้อจำกัดให้ Generic
interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

// ข้อมูลตัวอย่าง
const articles = [
    { id: 1, title: "TypeScript Basics" },
    { id: 2, title: "Advanced TypeScript" }
];

const announcements = [
    { id: 1, title: "Company Update", urgent: true },
    { id: 2, title: "Holiday Notice", urgent: false }
];

// การใช้งาน
const article = findById(articles, 2); // ชนิดข้อมูล: { id: number; title: string; } | undefined
const announcement = findById(announcements, 1); // ชนิดข้อมูล: { id: number; title: string; urgent: boolean; } | undefined

// Error - ไม่มี id property
findById([1, 2, 3], 1); // ❌ Error
```

### Advanced Generics
```typescript
// Multiple type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const user = { name: "John", age: 30 };
const settings = { theme: "dark", notifications: true };

const userWithSettings = merge(user, settings);
// ชนิดข้อมูล: { name: string; age: number; } & { theme: string; notifications: boolean; }
```

**✨ การปรับปรุง**: เพิ่มตัวอย่าง Generic Constraints ที่ใช้งานได้จริงและ Advanced Generics

---

## 🛠️ Utility Types

TypeScript มี Utility Types ที่ช่วยในการจัดการชนิดข้อมูลที่ซับซ้อน

### Partial<T>
```typescript
interface User {
    name: string;
    email: string;
    age: number;
    address: string;
}

// สำหรับ update - ไม่ต้องส่งครบทุก field
function updateUser(id: number, updates: Partial<User>) {
    // updates สามารถมีบาง property ของ User ได้
}

updateUser(1, { age: 31 }); // ✅ ได้
updateUser(1, { name: "Jane", email: "jane@example.com" }); // ✅ ได้
```

### Pick<T, K>
```typescript
// เลือกเฉพาะ properties ที่ต้องการ
type UserSummary = Pick<User, "name" | "email">;
// ได้ { name: string; email: string; }

function displayUserSummary(user: UserSummary) {
    console.log(`${user.name} - ${user.email}`);
}
```

### Omit<T, K>
```typescript
// ละเว้น properties ที่ไม่ต้องการ
type CreateUserRequest = Omit<User, "id">;
// ได้ { name: string; email: string; age: number; address: string; }

function createUser(userData: CreateUserRequest) {
    // ไม่ต้องส่ง id มา เพราะ database จะ generate ให้
}
```

### Record<K, T>
```typescript
// สร้าง object type แบบ dynamic
type SocialPlatforms = "line" | "facebook" | "twitter" | "tiktok" | "instagram";
type SocialLinks = Record<SocialPlatforms, string>;

// เทียบเท่ากับ
type SocialLinksManual = {
    line: string;
    facebook: string;
    twitter: string;
    tiktok: string;
    instagram: string;
};

// การใช้งาน
const userSocial: Partial<SocialLinks> = {
    line: "@john_doe",
    facebook: "john.doe"
    // ไม่ต้องใส่ครบทุกตัว
};
```

### ReturnType<T>
```typescript
function getTheme() {
    return {
        colors: {
            primary: "#334455",
            secondary: "#ffddee"
        },
        fonts: {
            main: "Arial",
            heading: "Georgia"
        }
    } as const; // as const สำคัญ!
}

// ดึงชนิดข้อมูลจาก return value
type Theme = ReturnType<typeof getTheme>;

// ดึงเฉพาะ colors
type ThemeColors = Theme["colors"];

// การใช้งาน
function applyTheme(theme: Theme) {
    document.body.style.backgroundColor = theme.colors.primary;
}
```

**🔍 คำอธิบาย `as const`**: ป้องกันไม่ให้ TypeScript อนุมาน string literals เป็น string ธรรมดา

**✨ การปรับปรุง**: เพิ่มตัวอย่างการใช้งาน Utility Types ที่ใช้ได้จริงในโปรเจค และอธิบาย `as const`

---

## 🎨 Type Assertions และ Advanced Patterns

### Type Assertions
```typescript
// บอก TypeScript ว่าเรารู้ชนิดข้อมูลแน่นอน
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const input = document.querySelector(".email-input") as HTMLInputElement;

// หรือใช้ angle bracket syntax (ไม่แนะนำใน JSX)
const canvas2 = <HTMLCanvasElement>document.getElementById("myCanvas");
```

### Const Assertions
```typescript
// โดยปกติ
const colors = ["red", "green", "blue"]; // ชนิดข้อมูล: string[]

// ด้วย const assertion
const colorsConst = ["red", "green", "blue"] as const; // ชนิดข้อมูล: readonly ["red", "green", "blue"]

// ประโยชน์ในการสร้าง literal types
type Color = typeof colorsConst[number]; // "red" | "green" | "blue"
```

### Template Literal Types
```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "users" | "posts" | "comments";

// รวม string literals
type ApiUrl = `/${Endpoint}`;
type FullApiUrl = `https://api.example.com${ApiUrl}`;

// การใช้งาน
function callApi(url: FullApiUrl, method: HttpMethod) {
    // implementation
}

callApi("https://api.example.com/users", "GET"); // ✅
callApi("https://api.example.com/invalid", "GET"); // ❌ Error
```

**✨ การปรับปรุง**: เพิ่ม Type Assertions, Const Assertions และ Template Literal Types

---

## 📊 สรุปและแนวทางปฏิบัติที่ดี

### ✅ Best Practices

1. **ใช้ Type Inference เมื่อไหร่ก็ได้**
   ```typescript
   // ดี - ปล่อยให้ TypeScript อนุมานเอง
   const user = { name: "John", age: 30 };
   
   // ไม่จำเป็น - กำหนดชนิดข้อมูลซ้ำซ้อน
   const user: { name: string; age: number } = { name: "John", age: 30 };
   ```

2. **ใช้ strict mode**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

3. **ชื่อตัวแปรที่มีความหมาย**
   ```typescript
   // ดี
   type UserRole = "admin" | "member";
   interface UserProfile { /* ... */ }
   
   // หลีกเลี่ยง
   type T = string | number;
   interface IUser { /* ... */ }
   ```

### 🚨 สิ่งที่ควรหลีกเลี่ยง

1. **การใช้ `any`**
   ```typescript
   // หลีกเลี่ยง
   function process(data: any) { /* ... */ }
   
   // ดีกว่า
   function process<T>(data: T): T { /* ... */ }
   ```

2. **Type Assertions ที่ไม่จำเป็น**
   ```typescript
   // หลีกเลี่ยง
   const num = (5 as any) as number;
   
   // ดี
   const num = 5;
   ```

### 📈 การปรับปรุงที่ทำในเอกสารนี้

- ✨ **เพิ่มขั้นตอนการติดตั้งที่ชัดเจน** พร้อมคำอธิบายแต่ละคำสั่ง
- 🔍 **เพิ่มตารางเปรียบเทียบ** Interface vs Type Aliases
- 💡 **เพิ่มตัวอย่างการใช้งานจริง** ในทุกหัวข้อ
- 🎯 **เพิ่ม Best Practices** และสิ่งที่ควรหลีกเลี่ยง
- 📊 **เพิ่ม Utility Types** ที่ใช้งานได้จริง
- 🧬 **อธิบาย Generics** แบบ step-by-step
- 🎨 **เพิ่ม Advanced Patterns** เช่น Template Literal Types
- 📝 **ปรับรูปแบบการเขียน** ให้อ่านง่ายขึ้นด้วย markdown formatting
- 🔗 **เพิ่มตัวอย่าง Function Overloading** ที่ใช้ได้จริง
- ⚡ **เพิ่มคำอธิบาย `as const`** และ Type Assertions

### 🎓 ขั้นตอนต่อไป

1. ฝึกเขียน TypeScript ในโปรเจคจริง
2. เรียนรู้ Advanced Types เพิ่มเติม
3. ศึกษา Design Patterns ที่เหมาะกับ TypeScript
4. ลองใช้ TypeScript กับ Frameworks ต่าง ๆ

---

**💼 สำหรับทีมงาน**: เอกสารนี้สามารถใช้เป็น reference ในการ code review และการสอนสมาชิกใหม่ได้ครับ

