# Next.js Fullstack Development Course

## รายละเอียด

Next.js เป็นหนึ่งในเครื่องมือพัฒนา Fullstack ที่ทรงพลังที่สุดในปัจจุบัน ซึ่งสามารถพัฒนาได้ทั้งเว็บ Frontend และ API Backend ในชุดเครื่องมือเดียวกัน การที่คุณรู้เพียงภาษา JavaScript หรือ TypeScript ก็สามารถสร้าง Fullstack Web Application ได้อย่างรวดเร็วและมีประสิทธิภาพ

### 🎯 **สิ่งที่จะได้เรียนรู้**

**Frontend Development:**

- การใช้งาน React ร่วมกับ Next.js 14 เพื่อสร้าง Modern Web Application (ผู้เรียนใช้ Next.js 15+ แล้ว 5555 ภายในเอกสารอาจจะไม่ได้อัพเดทนะครับซึ่งอาจจะเขียนแตกต่างเล็กน้อย)
- การจัดการ Routes ทั้งแบบ Static และ Dynamic
- การทำความเข้าใจ React Server Components (RSC) vs Client Components
- การใช้งาน App Router และการจัดการ Layout, Error และ Loading States

**Styling & UI:**

- การตกแต่งหน้าเว็บด้วย Tailwind CSS
- การใช้งาน Shadcn UI สำหรับ Component Library
- การสร้าง Responsive Design ที่รองรับทุกอุปกรณ์

**Backend Development:**

- การพัฒนา API ด้วย Next.js API Routes
- การจัดการ HTTP Methods (GET, POST, PATCH, DELETE)
- การรับและประมวลผล Form Data และ File Uploads
- การจัดการ Error Handling และ Response Format

**Database Integration:**

- การใช้งาน Prisma ORM เป็นตัวกลางในการติดต่อฐานข้อมูล
- การออกแบบ Database Schema และ Relations
- การทำ CRUD Operations อย่างมีประสิทธิภาพ

**Advanced Features:**

- การจัดการ Client State ด้วย Zustand
- การใช้งาน React Query สำหรับ Server State Management
- การทำ Authentication และ Authorization
- การ Deploy แอปพลิเคชันด้วย Docker

## เนื้อหาหลักของเอกสารต่างๆครับ (ลิงก์ไปยังเอกสาร)

### 📚 **ส่วนที่ 1: Modern JavaScript & TypeScript Foundation**

- [JS Tech Stack](documents/1_nextjs_tech_stackoverview.md) - ทำความเข้าใจกับเครื่องมือและไลบรารี่ที่ใช้ในการพัฒนาเว็บสมัยใหม่
- [Next.js Demo](documents/2_nextjs_demo.md) - ตัวอย่างการใช้งาน Next.js เบื้องต้น
- [Arrow Functions, Spread, Rest, Destructuring](documents/3_arrow_spread_rest_destructuring.md) - เรียนรู้ Modern JavaScript Syntax
- [Map และ Filter](documents/5_map_filter.md) - การใช้งาน Array Methods อย่างมีประสิทธิภาพ
- [ES Modules](documents/7_es_modules.md) - การจัดการ import/export ในโปรเจค
- [Async และการใช้งาน Fetch API](documents/9_async_fetch_api.md) - การจัดการ Asynchronous Programming
- [ทบทวนการใช้งาน TypeScript](documents/10_re_learning_ts.md) - ทบทวน TypeScript เพื่อเพิ่มความปลอดภัยให้กับโค้ด

### 🔧 **ส่วนที่ 2: Development Environment Setup**

- [การตั้งค่า ESLint และ Prettier สำหรับโปรเจค Next.js](documents/12_eslint_prettier.md) - การตั้งค่าเครื่องมือสำหรับการเขียนโค้ดที่มีคุณภาพ

### ⚛️ **ส่วนที่ 3: React & Next.js Development**

- [React Fundamentals](documents/13_react_funde.md) - หลักการพื้นฐานของ React และ Component-Based Design
- [Parent-Child Communication](documents/14_parent_child_communication.md) - การสื่อสารระหว่าง Component
- [useEffect](documents/15_useeffect.md) - การใช้งาน useEffect Hook
- [Custom Hooks](documents/16_custom_hooks.md) - การสร้าง Custom Hooks เพื่อ Reuse Logic
- [Static and Dynamic Rendering](documents/17_static_dynamic_rendering.md) - ทำความเข้าใจการ Render แบบต่างๆ ใน Next.js
- [Fetch-based Rendering](documents/18_fetchbased_rendering.md) - การ Fetch ข้อมูลใน Next.js
- [Next.js API](documents/19_nextjs_api.md) - การสร้าง API ด้วย Next.js
- [Consuming API](documents/20_consuming_api.md) - การเรียกใช้งาน API
- [Client-Side Rendering](documents/21_client_side_rendering.md) - การ Render ฝั่ง Client
- [Next Navigation](documents/22_next_navigation.md) - การจัดการ Navigation ใน Next.js

### 🗄️ **ส่วนที่ 4: Database Management**

- [Prisma ORM](documents/23_prismaorm.md) - การจัดการฐานข้อมูลด้วย Prisma
- [Prisma Workflow](documents/24_prisma_workflow.md) - กระบวนการทำงานกับ Prisma
- [Prisma Q & A](documents/25_prisma_qna.md) - คำถามและคำตอบเกี่ยวกับ Prisma
- [Connecting API to the Database](documents/26_connect_api_to_prismadb.md) - การเชื่อมต่อ API กับฐานข้อมูล

### 🎨 **ส่วนที่ 5: UI/UX Development**

- [Tailwind CSS and Shadcn UI](documents/27_tailwindcss_shadcnui.md) - การใช้งาน Utility-first CSS Framework และ Component Library
- [Styling Page with Tailwind CSS and Shadcn UI](documents/28_styling_page_with_tailwindcss_and_shadcnui.md) - การตกแต่งหน้าเว็บ
- [Custom Components](documents/29_custom_components.md) - การสร้าง Component แบบกำหนดเอง

### 📝 **ส่วนที่ 6: Form Management**

- [Form](documents/30_form.md) - การจัดการฟอร์มใน React
- [Form Data](documents/31_formdata.md) - การจัดการข้อมูลฟอร์ม

### 🔄 **ส่วนที่ 7: State Management & Data Fetching**

- [React Query (Tanstack Query)](documents/32_react_query_tanstack_query.md) - การจัดการ Server State และ Caching
- [Zustand](documents/33_zustand.md) - การจัดการ Client State อย่างง่ายและมีประสิทธิภาพ

### 🔐 **ส่วนที่ 8: Authentication & Authorization**

- [Authentication](documents/34_authenticatin.md) - ระบบ Authentication
- [Authorization](documents/35_authorization.md) - การจัดการสิทธิ์การเข้าถึง

### 🚀 **ส่วนที่ 9: Advanced Features & Optimization**

- [Advanced App Router](documents/36_advance_app_ruoter.md) - การใช้งาน App Router ขั้นสูง
- [SEO](documents/37_seo.md) - การเพิ่มประสิทธิภาพสำหรับ Search Engine
- [React Optimization](documents/38_optimization.md) - เทคนิคการปรับปรุงประสิทธิภาพ React

### 🏗️ **ส่วนที่ 10: Deployment**

- [Deployment](documents/39_deployment.md) - การ Deploy แอปพลิเคชัน
