# Zustand State Management Tutorial

## 📖 บทนำ

ในหัวข้อนี้เราจะมาเรียนรู้การใช้งาน **Zustand** ซึ่งเป็น State Management Library ที่ช่วยจัดการสถานะ (state) ข้ามหลาย Component ในแอปพลิเคชัน Next.js

## 🤔 ทำไมต้องใช้ State Management?

### ปัญหาที่พบ

ลองจินตนาการสถานการณ์นี้:

```mermaid
graph TD
  A[Edit Leaf Component] -->|แก้ไขข้อมูล| B[กดปุ่ม Edit Leaf]
  B --> C[เปลี่ยนหน้าไป Leaf List]
  C --> D[แสดง Toast Notification: "The leaf has already been updated"]
```

**คำถาม:** Component `EditLeaf` จะส่งข้อความไปแสดงใน `Layout` (ที่ไม่เกี่ยวข้องกันโดยตรง) ได้อย่างไร?

### ข้อจำกัดของ useState

- `useState` ทำงานได้เฉพาะภายใน Component เดียว
- ไม่สามารถแชร์ state ข้าม Component ได้
- ต้องใช้ **Application State** สำหรับการแชร์ข้อมูล

## 🛠️ การติดตั้ง Zustand

```bash
pnpm add zustand immer
```

## 🏗️ สถาปัตยกรรม Store

### 1. Multiple Store vs Single Store

#### Multiple Store (แนะนำสำหรับโปรเจกต์เล็ก)

```
├── features/
│   ├── ui/store.ts          # UI State
│   ├── user/store.ts        # User State
│   └── config/store.ts      # Configuration State
```

#### Single Store (แนะนำสำหรับโปรเจกต์ใหญ่)

```
├── store/
│   ├── ui-slice.ts          # UI Slice
│   ├── user-slice.ts        # User Slice
│   └── index.ts             # Combined Store
```

## 💾 การสร้าง UI Store

### ขั้นตอนที่ 1: สร้างไฟล์ Store

สร้างไฟล์ `features/ui/store.ts`:

```typescript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

// 1. กำหนด Interface ของ State
interface UiState {
  toast: {
    type: "success" | "error";
    message: string;
  } | null;

  // Actions
  setToast: (toast: UiState["toast"]) => void;
  clearToast: () => void;
}

// 2. สร้าง Store
export const useUiStore = create<UiState>()(
  devtools(
    immer((set, get) => ({
      // Initial State
      toast: null,

      // Actions
      setToast: (toast) =>
        set(
          (state) => {
            state.toast = toast;
          },
          false,
          { type: "ui/setToast", toast }
        ),

      clearToast: () =>
        set(
          (state) => {
            state.toast = null;
          },
          false,
          { type: "ui/clearToast" }
        ),
    }))
  )
);
```

### ขั้นตอนที่ 2: เพิ่ม Auto-Hide Feature

```typescript
setToast: (toast) => set(
  (state) => {
  state.toast = toast

  // Auto hide after 3 seconds
  setTimeout(() => {
    get().clearToast()
  }, 3000)
  },
  false,
  { type: 'ui/setToast', toast }
),
```

## 🎯 การใช้งาน Store

### ในหน้า Edit Leaf

```typescript
import { useUiStore } from '@/features/ui/store'

export default function EditLeaf() {
  const setToast = useUiStore(state => state.setToast)

  const handleEditSubmit = async () => {
  try {
    // Edit logic here...

    // แสดง success toast
    setToast({
    type: 'success',
    message: 'The leaf has already been updated'
    })
  } catch (error) {
    // แสดง error toast
    setToast({
    type: 'error',
    message: 'Failed to update leaf'
    })
  }
  }

  return (
  // JSX content...
  )
}
```

### การใช้งานหลายค่าพร้อมกัน (Performance Optimization)

```typescript
import { useShallow } from "zustand/react/shallow";

const [toast, clearToast] = useUiStore(
  useShallow((state) => [state.toast, state.clearToast])
);
```

## 🎨 สร้าง Toast Component

### Toast Component (`components/ui/toast.tsx`)

```typescript
"use client";

import { useUiStore } from "@/features/ui/store";
import { useShallow } from "zustand/react/shallow";

// Icon components
const icons = {
  success: (
    <svg
      className="w-5 h-5 text-green-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export default function Toast() {
  const [toast, clearToast] = useUiStore(
    useShallow((state) => [state.toast, state.clearToast])
  );

  if (!toast) return null;

  return (
    <div
      className={`
    fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50
    ${
      toast.type === "success"
        ? "bg-green-50 border border-green-200"
        : "bg-red-50 border border-red-200"
    }
  `}
    >
      <div className="flex items-center gap-3">
        {icons[toast.type]}
        <p
          className={`
      ${toast.type === "success" ? "text-green-800" : "text-red-800"}
    `}
        >
          {toast.message}
        </p>
        <button
          onClick={clearToast}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
```

## 🔧 เพิ่มใน Layout

```typescript
// app/layout.tsx
import Toast from "@/components/ui/toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
          <Toast />
        </ClientProvider>
      </body>
    </html>
  );
}
```

## 🛠️ Redux DevTools

### การติดตั้ง

1. ติดตั้ง [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
2. เปิด DevTools → Redux Tab

### การดู State Changes

```
Action: ui/setToast
Payload: {
  toast: {
  type: "success",
  message: "The leaf has already been updated"
  }
}
```

## 📊 เปรียบเทียบกับ State Management อื่น

| Feature        | Zustand  | Redux Toolkit | Jotai    |
| -------------- | -------- | ------------- | -------- |
| Bundle Size    | 2.9kb    | 13kb          | 13kb     |
| Learning Curve | ง่าย     | ยาก           | ปานกลาง  |
| TypeScript     | ดีเยี่ยม | ดีเยี่ยม      | ดีเยี่ยม |
| DevTools       | ✅       | ✅            | ✅       |

## 🚀 การปรับปรุงและเพิ่มเติม

### ✨ สิ่งที่ได้ปรับปรุงจากเวอร์ชันเดิม:

1. **เพิ่ม TypeScript Support ที่สมบูรณ์**

   - Interface ที่ชัดเจน
   - Type Safety ในทุก Action

2. **เพิ่ม Performance Optimization**

   - ใช้ `useShallow` สำหรับการเลือกหลายค่า
   - ลด Re-render ที่ไม่จำเป็น

3. **เพิ่ม Auto-Hide Feature**

   - Toast หายไปอัตโนมัติใน 3 วินาที
   - ใช้ `setTimeout` ร่วมกับ `get()`

4. **ปรับปรุง DevTools Integration**

   - Action Names ที่ชัดเจน
   - Payload Logging ที่สมบูรณ์

5. **เพิ่ม Error Handling**
   - รองรับทั้ง Success และ Error Toast
   - Visual Design ที่แตกต่างกัน

### 🎯 ตัวอย่างการใช้งานขั้นสูง

```typescript
// การใช้งานกับ Shopping Cart
interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set) => ({
      items: [],
      total: 0,

      addItem: (item) =>
        set((state) => {
          state.items.push(item);
          state.total = calculateTotal(state.items);
        }),

      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((item) => item.id !== id);
          state.total = calculateTotal(state.items);
        }),

      clearCart: () =>
        set((state) => {
          state.items = [];
          state.total = 0;
        }),
    })),
    { name: "cart-storage" }
  )
);
```

## 📚 เอกสารเพิ่มเติม

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TypeScript Guide](https://github.com/pmndrs/zustand#typescript-usage)
- [Best Practices](https://github.com/pmndrs/zustand/wiki/Best-Practices)

---

> 💡 **คำแนะนำ:** เริ่มต้นด้วย Multiple Store สำหรับโปรเจกต์เล็ก และย้ายไป Single Store เมื่อแอปพลิเคชันขยายใหญ่ขึ้น
