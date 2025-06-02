# สบายจ่าย App

Original file is located at
https://colab.research.google.com/drive/1i0ulFDV-G1NEi50ehcrNPceSNKtN0WkI

แน่นอนครับ! ยินดีเป็นอย่างยิ่งที่จะช่วยคุณวางโครงสร้างโปรเจกต์เว็บ **"สบายจ่าย"** โดยใช้ **Next.js (App Router)** สำหรับ Frontend และ **Python (FastAPI)** สำหรับ Backend ตามหลักการ Best Practice ที่คุณต้องการครับ

โครงสร้างนี้จะเน้นเรื่อง **Clean Code, Debug ง่าย, ความเป็นระเบียบ, ความปลอดภัย, UX/UI ที่ดี, การนำกลับมาใช้ซ้ำ (Reusable), และความพร้อมสำหรับการขยาย (Scalability) และการบำรุงรักษา (Maintainability)**

---

## โครงสร้างโปรเจกต์เว็บ "สบายจ่าย"

เราจะแบ่งโครงสร้างออกเป็นสองส่วนหลักคือ Frontend และ Backend เพื่อให้เห็นภาพรวมที่ชัดเจนและแยกส่วนการทำงานออกจากกัน

---

### I. Frontend (Next.js - App Router)

**คุณสมบัติที่เน้น:**

- **Clean Code:** ใช้ TypeScript, ตั้งชื่อฟังก์ชัน/ตัวแปรให้สื่อความหมาย, มี comment เท่าที่จำเป็น, หลีกเลี่ยงโค้ดซ้ำซ้อน
- **Debug ง่าย:** มีโครงสร้างแยกไฟล์ชัดเจน, ใช้ `console.log` หรือ library logging ที่เหมาะสม, มี Error Boundary สำหรับดักจับและแสดงข้อผิดพลาด
- **โครงสร้างเป็นระเบียบ:** แยก folder ตามประเภทของไฟล์ (components, hooks, lib, services) และตามฟังก์ชัน (features) เพื่อให้ง่ายต่อการค้นหาและจัดการ
- **UX/UI:** ใช้ Tailwind CSS เพื่อความ Responsive และการจัดวางองค์ประกอบที่ดี, เน้นการออกแบบที่ใช้งานง่าย
- **Reusable:** สร้าง UI Component ที่เป็น Generic และสามารถนำกลับมาใช้ซ้ำได้ในส่วนต่างๆ ของแอป
- **Scalable & Maintainable:** แยก Concerns ชัดเจน, การจัดการ State ที่เหมาะสม, โค้ดที่อ่านง่ายและเข้าใจง่ายช่วยให้การขยายและบำรุงรักษาในอนาคตทำได้ง่ายขึ้น

#### โครงสร้าง Folder หลัก (Next.js)

```
sabaaijai-web/
├── public/                 # ไฟล์ Static Assets (รูปภาพ, Fonts, Favicon) ที่จะถูก Serve โดยตรง
├── src/                    # โค้ดหลักของแอปพลิเคชัน (แนะนำให้ใช้ src folder เพื่อแยกโค้ดออกจากไฟล์ config)
│   ├── app/                # App Router (การจัดการ Pages, Layouts, API Routes ของ Next.js)
│   │   ├── (auth)/         # Route Group สำหรับหน้าเกี่ยวกับการยืนยันตัวตน (เช่น Login, Register) - ไม่มีผลต่อ URL
│   │   │   ├── login/      # หน้า Login
│   │   │   │   ├── page.tsx          # ไฟล์ Page หลักสำหรับหน้า Login
│   │   │   │   └── form.tsx          # Component ย่อยสำหรับ Form Login (Reusable)
│   │   │   └── register/   # หน้า Register
│   │   │       └── page.tsx          # ไฟล์ Page หลักสำหรับหน้า Register
│   │   ├── (dashboard)/    # Route Group สำหรับหน้า Dashboard ทั้งหมด - ไม่มีผลต่อ URL
│   │   │   ├── layout.tsx  # Layout สำหรับทุกหน้าใน Dashboard (เช่น Sidebar, Header)
│   │   │   ├── page.tsx    # หน้า Overview ของ Dashboard (เช่น สรุปการเงิน)
│   │   │   ├── expenses/   # หน้าจัดการค่าใช้จ่าย
│   │   │   │   ├── page.tsx          # แสดงรายการค่าใช้จ่าย
│   │   │   │   ├── [id]/             # Dynamic Route สำหรับ Expense Detail (เช่น /expenses/123)
│   │   │   │   │   └── page.tsx      # แสดงรายละเอียดค่าใช้จ่ายแต่ละรายการ
│   │   │   │   └── add/              # หน้าเพิ่มค่าใช้จ่าย
│   │   │   │       ├── page.tsx      # ไฟล์ Page หลักสำหรับหน้าเพิ่มค่าใช้จ่าย
│   │   │   │       └── form.tsx      # Component สำหรับ Form เพิ่ม/แก้ไข Expense (รวม AI Scan)
│   │   │   ├── incomes/    # หน้าจัดการรายรับ
│   │   │   │   └── page.tsx
│   │   │   ├── reports/    # หน้าดูรายงานการเงิน
│   │   │   │   └── page.tsx
│   │   │   ├── settings/   # หน้าตั้งค่าส่วนตัว
│   │   │   │   └── page.tsx
│   │   │   └── api/        # API Routes ของ Next.js (สำหรับข้อมูลที่ต้องการ SSR/Server Actions)
│   │   │       ├── expenses/
│   │   │       │   ├── route.ts      # GET /api/expenses (ใน Next.js)
│   │   │       │   ├── [id]/
│   │   │       │   │   └── route.ts  # GET /api/expenses/[id], PUT/DELETE (ใน Next.js)
│   │   │       └── reports/
│   │   │           └── route.ts
│   │   ├── layout.tsx      # Global Root Layout (สำหรับทุกหน้าในแอป)
│   │   ├── loading.tsx     # Global Loading UI (แสดงระหว่างโหลดข้อมูล/Component)
│   │   ├── error.tsx       # Global Error Boundary UI (ดักจับและแสดง Error ทั่วไป)
│   │   ├── not-found.tsx   # Custom 404 Page (เมื่อไม่พบหน้า)
│   │   ├── page.tsx        # Home Page (หน้าแรกสุดของแอป)
│   │   └── globals.css     # Global Styles (เช่น Tailwind CSS base styles)
│   │   └── favicon.ico     # Favicon ของเว็บ
│   ├── assets/             # ไฟล์มีเดียอื่นๆ ที่ไม่ได้อยู่ใน public (เช่น icons, illustrations ที่ใช้ใน Component)
│   │   ├── images/
│   │   ├── icons/
│   │   └── illustrations/
│   ├── components/         # Reusable UI Components ที่ใช้ทั่วทั้งแอป
│   │   ├── ui/             # Generic UI components (Button, Input, Modal, Dialog, Card) - ไม่เกี่ยวข้องกับ Business Logic
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   │   └── index.ts    # Export รวม Components จาก Folder นี้
│   │   ├── common/         # Components ที่ใช้ร่วมกันทั่วแอปและเป็นส่วนหนึ่งของ Layout (Header, Footer, Sidebar, Loader)
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Loader.tsx
│   │   ├── features/       # Components ที่เกี่ยวข้องกับแต่ละ Feature (แต่ยังคง Reusable ได้)
│   │   │   ├── expenses/   # เช่น ExpenseListItem, ExpenseFormFields (ฟอร์มย่อย)
│   │   │   │   └── ExpenseFormFields.tsx
│   │   │   ├── reports/    # เช่น ChartComponent, ReportTable
│   │   │   │   └── ReportChart.tsx
│   │   │   └── auth/       # เช่น AuthProvider (Context), LoginForm (ใช้ในหน้า Login)
│   │   │       └── LoginForm.tsx
│   │   └── shared/         # Components ที่เป็น Generic แต่ไม่จำเพาะเจาะจง UI หรือ Feature
│   │       ├── EmptyState.tsx # เช่น หน้าจอว่างเปล่าเมื่อไม่มีข้อมูล
│   │       └── ErrorMessage.tsx # สำหรับแสดง Error Message
│   ├── hooks/              # Custom React Hooks สำหรับ Logic ที่นำกลับมาใช้ซ้ำได้ หรือจัดการ State ที่ซับซ้อน
│   │   ├── useAuth.ts          # Hook สำหรับจัดการ Authentication State และ User Context
│   │   ├── useDebounce.ts      # Hook สำหรับ Debouncing input หรือ API calls
│   │   ├── useExpenses.ts      # Hook สำหรับเรียกข้อมูลค่าใช้จ่ายและจัดการ State ที่เกี่ยวข้อง
│   │   └── useOCR.ts           # Hook สำหรับจัดการกระบวนการ OCR (เรียกใช้ AI Service)
│   ├── lib/                # Utility functions, helpers, constants, types, configurations
│   │   ├── api.ts              # API client (เช่น Axios instance) สำหรับเรียก Backend API
│   │   ├── constants.ts        # ค่าคงที่ต่างๆ (API_BASE_URL, MAX_FILE_SIZE)
│   │   ├── utils.ts            # ฟังก์ชัน Utility ทั่วไป (formatDate, currencyFormatter, Input validation)
│   │   ├── types.ts            # Global TypeScript types and interfaces
│   │   └── logger.ts           # Utility สำหรับ Logging (ส่งไป Console หรือ Monitoring Service)
│   ├── services/           # Business Logic ที่เกี่ยวข้องกับการเรียก Backend API โดยตรง (แยกจาก Component)
│   │   ├── auth.service.ts     # สำหรับเรียก API Login/Register/Logout
│   │   ├── expense.service.ts  # สำหรับเรียก API จัดการค่าใช้จ่าย (CRUD)
│   │   ├── report.service.ts   # สำหรับเรียก API รายงาน
│   │   └── ai.service.ts       # สำหรับเรียก AI API (OCR, Recommendations)
│   ├── styles/             # Stylesheets เพิ่มเติม (ถ้าไม่ได้ใช้ Tailwind ทั้งหมด หรือมี Global styles อื่นๆ)
│   │   ├── _variables.css
│   │   └── base.css
├── .env.local              # Environment variables สำหรับ Local Development (ไม่ควร commit เข้า Git)
├── next.config.js          # Next.js configuration file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── postcss.config.js       # PostCSS configuration (สำหรับ Tailwind CSS)
├── tailwind.config.ts      # Tailwind CSS configuration
├── README.md               # รายละเอียดโปรเจกต์, วิธีติดตั้ง, วิธีรัน
```

#### คำอธิบาย Folder และไฟล์ตัวอย่าง (Frontend)

- **`src/app/`**:

  - **`page.tsx`**: เป็นไฟล์ที่ Next.js ใช้ในการ Render หน้าเว็บสำหรับแต่ละ Route Segment
  - **`layout.tsx`**: กำหนดโครงสร้าง UI ที่ใช้ร่วมกันสำหรับกลุ่มของหน้าเว็บ เช่น Navbar, Sidebar ที่ปรากฏในหลายหน้า
  - **`loading.tsx`**: UI ที่จะแสดงขึ้นมาในขณะที่ Next.js กำลังโหลดข้อมูลหรือ Component สำหรับ Route นั้นๆ
  - **`error.tsx`**: Component สำหรับดักจับและแสดง Error ที่เกิดขึ้นใน Route นั้นๆ (React Error Boundary)
  - **`not-found.tsx`**: หน้าที่แสดงเมื่อผู้ใช้เข้าถึง URL ที่ไม่มีอยู่จริง (404 Not Found)
  - **`(folderName)/`**: **Route Groups** เป็นวิธีจัดกลุ่ม Route ที่ไม่มีผลต่อ URL จริง ทำให้โครงสร้างไฟล์เป็นระเบียบขึ้น เช่น `(auth)` สำหรับหน้า Login/Register หรือ `(dashboard)` สำหรับหน้าทั้งหมดภายใต้ Dashboard
  - **`api/`**: **Next.js API Routes** เป็น Backend-for-Frontend (BFF) ที่รันบน Serverless Function ของ Next.js เหมาะสำหรับงานที่ต้องการ Server-side Logic เล็กๆ น้อยๆ หรือการซ่อน API Key จาก Frontend (เช่น การเรียก AI API จาก Backend หลัก)

- **`src/components/`**:

  - **`ui/`**: **Generic UI Components** ที่ไม่มี Business Logic เฉพาะเจาะจง เช่น `Button.tsx`, `Input.tsx`, `Modal.tsx`, `Card.tsx` ควรเป็น Pure Component ที่รับ `props` และ Render UI เท่านั้น

    - **`Button.tsx` (ตัวอย่าง):**

      ```typescript jsx
      // src/components/ui/Button.tsx
      import React from "react";

      interface ButtonProps
        extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: "primary" | "secondary" | "outline";
        size?: "small" | "medium" | "large";
        isLoading?: boolean; // Indicates if the button is in a loading state
        children: React.ReactNode;
      }

      const Button: React.FC<ButtonProps> = ({
        variant = "primary",
        size = "medium",
        isLoading = false,
        children,
        className = "",
        ...props // Pass any other standard button props
      }) => {
        // Base styles for all buttons
        const baseStyles =
          "rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200";

        // Styles based on variant prop
        const variantStyles = {
          primary:
            "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
          secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
          outline:
            "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
        };

        // Styles based on size prop
        const sizeStyles = {
          small: "px-3 py-1.5 text-sm",
          medium: "px-4 py-2 text-base",
          large: "px-6 py-3 text-lg",
        };

        return (
          <button
            className={`${baseStyles} ${variantStyles[variant]} ${
              sizeStyles[size]
            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
            disabled={isLoading} // Disable button when loading
            {...props}
          >
            {isLoading ? "Loading..." : children}
          </button>
        );
      };

      export default Button;
      ```

  - **`common/`**: Components ที่เป็นส่วนหนึ่งของ Layout ทั่วไป เช่น `Header.tsx`, `Sidebar.tsx` หรือ `Loader.tsx` ที่ใช้เป็น Loading Overlay ทั่วไป
  - **`features/`**: Components ที่มีความสัมพันธ์กับ Feature ใด Feature หนึ่งโดยเฉพาะ แต่ยังคงสามารถนำกลับมาใช้ซ้ำได้ภายใน Feature นั้นๆ เช่น `ExpenseFormFields.tsx` (ฟอร์มย่อยสำหรับกรอกข้อมูลค่าใช้จ่าย)
  - **`shared/`**: Components ที่เป็น Generic แต่ไม่เกี่ยวกับ UI โดยตรง เช่น `ErrorMessage.tsx` (สำหรับแสดงข้อความ Error), `EmptyState.tsx` (สำหรับแสดงเมื่อไม่มีข้อมูลว่างเปล่า)

- **`src/hooks/`**: **Custom React Hooks** สำหรับ Logic ที่สามารถนำกลับมาใช้ซ้ำได้ หรือจัดการ State ที่ซับซ้อน

  - **`useAuth.ts` (ตัวอย่าง):**

    ```typescript
    // src/hooks/useAuth.ts
    import { useState, useEffect, useCallback } from "react";
    import { AuthService } from "@/services/auth.service"; // Import AuthService from services
    import { User } from "@/lib/types"; // Import User type
    import { logger } from "@/lib/logger"; // For logging

    /**
     * Custom hook for managing authentication state and providing auth-related functions.
     * Handles user login, logout, and checks current authentication status.
     */
    const useAuth = () => {
      const [user, setUser] = useState<User | null>(null);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      // Function to check the current user's authentication status
      const checkAuthStatus = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
          const currentUser = await AuthService.getCurrentUser(); // Call backend to verify token/session
          setUser(currentUser);
          logger.info("Auth status checked successfully.");
        } catch (err: any) {
          logger.error("Auth check failed:", err); // Log detailed error
          setError(err.message || "Failed to authenticate session.");
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }, []);

      // Effect to check auth status on component mount
      useEffect(() => {
        checkAuthStatus();
      }, [checkAuthStatus]);

      /**
       * Handles user login.
       * @param credentials - User's login credentials (e.g., email, password).
       * @returns Promise resolving to User data on success.
       * @throws Error if login fails.
       */
      const login = async (credentials: any): Promise<User> => {
        // Consider a specific type for credentials
        setIsLoading(true);
        setError(null);
        try {
          const userData = await AuthService.login(credentials);
          setUser(userData);
          logger.info("User logged in successfully.");
          return userData; // Return user data on success
        } catch (err: any) {
          logger.error("Login failed:", err);
          setError(
            err.message || "Login failed. Please check your credentials."
          );
          throw err; // Re-throw for component to handle specific error messages
        } finally {
          setIsLoading(false);
        }
      };

      /**
       * Handles user logout.
       */
      const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
          await AuthService.logout();
          setUser(null);
          logger.info("User logged out successfully.");
        } catch (err: any) {
          logger.error("Logout failed:", err);
          setError("Failed to log out. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      return { user, isLoading, error, login, logout, checkAuthStatus };
    };

    export default useAuth;
    ```

- **`src/lib/`**: **Utility functions, constants, types, configurations**

  - **`api.ts`**: สำหรับตั้งค่า Axios instance หรือ Fetch API เพื่อเรียก Backend API

    ```typescript
    // src/lib/api.ts
    import axios from "axios";
    import { getCookie, deleteCookie } from "cookies-next"; // For managing cookies in Next.js
    import { logger } from "./logger"; // For logging

    // Base URL for the backend API, fetched from environment variables
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

    // Create an Axios instance with base configurations
    const api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Important for sending cookies/credentials with requests
    });

    // Add a request interceptor to attach the JWT token to outgoing requests
    api.interceptors.request.use(
      (config) => {
        const token = getCookie("token"); // Retrieve token from cookie (e.g., stored after login)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Attach token as Bearer token
        }
        return config;
      },
      (error) => {
        logger.error("API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Add a response interceptor to handle common API errors, like 401 Unauthorized
    api.interceptors.response.use(
      (response) => response, // If response is successful, just return it
      async (error) => {
        // Check if the error is due to unauthorized access (e.g., expired token)
        if (error.response && error.response.status === 401) {
          logger.warn(
            "Unauthorized access detected. Clearing token and redirecting to login."
          );
          deleteCookie("token"); // Clear the invalid token from cookies
          // Redirect to login page to re-authenticate
          if (typeof window !== "undefined") {
            // Ensure this runs only in browser environment
            window.location.href = "/login"; // Redirect using direct assignment for full page reload
          }
        }
        logger.error(
          "API Response Error:",
          error.response?.data || error.message
        );
        return Promise.reject(error); // Re-throw the error for specific handling in services/components
      }
    );

    export default api;
    ```

  - **`constants.ts`**: สำหรับเก็บค่าคงที่ต่างๆ เช่น API Endpoints, ขนาดไฟล์ที่อนุญาต

    ```typescript
    // src/lib/constants.ts
    export const API_ROUTES = {
      AUTH: "/auth",
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      EXPENSES: "/expenses",
      INCOMES: "/incomes",
      REPORTS: "/reports",
      AI_OCR: "/ai/ocr",
      AI_RECOMMENDATIONS: "/ai/recommendations",
    };

    export const MAX_RECEIPT_FILE_SIZE = 5 * 1024 * 1024; // 5MB for image uploads
    export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

    export const APP_NAME = "สบายจ่าย";
    ```

  - **`utils.ts`**: ฟังก์ชัน Utility ทั่วไป เช่น การจัดรูปแบบวันที่, สกุลเงิน, การ Validate Input

    ```typescript
    // src/lib/utils.ts
    /**
     * Formats a date string into a localized, human-readable format.
     * @param dateString - The date string to format (e.g., "2023-10-26T10:00:00Z").
     * @returns Formatted date string (e.g., "26 ตุลาคม 2566").
     */
    export const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    /**
     * Formats a number as currency.
     * @param amount - The number to format.
     * @param locale - The locale to use for formatting (default: 'th-TH').
     * @param currency - The currency code (default: 'THB').
     * @returns Formatted currency string (e.g., "฿1,234.56").
     */
    export const formatCurrency = (
      amount: number,
      locale = "th-TH",
      currency = "THB"
    ): string => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(amount);
    };

    /**
     * Basic email validation.
     * @param email - The email string to validate.
     * @returns True if the email is valid, false otherwise.
     */
    export const validateEmail = (email: string): boolean => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    /**
     * Debounces a function call, ensuring it's only executed after a certain delay.
     * Useful for optimizing frequent events like input changes or window resizing.
     * @param func - The function to debounce.
     * @param delay - The delay in milliseconds.
     * @returns A debounced version of the function.
     */
    export const debounce = (func: Function, delay: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    };
    ```

  - **`types.ts`**: สำหรับเก็บ TypeScript Interfaces และ Types ทั่วไปที่ใช้ในแอป

    ```typescript
    // src/lib/types.ts
    // User interface
    export interface User {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      // Add other user properties as needed
    }

    // Expense interface
    export interface Expense {
      id: string;
      userId: string;
      amount: number;
      category: string;
      description: string;
      date: string; // ISO 8601 string (e.g., "2023-10-26")
      merchant: string;
      receiptImageUrl?: string; // Optional URL to the uploaded receipt image
      createdAt: string;
      updatedAt: string;
    }

    // Income interface
    export interface Income {
      id: string;
      userId: string;
      amount: number;
      source: string;
      date: string; // ISO 8601 string
      createdAt: string;
      updatedAt: string;
    }

    // OCR Result interface (from AI receipt scan)
    export interface OCRResult {
      totalAmount: number;
      merchantName: string;
      date: string;
      items: { description: string; amount: number }[]; // List of items on the receipt
    }

    // AI Recommendation interface
    export interface AIRecommendation {
      type: "travel" | "spending" | "budget" | "general"; // Type of recommendation
      message: string; // The recommendation message
      details?: any; // Optional detailed data related to the recommendation (e.g., specific routes, categories)
    }

    // Generic API Error interface
    export interface APIError {
      message: string;
      statusCode: number;
      code?: string; // Optional error code
      details?: any; // Optional additional error details
    }
    ```

  - **`logger.ts`**: Utility สำหรับ Logging (ส่งไป Console หรือ Monitoring Service)

    ```typescript
    // src/lib/logger.ts
    // This is a simple logging utility. In a production application,
    // you would integrate with a dedicated logging service like Sentry,
    // Google Cloud Logging, or Datadog for centralized error tracking and monitoring.

    type LogLevel = "info" | "warn" | "error" | "debug";

    /**
     * Logs a message with a specified level and optional context.
     * Messages are only logged to console in non-production environments.
     * In production, they would be sent to a logging service.
     * @param level - The logging level (info, warn, error, debug).
     * @param message - The log message.
     * @param context - Optional additional data to log.
     */
    const log = (level: LogLevel, message: string, context?: any) => {
      if (process.env.NODE_ENV !== "production") {
        // Log to console during development
        console[level](
          `[SabaaiJai-Frontend-${level.toUpperCase()}] ${message}`,
          context || ""
        );
      } else {
        // In production, send to a dedicated logging service
        // Example (pseudo-code for integration):
        // if (level === 'error') {
        //   Sentry.captureException(new Error(message), { extra: context });
        // } else {
        //   GoogleCloudLogger.log({ severity: level.toUpperCase(), message, context });
        // }
        // Fallback to console log in production if no external service is configured
        console[level](
          `[SabaaiJai-Frontend-${level.toUpperCase()}] ${message}`,
          context || ""
        );
      }
    };

    export const logger = {
      info: (message: string, context?: any) => log("info", message, context),
      warn: (message: string, context?: any) => log("warn", message, context),
      error: (message: string, context?: any) => log("error", message, context),
      debug: (message: string, context?: any) => log("debug", message, context),
    };
    ```

- **`src/services/`**: **Business Logic Layers** สำหรับการสื่อสารกับ Backend API โดยตรง แยก Logic การเรียก API ออกจาก Component

  - **`auth.service.ts` (ตัวอย่าง):**

    ```typescript
    // src/services/auth.service.ts
    import api from "@/lib/api"; // Axios instance
    import { API_ROUTES } from "@/lib/constants"; // API endpoint constants
    import { User } from "@/lib/types"; // User interface
    import { setCookie, deleteCookie } from "cookies-next"; // For managing cookies
    import { logger } from "@/lib/logger"; // For logging

    /**
     * Service for handling all authentication-related API calls.
     */
    export const AuthService = {
      /**
       * Logs in a user.
       * @param credentials - User's email and password.
       * @returns Promise resolving to User data on successful login.
       * @throws Error if login fails.
       */
      async login(credentials: any): Promise<User> {
        try {
          const response = await api.post(API_ROUTES.LOGIN, credentials);
          const { user, token } = response.data; // Assuming backend returns user and token
          // Store token in a secure cookie
          setCookie("token", token, {
            maxAge: 60 * 60 * 24 * 7, // 7 days expiration
            path: "/", // Accessible across the entire site
            secure: process.env.NODE_ENV === "production", // Use secure cookie in production (HTTPS)
            sameSite: "Lax", // Protect against CSRF
          });
          logger.info("User logged in successfully via API.");
          return user;
        } catch (error: any) {
          logger.error(
            "AuthService.login API error:",
            error.response?.data || error.message
          );
          throw new Error(
            error.response?.data?.detail ||
              "Login failed. Please check your credentials."
          );
        }
      },

      /**
       * Registers a new user.
       * @param userData - User's registration data (email, password, name).
       * @returns Promise resolving to User data on successful registration.
       * @throws Error if registration fails.
       */
      async register(userData: any): Promise<User> {
        try {
          const response = await api.post(API_ROUTES.REGISTER, userData);
          const { user, token } = response.data;
          setCookie("token", token, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
          });
          logger.info("User registered successfully via API.");
          return user;
        } catch (error: any) {
          logger.error(
            "AuthService.register API error:",
            error.response?.data || error.message
          );
          throw new Error(
            error.response?.data?.detail ||
              "Registration failed. Please try again."
          );
        }
      },

      /**
       * Logs out the current user.
       * @returns Promise resolving when logout is complete.
       * @throws Error if logout fails.
       */
      async logout(): Promise<void> {
        try {
          // Optionally call a backend logout endpoint to invalidate server-side sessions/tokens
          await api.post(API_ROUTES.AUTH + "/logout"); // Example
          deleteCookie("token"); // Clear the token from cookies
          logger.info("User logged out successfully via API.");
        } catch (error: any) {
          logger.error(
            "AuthService.logout API error:",
            error.response?.data || error.message
          );
          throw new Error("Logout failed. Please try again.");
        }
      },

      /**
       * Fetches the current authenticated user's information.
       * @returns Promise resolving to User data or null if not authenticated.
       * @throws Error if fetching user fails (other than 401).
       */
      async getCurrentUser(): Promise<User | null> {
        try {
          const token = getCookie("token");
          if (!token) {
            logger.info("No authentication token found.");
            return null; // No token, so no current user
          }

          // Call a backend endpoint to verify the token and return user info
          const response = await api.get(API_ROUTES.AUTH + "/me");
          return response.data as User;
        } catch (error: any) {
          // If 401, the interceptor handles redirection. For other errors, log and return null.
          if (error.response?.status !== 401) {
            logger.error(
              "AuthService.getCurrentUser API error:",
              error.response?.data || error.message
            );
          }
          deleteCookie("token"); // Clear potentially expired or invalid token
          return null;
        }
      },
    };
    ```

  - **`ai.service.ts`**: สำหรับเรียก AI API (OCR, Recommendations)

    ```typescript
    // src/services/ai.service.ts
    import api from "@/lib/api"; // Axios instance
    import {
      API_ROUTES,
      MAX_RECEIPT_FILE_SIZE,
      ALLOWED_IMAGE_TYPES,
    } from "@/lib/constants"; // Constants
    import { OCRResult, AIRecommendation } from "@/lib/types"; // Types
    import { logger } from "@/lib/logger"; // Logging

    /**
     * Service for interacting with AI-related backend endpoints (OCR, Recommendations).
     */
    export const AIService = {
      /**
       * Sends a receipt image to the backend for OCR processing.
       * @param imageData - The image file of the receipt.
       * @returns Promise resolving to OCRResult containing parsed data.
       * @throws Error if file validation fails or OCR processing fails.
       */
      async scanReceipt(imageData: File): Promise<OCRResult> {
        // Basic client-side validation
        if (!imageData) {
          throw new Error("No image file provided.");
        }
        if (imageData.size > MAX_RECEIPT_FILE_SIZE) {
          throw new Error(
            `File size exceeds the limit of ${
              MAX_RECEIPT_FILE_SIZE / (1024 * 1024)
            } MB.`
          );
        }
        if (!ALLOWED_IMAGE_TYPES.includes(imageData.type)) {
          throw new Error(
            "Invalid file type. Only JPEG, PNG, GIF images are allowed."
          );
        }

        try {
          const formData = new FormData();
          formData.append("file", imageData); // 'file' must match the backend's expected field name

          const response = await api.post(API_ROUTES.AI_OCR, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          });
          logger.info("Receipt scanned successfully via AI service.");
          return response.data as OCRResult;
        } catch (error: any) {
          logger.error(
            "AIService.scanReceipt API error:",
            error.response?.data || error.message
          );
          throw new Error(
            error.response?.data?.detail ||
              "Failed to scan receipt. Please try again."
          );
        }
      },

      /**
       * Fetches AI-driven financial recommendations for a user.
       * @param userId - The ID of the user.
       * @param spendingData - Relevant spending data to inform recommendations.
       * @returns Promise resolving to an array of AIRecommendation objects.
       * @throws Error if fetching recommendations fails.
       */
      async getRecommendations(
        userId: string,
        spendingData: any
      ): Promise<AIRecommendation[]> {
        try {
          // Send relevant spending data to the backend AI endpoint
          const response = await api.post(API_ROUTES.AI_RECOMMENDATIONS, {
            userId,
            spendingData,
          });
          logger.info("AI recommendations fetched successfully.");
          return response.data as AIRecommendation[];
        } catch (error: any) {
          logger.error(
            "AIService.getRecommendations API error:",
            error.response?.data || error.message
          );
          throw new Error(
            error.response?.data?.detail ||
              "Failed to get recommendations. Please try again later."
          );
        }
      },
    };
    ```

---

### II. Backend (Python - FastAPI)

**คุณสมบัติที่เน้น:**

- **Clean Code:** ใช้ Type Hinting, ตั้งชื่อชัดเจน, Docstrings, ใช้ Linter/Formatter (เช่น Black, Pylint) เพื่อรักษา Code Style
- **Debug ง่าย:** ใช้ FastAPI's built-in logging, Integrate กับ Centralized Logging Service (เช่น Google Cloud Logging, Sentry), มี Custom Exception สำหรับ Error ที่เข้าใจง่าย
- **โครงสร้างเป็นระเบียบ:** แยก Concerns ชัดเจน (routers, services, schemas, models, core) ทำให้แต่ละส่วนมีหน้าที่รับผิดชอบเดียว
- **ปลอดภัย (Secure):**
  - **Input Validation:** ใช้ Pydantic ใน FastAPI เพื่อ Validate Request Body และ Query Parameters
  - **Authentication/Authorization:** ใช้ JWT Token สำหรับการยืนยันตัวตนและตรวจสอบสิทธิ์การเข้าถึง
  - **Password Hashing:** ใช้ Bcrypt สำหรับ Hash Password
  - **Rate Limiting:** ป้องกัน Brute-force/DDoS Attacks
  - **CORS:** ตั้งค่า Cross-Origin Resource Sharing อย่างถูกต้อง
  - **Sensitive Data:** ไม่ Log ข้อมูลอ่อนไหว, จัดการข้อมูลผู้ใช้ด้วยความระมัดระวัง
  - **API Security:** บังคับใช้ HTTPS ใน Production, ใช้ Token-based Authentication, Principle of Least Privilege
  - **SQL Injection:** ใช้ ORM (SQLAlchemy) เพื่อป้องกัน SQL Injection
- **Scalable & Maintainable:** Stateless API, Dockerization, การแยก Services ทำให้ง่ายต่อการขยายและบำรุงรักษา

#### โครงสร้าง Folder หลัก (Backend)

```
sabaaijai-backend/
├── app/
│   ├── main.py             # FastAPI application entry point
│   ├── core/               # Core configurations, security utilities, and dependencies
│   │   ├── config.py       # Environment variables, application settings
│   │   ├── security.py     # Password hashing, JWT token encoding/decoding
│   │   └── dependencies.py # Dependency Injection for database session, current authenticated user
│   ├── db/                 # Database related files (ORM setup, session management, models)
│   │   ├── base.py         # Base class for SQLAlchemy declarative models
│   │   ├── session.py      # Database session setup and utility functions
│   │   └── init_db.py      # Script for initial database setup (e.g., create tables, add default data/superuser)
│   ├── models/             # SQLAlchemy ORM models (Define database table schemas)
│   │   ├── user.py
│   │   ├── expense.py
│   │   ├── income.py
│   │   └── category.py
│   ├── schemas/            # Pydantic schemas for request/response validation and serialization
│   │   ├── user.py         # UserCreate, UserResponse, UserUpdate schemas
│   │   ├── auth.py         # Token, LoginRequest schemas
│   │   ├── expense.py      # ExpenseCreate, ExpenseResponse schemas
│   │   ├── income.py       # IncomeCreate, IncomeResponse schemas
│   │   └── ai.py           # Schemas for AI-related requests/responses (OCR, Recommendations)
│   ├── services/           # Business logic layer, interacts with DB models and external APIs
│   │   ├── user_service.py
│   │   ├── auth_service.py
│   │   ├── expense_service.py
│   │   ├── report_service.py
│   │   └── ai_service.py   # Logic for calling Google Vision/Gemini APIs and processing their responses
│   ├── api/                # API Endpoints (FastAPI Routers)
│   │   ├── v1/             # API versioning (e.g., /api/v1)
│   │   │   ├── endpoints/  # Actual API endpoints for each resource
│   │   │   │   ├── auth.py
│   │   │   │   ├── expenses.py
│   │   │   │   ├── incomes.py
│   │   │   │   ├── reports.py
│   │   │   │   └── ai.py
│   │   │   └── api.py      # Master router that includes all endpoint routers for /api/v1
│   ├── middlewares/        # Custom FastAPI Middleware (e.g., for rate limiting, logging)
│   │   └── rate_limiter.py # Example: Simple rate limiting middleware
│   ├── utils/              # General utility functions and helper modules
│   │   ├── logger.py       # Centralized logging setup for the backend
│   │   ├── exceptions.py   # Custom exception classes for specific error handling
│   │   └── email_utils.py  # Utility for sending emails (e.g., password reset, notifications)
│   └── tests/              # Unit and Integration Tests for the application
│       ├── api/            # Tests for API endpoints
│       ├── services/       # Tests for service logic
│       └── models/         # Tests for database models
├── .env                    # Environment variables for local development (ignored by Git)
├── Dockerfile              # Dockerfile for building the application's Docker image
├── docker-compose.yml      # Docker Compose file for orchestrating services (app, db, redis)
├── requirements.txt        # Python dependencies list
├── poetry.lock             # (If using Poetry for dependency management)
├── pyproject.toml          # (If using Poetry)
├── README.md               # Project description, setup instructions, how to run
```

#### คำอธิบาย Folder และไฟล์ตัวอย่าง (Backend)

- **`app/main.py` (Entry Point):**
  """

# app/main.py

    from fastapi import FastAPI, HTTPException, status
    from fastapi.middleware.cors import CORSMiddleware
    from starlette.responses import JSONResponse # For custom exception handling
    from contextlib import asynccontextmanager
    import uvicorn

    from app.core.config import settings
    from app.api.v1.api import api_router
    from app.db.session import engine, Base
    from app.db.init_db import init_db
    from app.utils.logger import logger # Import the logger utility
    # from app.middlewares.rate_limiter import RateLimiterMiddleware # Example middleware

    # Define a lifespan context manager for startup and shutdown events
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        # --- Application Startup Events ---
        logger.info("Application starting up...")

        # Create database tables if they don't exist
        logger.info("Creating database tables if not exist...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables creation complete.")

        # Initialize initial data (e.g., create a superuser, default categories)
        logger.info("Initializing database data...")
        init_db()
        logger.info("Database initialization complete.")

        yield # Application is ready to serve requests

        # --- Application Shutdown Events ---
        logger.info("Application shutting down...")

    # Initialize FastAPI application
    app = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json", # OpenAPI documentation URL
        lifespan=lifespan # Attach the lifespan context manager
    )

    # Configure CORS (Cross-Origin Resource Sharing) middleware
    # This is crucial for allowing your frontend to communicate with the backend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS], # Allowed origins from config
        allow_credentials=True, # Allow cookies/authentication headers
        allow_methods=["*"], # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
        allow_headers=["*"], # Allow all headers
    )

    # Add custom middlewares here (e.g., Rate Limiter)
    # app.add_middleware(RateLimiterMiddleware)

    # Include API routers (version 1)
    app.include_router(api_router, prefix=settings.API_V1_STR)

    # Basic root route for health check
    @app.get("/")
    async def read_root():
        """
        Root endpoint for basic health check.
        """
        return {"message": "Welcome to SabaaiJai API!"}

    # Centralized HTTP Exception Handler
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request, exc: HTTPException):
        """
        Handles FastAPI's HTTPException, returning a standardized JSON response.
        """
        logger.error(f"HTTP Exception: {exc.status_code} - {exc.detail}", extra={"request_url": request.url, "error_detail": exc.detail})
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )

    # Global Exception Handler for any unhandled exceptions
    @app.exception_handler(Exception)
    async def generic_exception_handler(request, exc: Exception):
        """
        Catches any unhandled exceptions and returns a generic 500 error.
        Logs the full traceback for debugging.
        """
        logger.error(f"Unhandled exception occurred: {exc}", exc_info=True, extra={"request_url": request.url})
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "An unexpected error occurred. Please try again later."},
        )

    # To run the application directly (for local development/testing)
    if __name__ == "__main__":
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) # reload=True for development

"""_ **`app/core/`**:
_ **`config.py` (ตัวอย่าง):** สำหรับการจัดการ Environment Variables และการตั้งค่าแอปพลิเคชัน
"""

# app/core/config.py

        from pydantic_settings import BaseSettings, SettingsConfigDict
        import os

        class Settings(BaseSettings):
            """
            Application settings loaded from environment variables or .env file.
            """
            PROJECT_NAME: str = "SabaaiJai API"
            API_V1_STR: str = "/api/v1"

            # Database settings
            DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/sabaaijai_db") # Default for Docker Compose

            # JWT Authentication settings
            SECRET_KEY: str = os.getenv("SECRET_KEY", "your_super_secret_key_here_change_this_in_production") # !!! IMPORTANT: CHANGE THIS IN PRODUCTION !!!
            ALGORITHM: str = "HS256"
            ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # Token expiration time: 7 days

            # CORS settings (list of allowed origins for frontend)
            BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000"]
            # Example for production: ["https://your-frontend-domain.com", "https://www.your-frontend-domain.com"]

            # Google Cloud AI Service credentials
            GOOGLE_CLOUD_PROJECT_ID: str = os.getenv("GOOGLE_CLOUD_PROJECT_ID")
            # Path to Google Service Account Key JSON file (mounted in Docker)
            GOOGLE_APPLICATION_CREDENTIALS: str = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_PATH")

            # Pydantic-settings configuration
            model_config = SettingsConfigDict(env_file=".env", extra="ignore")

        settings = Settings()

"""_ **`security.py`**: สำหรับ Hashing Password (Bcrypt) และ JWT token logic (สร้าง/ถอดรหัส Token)
_ **`dependencies.py`**: สำหรับ Dependency Injection (เช่น `get_db` session, `get_current_user` ที่ตรวจสอบ JWT Token)

- **`app/db/`**:
  _ **`session.py`**: สำหรับการเชื่อมต่อกับฐานข้อมูล (SQLAlchemy) และการจัดการ Session
  _ **`models/`**: \* **`user.py` (ตัวอย่าง SQLAlchemy Model):** กำหนด Schema ของตาราง `users` ในฐานข้อมูล
  """

# app/models/user.py

            from sqlalchemy import Column, String, Boolean
            from sqlalchemy.orm import relationship
            from app.db.base import Base # Import Base from your base.py

            class User(Base):
                """
                SQLAlchemy model for the 'users' table.
                Represents a user in the SabaaiJai application.
                """
                __tablename__ = "users"

                id = Column(String, primary_key=True, index=True) # Unique ID for the user (e.g., UUID)
                email = Column(String, unique=True, index=True, nullable=False) # User's email, must be unique
                hashed_password = Column(String, nullable=False) # Hashed password for security
                first_name = Column(String, nullable=True)
                last_name = Column(String, nullable=True)
                is_active = Column(Boolean, default=True) # Whether the user account is active
                is_superuser = Column(Boolean, default=False) # Whether the user has superuser privileges

                # Relationships to other models (e.g., a user can have many expenses)
                expenses = relationship("Expense", back_populates="owner")
                incomes = relationship("Income", back_populates="owner")

                def __repr__(self):
                    """
                    String representation for debugging.
                    """
                    return f"<User(email='{self.email}', id='{self.id}')>"

"""_ **`app/schemas/`**: **Pydantic Schemas** สำหรับการ Validate Request และ Response ของ API
_ **`auth.py` (ตัวอย่าง):**
"""

# app/schemas/auth.py

        from pydantic import BaseModel, Field
        from typing import Optional

        # Forward reference for UserResponse to avoid circular import
        from app.schemas.user import UserResponse

        class UserCreate(BaseModel):
            """
            Schema for creating a new user (request body).
            """
            email: str = Field(..., example="user@example.com", description="User's email address.")
            password: str = Field(..., min_length=8, example="StrongPassword123", description="User's password (min 8 characters).")
            first_name: Optional[str] = Field(None, example="John", description="User's first name.")
            last_name: Optional[str] = Field(None, example="Doe", description="User's last name.")

        class UserLogin(BaseModel):
            """
            Schema for user login (request body).
            """
            email: str = Field(..., example="user@example.com", description="User's email address.")
            password: str = Field(..., example="StrongPassword123", description="User's password.")

        class Token(BaseModel):
            """
            Schema for the JWT token response after successful login/registration.
            """
            access_token: str = Field(..., example="eyJhbGciOiJIUzI1Ni...", description="The JWT access token.")
            token_type: str = Field("bearer", example="bearer", description="Type of the token.")
            user: UserResponse # Include user details in the token response

        class TokenData(BaseModel):
            """
            Schema for data extracted from the JWT token.
            """
            user_id: Optional[str] = Field(None, description="The ID of the authenticated user.")

        # Pydantic's way to handle forward references (when a schema references another schema not yet defined)
        Token.model_rebuild()

"""_ **`app/services/`**: **Business Logic Layer** ทำหน้าที่เป็นตัวกลางระหว่าง Routers กับ Models (DB) และ External APIs
_ **`auth_service.py` (ตัวอย่าง):**
"""

# app/services/auth_service.py

        import uuid # For generating UUIDs for user IDs
        from sqlalchemy.orm import Session
        from fastapi import HTTPException, status
        from datetime import timedelta

        from app.models.user import User # SQLAlchemy User model
        from app.schemas.auth import UserCreate, UserLogin # Pydantic schemas
        from app.core.security import get_password_hash, verify_password, create_access_token # Security utilities
        from app.core.config import settings # Application settings
        from app.utils.logger import logger # Logger utility

        class AuthService:
            """
            Service class for handling user authentication and registration logic.
            Interacts with the database and security utilities.
            """

            @staticmethod
            def register_user(db: Session, user_in: UserCreate) -> User:
                """
                Registers a new user in the database.
                Args:
                    db: Database session.
                    user_in: Pydantic schema containing user registration data.
                Returns:
                    The newly created User model instance.
                Raises:
                    HTTPException: If the email is already registered.
                """
                logger.info(f"Attempting to register user with email: {user_in.email}")
                # 1. Check if user with the given email already exists
                existing_user = db.query(User).filter(User.email == user_in.email).first()
                if existing_user:
                    logger.warning(f"Registration failed: Email '{user_in.email}' already registered.")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Email already registered."
                    )

                # 2. Hash the plain-text password for secure storage
                hashed_password = get_password_hash(user_in.password)

                # 3. Create a new User database object
                db_user = User(
                    id=str(uuid.uuid4()), # Generate a unique UUID for the user ID
                    email=user_in.email,
                    hashed_password=hashed_password,
                    first_name=user_in.first_name,
                    last_name=user_in.last_name,
                    is_active=True, # New users are active by default
                    is_superuser=False # New users are not superusers by default
                )

                # 4. Add the new user to the database session and commit
                db.add(db_user)
                db.commit()
                db.refresh(db_user) # Refresh the object to get any auto-generated fields (e.g., default values)
                logger.info(f"User '{user_in.email}' registered successfully with ID: {db_user.id}")
                return db_user

            @staticmethod
            def authenticate_user(db: Session, user_in: UserLogin) -> User:
                """
                Authenticates a user by verifying their email and password.
                Args:
                    db: Database session.
                    user_in: Pydantic schema containing user login credentials.
                Returns:
                    The authenticated User model instance.
                Raises:
                    HTTPException: If authentication fails (incorrect email or password).
                """
                logger.info(f"Attempting to authenticate user with email: {user_in.email}")
                user = db.query(User).filter(User.email == user_in.email).first()
                # Check if user exists and if the provided password matches the hashed password
                if not user or not verify_password(user_in.password, user.hashed_password):
                    logger.warning(f"Authentication failed for email: {user_in.email}. Incorrect credentials.")
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Incorrect email or password",
                        headers={"WWW-Authenticate": "Bearer"}, # Standard header for unauthorized access
                    )
                logger.info(f"User '{user_in.email}' authenticated successfully.")
                return user

            @staticmethod
            def create_user_access_token(user: User) -> str:
                """
                Creates a JWT access token for the given user.
                Args:
                    user: The User model instance for whom to create the token.
                Returns:
                    The encoded JWT access token string.
                """
                access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
                access_token = create_access_token(
                    data={"sub": user.id}, # 'sub' (subject) claim stores the user ID
                    expires_delta=access_token_expires
                )
                logger.debug(f"Access token created for user ID: {user.id}")
                return access_token

"""\* **`ai_service.py` (ตัวอย่าง):** สำหรับ Logic การเรียก Google Vision API (OCR) และ Google Gemini API (Recommendations)"""

# app/services/ai_service.py

        from google.cloud import vision_v1p3beta1 as vision # For OCR
        from google.cloud.vision_v1p3beta1 import types
        import google.generativeai as genai # For Gemini (LLM)
        import os
        import json # For parsing JSON from LLM
        import re # For basic regex parsing
        from fastapi import UploadFile, HTTPException, status
        from sqlalchemy.orm import Session # If you need to fetch user data for recommendations

        from app.schemas.ai import OCRResult, AIRecommendation # Pydantic schemas
        from app.core.config import settings # Application settings
        from app.utils.logger import logger # Logger utility
        # from app.models.expense import Expense # Example: if you need to fetch expense data

        # Set Google Application Credentials environment variable from settings
        # This allows Google Cloud client libraries to find your service account key
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.GOOGLE_APPLICATION_CREDENTIALS

        class AIService:
            """
            Service class for interacting with Google Cloud AI services (Vision for OCR, Gemini for recommendations).
            """
            def __init__(self):
                self.vision_client = vision.ImageAnnotatorClient()

                # Configure Gemini API with your API key (if using direct API key)
                # For production, consider using a more secure method like Google Cloud's Vertex AI SDK
                genai.configure(api_key=os.getenv("GEMINI_API_KEY")) # Ensure GEMINI_API_KEY is in .env or env vars
                self.gemini_model = genai.GenerativeModel('gemini-2.0-flash') # Or 'gemini-pro' for more advanced tasks

            async def process_receipt_ocr(self, file: UploadFile) -> OCRResult:
                """
                Processes a receipt image using Google Cloud Vision API for OCR.
                Extracts total amount, merchant name, date, and items from the receipt.
                Args:
                    file: UploadFile object containing the receipt image.
                Returns:
                    OCRResult schema with parsed data.
                Raises:
                    HTTPException: If OCR processing fails or file is invalid.
                """
                logger.info(f"Starting OCR process for file: {file.filename}")
                content = await file.read() # Read the content of the uploaded file
                image = types.Image(content=content) # Create a Vision API Image object

                try:
                    # Call Google Cloud Vision API for document text detection
                    response = self.vision_client.document_text_detection(image=image)
                    full_text = response.full_text_annotation.text # Get the full detected text
                    logger.debug(f"Full OCR Text from {file.filename}: {full_text}")

                    # --- Robust OCR Parsing Logic (Needs significant refinement for production) ---
                    # This part is crucial and often requires complex regex, NLP, or even another LLM call
                    # to accurately extract structured data from varied receipt formats.
                    # For a real-world app, consider:
                    # 1. More advanced regex patterns.
                    # 2. Training a custom NLP model.
                    # 3. Using a specialized receipt parsing API (if available).
                    # 4. Sending the full_text to Gemini/LLM for structured extraction.

                    total_amount = 0.0
                    merchant_name = "ไม่ระบุร้านค้า"
                    date = "ไม่ระบุวันที่"
                    items = []

                    # Example: Rudimentary parsing for total amount
                    # Look for lines containing "total", "sum", "รวม" and try to extract a number
                    total_match = re.search(r'(?:total|sum|รวม|ยอดรวม)\s*[:=]?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)', full_text, re.IGNORECASE)
                    if total_match:
                        try:
                            total_amount = float(total_match.group(1).replace(',', ''))
                        except ValueError:
                            logger.warning(f"Could not parse total amount from: {total_match.group(1)}")

                    # Example: Merchant name (very basic, needs improvement)
                    # Often the first few lines or specific patterns can indicate merchant
                    lines = full_text.split('\n')
                    if len(lines) > 0:
                        merchant_name = lines[0].strip() # Assume first line is merchant, often not true

                    # Example: Date extraction (very basic)
                    date_match = re.search(r'\d{1,2}[/-]\d{1,2}[/-]\d{2,4}', full_text) # DD/MM/YYYY or DD-MM-YYYY
                    if date_match:
                        date = date_match.group(0)

                    # Example: Item extraction (highly complex, often requires LLM or dedicated parser)
                    # For simplicity, leaving items empty or adding placeholder
                    # items.append({"description": "รายการสินค้า (ตัวอย่าง)", "amount": 0.0})


                    logger.info(f"OCR Parsing Result: Total={total_amount}, Merchant='{merchant_name}', Date='{date}'")
                    return OCRResult(
                        totalAmount=total_amount,
                        merchantName=merchant_name,
                        date=date,
                        items=items # This needs to be populated by robust parsing
                    )
                except Exception as e:
                    logger.error(f"Error during OCR processing for {file.filename}: {e}", exc_info=True)
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail=f"Failed to process receipt: {e}"
                    )

            async def get_financial_recommendations(self, user_id: str, spending_data: dict) -> list[AIRecommendation]:
                """
                Generates personalized financial recommendations using Google Gemini (LLM).
                Args:
                    user_id: The ID of the user requesting recommendations.
                    spending_data: A dictionary containing the user's spending habits (e.g., from DB).
                                   This should be comprehensive for good recommendations.
                Returns:
                    A list of AIRecommendation schemas.
                Raises:
                    HTTPException: If recommendation generation fails.
                """
                logger.info(f"Generating AI recommendations for user ID: {user_id}")

                # --- Core AI Recommendation Logic ---
                # This is where you craft the prompt for the LLM based on user's financial data.
                # The quality of recommendations heavily depends on the prompt and the spending_data provided.

                # Example: Fetch more detailed spending data from your database here
                # (e.g., expense_service.get_user_expenses_summary(user_id))
                # For this example, we'll use the passed spending_data directly.

                prompt_text = f"""
                คุณคือผู้เชี่ยวชาญด้านการเงินส่วนบุคคลที่ชาญฉลาดและเป็นมิตร ชื่อ "สบายจ่าย AI"
                โปรดวิเคราะห์ข้อมูลการใช้จ่ายของผู้ใช้ที่มี ID: {user_id} และให้คำแนะนำทางการเงินที่นำไปปฏิบัติได้จริง
                โดยเน้นการลดค่าใช้จ่าย, การจัดงบประมาณอย่างชาญฉลาด, และการระบุจุดที่สามารถประหยัดได้

                ข้อมูลการใช้จ่ายของผู้ใช้:
                {json.dumps(spending_data, indent=2, ensure_ascii=False)}

                หากค่าเดินทางสูง ให้แนะนำเส้นทางหรือวิธีการเดินทางทางเลือกที่ประหยัดและเฉพาะเจาะจง (เช่น รถเมล์สาย, BTS, เดิน)
                หากค่าอาหารนอกบ้านสูง ให้แนะนำวิธีลดค่าใช้จ่าย เช่น การทำอาหารเอง

                โปรดให้คำแนะนำในรูปแบบ JSON Array โดยแต่ละ object มีโครงสร้างดังนี้:
                {{
                    "type": "ประเภทคำแนะนำ (เช่น 'spending', 'travel', 'budget', 'general')",
                    "message": "ข้อความคำแนะนำที่เป็นภาษาไทยและเป็นมิตร",
                    "details": {{ "ข้อมูลเพิ่มเติมที่เกี่ยวข้องกับคำแนะนำนั้นๆ เช่น 'category', 'action', 'from', 'to', 'cheaper_routes', 'estimated_savings_per_day'" }}
                }}
                """

                try:
                    # Call Google Gemini API to generate content
                    # Use generationConfig to request JSON output
                    response = await self.gemini_model.generate_content(
                        prompt_text,
                        generation_config={
                            "response_mime_type": "application/json",
                            "response_schema": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "type": {"type": "STRING"},
                                        "message": {"type": "STRING"},
                                        "details": {"type": "OBJECT", "additionalProperties": True}
                                    },
                                    "required": ["type", "message"]
                                }
                            }
                        }
                    )

                    # Gemini's response.text will be a JSON string
                    recommendations_json_str = response.text
                    recommendations_data = json.loads(recommendations_json_str)

                    # Validate and convert to Pydantic schemas
                    recommendations = [AIRecommendation(**item) for item in recommendations_data]

                    logger.info(f"Successfully generated {len(recommendations)} AI recommendations.")
                    return recommendations
                except Exception as e:
                    logger.error(f"Error generating AI recommendations for user {user_id}: {e}", exc_info=True)
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail=f"Failed to generate recommendations: {e}"
                    )

        # Initialize the AI Service once
        ai_service = AIService()

"""_ **`app/api/v1/endpoints/`**: **API Routers** จัดการ Endpoint ของ API แต่ละ Resource
_ **`auth.py` (ตัวอย่าง):** สำหรับ Endpoint ที่เกี่ยวข้องกับการยืนยันตัวตน (Register, Login, Get Current User)
"""

# app/api/v1/endpoints/auth.py

        from fastapi import APIRouter, Depends, HTTPException, status, Response
        from sqlalchemy.orm import Session # For database session
        from app.db.dependencies import get_db # Dependency to get DB session
        from app.schemas.auth import UserCreate, UserLogin, Token # Auth-related Pydantic schemas
        from app.schemas.user import UserResponse # User response schema
        from app.services.auth_service import AuthService # Auth business logic
        from app.core.dependencies import get_current_user # Dependency to get current authenticated user
        from app.models.user import User # User model for type hinting
        from app.utils.logger import logger # Logger utility

        router = APIRouter()

        @router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED, summary="Register a new user")
        async def register(user_in: UserCreate, db: Session = Depends(get_db)):
            """
            Registers a new user with the provided email, password, and optional name.
            Returns a JWT token upon successful registration.
            """
            logger.info(f"Received registration request for email: {user_in.email}")
            try:
                db_user = AuthService.register_user(db, user_in)
                token = AuthService.create_user_access_token(db_user)
                return {"access_token": token, "token_type": "bearer", "user": db_user}
            except HTTPException as e:
                raise e # Re-raise FastAPI HTTPExceptions
            except Exception as e:
                logger.error(f"Error during user registration: {e}", exc_info=True)
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Registration failed.")

        @router.post("/login", response_model=Token, summary="Authenticate user and get JWT token")
        async def login(user_in: UserLogin, db: Session = Depends(get_db)):
            """
            Authenticates a user with email and password.
            Returns a JWT token upon successful authentication.
            """
            logger.info(f"Received login request for email: {user_in.email}")
            try:
                user = AuthService.authenticate_user(db, user_in)
                token = AuthService.create_user_access_token(user)
                return {"access_token": token, "token_type": "bearer", "user": user}
            except HTTPException as e:
                raise e
            except Exception as e:
                logger.error(f"Error during user login: {e}", exc_info=True)
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Login failed.")

        @router.get("/me", response_model=UserResponse, summary="Get current authenticated user details")
        async def read_current_user(current_user: User = Depends(get_current_user)):
            """
            Retrieves the details of the currently authenticated user.
            Requires a valid JWT token.
            """
            logger.info(f"Fetching details for current user ID: {current_user.id}")
            return current_user

        @router.post("/logout", status_code=status.HTTP_204_NO_CONTENT, summary="Log out the current user")
        async def logout(response: Response):
            """
            Logs out the user by clearing the client-side token.
            (Server-side session invalidation can be added if applicable).
            """
            logger.info("Received logout request.")
            # Invalidate token client-side by clearing the cookie
            response.delete_cookie(key="token") # Assuming token is stored in a cookie
            return # No content to return for 204

"""\* **`ai.py` (ตัวอย่าง):** สำหรับ Endpoint ที่เกี่ยวข้องกับ AI (OCR, Recommendations)"""

# app/api/v1/endpoints/ai.py

        from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
        from app.services.ai_service import ai_service # Import the initialized AI service
        from app.schemas.ai import OCRResult, AIRecommendation # AI-related Pydantic schemas
        from app.core.dependencies import get_current_user # Dependency for authentication
        from app.models.user import User # User model for type hinting
        from app.utils.logger import logger # Logger utility

        router = APIRouter()

        @router.post("/ocr/receipt", response_model=OCRResult, summary="Scan a receipt image using AI OCR")
        async def scan_receipt_endpoint(
            file: UploadFile = File(..., description="Image file of the receipt (JPEG, PNG, GIF)."),
            current_user: User = Depends(get_current_user) # Ensure only authenticated users can upload
        ):
            """
            Uploads a receipt image for OCR processing.
            The AI will attempt to extract financial data like total amount, merchant, and items.
            """
            logger.info(f"User {current_user.id} requested OCR scan for file: {file.filename}")

            # Basic file type validation
            if not file.content_type or not file.content_type.startswith('image/'):
                logger.warning(f"Invalid file type uploaded: {file.content_type}")
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type. Only images are allowed.")

            # File size validation (optional, can be done in service or here)
            # file.file.seek(0, 2) # Move cursor to end to get size
            # file_size = file.file.tell()
            # file.file.seek(0) # Reset cursor to beginning
            # if file_size > MAX_RECEIPT_FILE_SIZE: # MAX_RECEIPT_FILE_SIZE from config or constants
            #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"File too large. Max {MAX_RECEIPT_FILE_SIZE / (1024*1024)} MB allowed.")

            try:
                ocr_result = await ai_service.process_receipt_ocr(file)
                logger.info(f"OCR scan successful for user {current_user.id}.")
                return ocr_result
            except HTTPException as e:
                raise e # Re-raise specific HTTPExceptions from service
            except Exception as e:
                logger.error(f"Failed to process receipt for user {current_user.id}: {e}", exc_info=True)
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to process receipt.")

        @router.post("/recommendations", response_model=list[AIRecommendation], summary="Get AI-driven financial recommendations")
        async def get_ai_recommendations(
            spending_data: dict, # Ideally, this should be a Pydantic schema like SpendingSummaryRequest
            current_user: User = Depends(get_current_user)
        ):
            """
            Requests AI-driven financial recommendations based on the user's spending data.
            The AI will analyze patterns and suggest ways to save or optimize spending.
            """
            logger.info(f"User {current_user.id} requested AI recommendations.")
            try:
                # In a real scenario, you'd likely fetch the user's detailed spending data
                # from your database here using a service (e.g., expense_service.get_user_spending_summary(current_user.id))
                # and then pass that comprehensive data to the AI service.
                # For this example, `spending_data` is passed directly.
                recommendations = await ai_service.get_financial_recommendations(str(current_user.id), spending_data)
                logger.info(f"AI recommendations generated for user {current_user.id}.")
                return recommendations
            except HTTPException as e:
                raise e
            except Exception as e:
                logger.error(f"Failed to get AI recommendations for user {current_user.id}: {e}", exc_info=True)
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to get AI recommendations.")

"""\* **`app/api/v1/api.py` (Master Router):** รวบรวม Router ทั้งหมดเข้าด้วยกัน"""

# app/api/v1/api.py

    from fastapi import APIRouter
    from app.api.v1.endpoints import auth, expenses, incomes, reports, ai # Import all your endpoint routers

    # Create a master API router for version 1
    api_router = APIRouter()

    # Include all individual endpoint routers with their respective prefixes and tags
    api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
    api_router.include_router(expenses.router, prefix="/expenses", tags=["Expenses"])
    api_router.include_router(incomes.router, prefix="/incomes", tags=["Incomes"])
    api_router.include_router_router(reports.router, prefix="/reports", tags=["Reports"])
    api_router.include_router(ai.router, prefix="/ai", tags=["AI Services"])

"""_ **`app/middlewares/`**:
_ **`rate_limiter.py`**: ตัวอย่าง Middleware สำหรับ Rate Limiting (อาจใช้ library เช่น `fastapi-limiter`)
"""

# app/middlewares/rate_limiter.py

        # This is a conceptual example of a simple rate limiter middleware.
        # For a robust production application, consider using a dedicated library like `fastapi-limiter`
        # which integrates with Redis for distributed rate limiting.

        from starlette.middleware.base import BaseHTTPMiddleware
        from starlette.requests import Request
        from starlette.responses import JSONResponse
        from starlette.types import ASGIApp
        import time
        from collections import defaultdict

        class RateLimiterMiddleware(BaseHTTPMiddleware):
            """
            A simple in-memory rate limiting middleware.
            Limits the number of requests per client IP within a given time window.
            NOT suitable for distributed environments (multiple backend instances).
            """
            def __init__(self, app: ASGIApp, requests_per_minute: int = 100):
                super().__init__(app)
                self.requests_per_minute = requests_per_minute
                # Stores timestamps of requests for each IP address
                # {ip_address: [timestamp1, timestamp2, ...]}
                self.request_timestamps = defaultdict(list)

            async def dispatch(self, request: Request, call_next):
                client_ip = request.client.host # Get client IP address

                # Clean up old timestamps (older than 1 minute)
                now = time.time()
                self.request_timestamps[client_ip] = [
                    ts for ts in self.request_timestamps[client_ip] if now - ts < 60
                ]

                # Check if the request limit has been exceeded
                if len(self.request_timestamps[client_ip]) >= self.requests_per_minute:
                    # If limit exceeded, return 429 Too Many Requests
                    return JSONResponse(
                        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                        content={"detail": "Too many requests. Please try again later."},
                        headers={"Retry-After": "60"} # Suggest client to retry after 60 seconds
                    )

                # Add the current request timestamp
                self.request_timestamps[client_ip].append(now)

                # Proceed with the request
                response = await call_next(request)
                return response

"""---

### III. Shared Files (Root Level)

- **`.env` / `.env.local`**: ไฟล์สำหรับเก็บ Environment Variables (ไม่ควร Commit เข้า Git)

  ```
  # .env (for Backend - sabaaijai-backend/.env)
  # Database connection string for PostgreSQL.
  # 'db' is the service name defined in docker-compose.yml
  DATABASE_URL="postgresql://user:password@db:5432/sabaaijai_db"

  # Secret key for signing JWT tokens.
  # !!! IMPORTANT: GENERATE A STRONG, UNIQUE KEY FOR PRODUCTION !!!
  SECRET_KEY="your_very_strong_and_secret_key_for_jwt_signing_1234567890"

  # List of allowed origins for CORS.
  # Add your frontend URL here.
  BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:8000"]

  # Google Cloud Project ID for AI services.
  GOOGLE_CLOUD_PROJECT_ID="your-gcp-project-id"

  # Path to your Google Service Account Key JSON file.
  # This path should be accessible by the Docker container (e.g., mounted volume).
  GOOGLE_APPLICATION_CREDENTIALS_PATH="/app/google-service-account-key.json"

  # API Key for Google Gemini (if using direct API key, not service account for LLM)
  # !!! IMPORTANT: KEEP THIS SECURE IN PRODUCTION !!!
  GEMINI_API_KEY="AIzaSyC_YOUR_GEMINI_API_KEY_HERE"

  # .env.local (for Frontend - sabaaijai-web/.env.local)
  # Base URL for the backend API.
  # This should match the backend's exposed URL and API version prefix.
  NEXT_PUBLIC_API_BASE_URL="http://localhost:8000/api/v1"

  # Any other public environment variables for the frontend.
  ```

- **`Dockerfile` (สำหรับ Backend):** สำหรับการสร้าง Docker Image ของ Backend Application

  ```dockerfile
  # sabaaijai-backend/Dockerfile
  # Use an official Python runtime as a parent image
  FROM python:3.10-slim-buster

  # Set the working directory in the container
  WORKDIR /app

  # Install system dependencies required for psycopg2 (PostgreSQL adapter)
  RUN apt-get update && apt-get install -y \
      build-essential \
      libpq-dev \
      && rm -rf /var/lib/apt/lists/*

  # Copy the requirements file into the container
  COPY requirements.txt ./

  # Install any needed packages specified in requirements.txt
  RUN pip install --no-cache-dir -r requirements.txt

  # Copy the rest of the application code into the container
  COPY . .

  # Expose the port that FastAPI will run on
  EXPOSE 8000

  # Command to run the application using Uvicorn (ASGI server)
  # --host 0.0.0.0 makes the server accessible from outside the container
  CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
  ```

- **`docker-compose.yml` (สำหรับ Backend):** สำหรับการจัดการและรัน Services ต่างๆ (Backend App, Database, Redis) ด้วย Docker Compose

  ```yaml
  # sabaaijai-backend/docker-compose.yml
  version: "3.8" # Specify Docker Compose file format version

  services:
    db:
      image: postgres:14-alpine # Use PostgreSQL 14 with Alpine Linux for smaller image size
      restart: always # Always restart the container if it stops
      env_file:
        - ./.env # Load environment variables from the .env file
      environment:
        POSTGRES_DB: sabaaijai_db # Database name
        POSTGRES_USER: user # Database user
        POSTGRES_PASSWORD: password # Database password
      volumes:
        - postgres_data:/var/lib/postgresql/data/ # Mount a named volume for persistent data
      ports:
        - "5432:5432" # Map host port 5432 to container port 5432 (optional, for direct access)

    redis:
      image: redis:7-alpine # Use Redis 7 with Alpine Linux
      restart: always
      ports:
        - "6379:6379" # Map host port 6379 to container port 6379 (optional)

    backend:
      build: . # Build the Docker image from the Dockerfile in the current directory
      restart: always
      env_file:
        - ./.env # Load environment variables from the .env file
      ports:
        - "8000:8000" # Map host port 8000 to container port 8000
      depends_on:
        - db # Ensure 'db' service starts before 'backend'
        - redis # Ensure 'redis' service starts before 'backend'
      # Mount the Google Service Account Key file into the container
      # IMPORTANT: Replace /path/to/your/google-service-account-key.json with the actual path on your host machine
      volumes:
        - /path/to/your/google-service-account-key.json:/app/google-service-account-key.json:ro # Read-only mount
      environment:
        # Set the environment variable inside the container to point to the mounted key file
        GOOGLE_APPLICATION_CREDENTIALS_PATH: /app/google-service-account-key.json
        # Other environment variables (like SECRET_KEY, DATABASE_URL) will be picked from .env by settings.py

  # Define named volumes for persistent data storage
  volumes:
    postgres_data:
  ```

  **หมายเหตุสำคัญ:**

  - ใน `docker-compose.yml` ตรงส่วน `backend` ภายใต้ `volumes:` คุณต้องเปลี่ยน `/path/to/your/google-service-account-key.json` ให้เป็น **ที่อยู่จริงของไฟล์ Service Account Key JSON** บนเครื่อง Mac ของคุณ
  - ไฟล์ `requirements.txt` จะต้องมี `google-cloud-vision`, `google-generativeai`, `psycopg2-binary`, `uvicorn`, `fastapi`, `sqlalchemy`, `pydantic-settings`, `python-jose[cryptography]`, `passlib[bcrypt]` เป็นอย่างน้อย

---

**สรุปหลักการสำคัญด้านความปลอดภัย:**

1.  **Input Validation & Sanitization:**

    - **Frontend (Next.js):** ใช้ Form Libraries (เช่น React Hook Form, Zod) เพื่อ Validate Input ก่อนส่งไป Backend
    - **Backend (FastAPI):** ใช้ Pydantic Schemas เพื่อ Validate และ Parse Input Data อย่างเข้มงวด ป้องกัน SQL Injection, XSS, และการโจมตีอื่นๆ ที่เกิดจาก Input ที่ไม่ถูกต้อง

2.  **Authentication & Authorization:**

    - ใช้ JWT (JSON Web Tokens) สำหรับการยืนยันตัวตน (Authentication)
    - ทุก API Endpoint ที่ต้องการการป้องกัน จะต้องมีการตรวจสอบ JWT Token และสิทธิ์การเข้าถึง (Authorization) โดยใช้ FastAPI Dependencies (`Depends(get_current_user)`)
    - Password ต้องถูก Hash ด้วย Algorithm ที่แข็งแกร่ง (เช่น Bcrypt) ก่อนบันทึกลงฐานข้อมูล

3.  **HTTPS:**

    - ในการ Deploy จริง ทั้ง Frontend และ Backend จะต้องรันบน HTTPS เสมอ เพื่อเข้ารหัสข้อมูลที่ส่งผ่านเครือข่าย ป้องกันการดักฟังข้อมูล (Man-in-the-Middle Attack)

4.  **Environment Variables:**

    - ไม่ Hardcode Secret Key, API Key, หรือ Credentials ที่ละเอียดอ่อนไว้ในโค้ด
    - ใช้ Environment Variables (`.env` สำหรับ Dev, ระบบจัดการ Secret สำหรับ Prod เช่น Google Secret Manager)
    - ไฟล์ `.env` และ `.env.local` ควรถูก `gitignore` เสมอ

5.  **Error Handling & Logging:**

    - **Backend:** Log Error ที่ละเอียดพร้อม Stack Trace สำหรับ Debugging แต่ไม่ควรเปิดเผยข้อมูลอ่อนไหวแก่ผู้ใช้
    - **Frontend:** แสดง Error Message ที่เป็นมิตรและไม่เปิดเผยรายละเอียดของ Error ภายในระบบ
    - ใช้ Centralized Logging System (เช่น Google Cloud Logging, Sentry) เพื่อรวบรวมและวิเคราะห์ Log จากทั้ง Frontend และ Backend

6.  **CORS (Cross-Origin Resource Sharing):**

    - ตั้งค่า `CORS_ORIGINS` ใน Backend ให้เฉพาะ Domain ของ Frontend ที่ได้รับอนุญาตเท่านั้น เพื่อป้องกันการเรียก API จาก Domain ที่ไม่พึงประสงค์

7.  **Rate Limiting:**

    - จำกัดจำนวน Request ที่ Client แต่ละรายสามารถทำได้ในระยะเวลาหนึ่ง เพื่อป้องกัน Brute-force Attack, DDoS Attack, และการใช้ทรัพยากรเกินควร

8.  **การจัดการไฟล์อัปโหลด:**
    - ตรวจสอบประเภทไฟล์ (MIME type) และขนาดไฟล์ที่อัปโหลด (เช่น รูปใบเสร็จ) ทั้งใน Frontend และ Backend อย่างเข้มงวด

โครงสร้างและตัวอย่างโค้ดเหล่านี้เป็นรากฐานที่แข็งแกร่งสำหรับแอป "สบายจ่าย" ของคุณครับ การปฏิบัติตามหลักการเหล่านี้จะช่วยให้คุณสร้างแอปพลิเคชันที่ปลอดภัย, มีประสิทธิภาพ, และง่ายต่อการพัฒนาและบำรุงรักษาในระยะยาวครับ

<div class="md-recitation">
  Sources
  <ol>
  <li><a href="https://github.com/Hamhunter23/H2S">https://github.com/Hamhunter23/H2S</a></li>
  <li><a href="https://github.com/10000leaves/stock-surge">https://github.com/10000leaves/stock-surge</a></li>
  <li><a href="https://github.com/megovind/to-do-app">https://github.com/megovind/to-do-app</a></li>
  <li><a href="https://github.com/manpreet2000/tabrizz">https://github.com/manpreet2000/tabrizz</a></li>
  <li><a href="https://github.com/AlyssaWendt/search-component">https://github.com/AlyssaWendt/search-component</a></li>
  <li><a href="https://github.com/Dangoz/eth-online">https://github.com/Dangoz/eth-online</a></li>
  <li><a href="https://github.com/AbdelbassetKABOU/OpenQCM">https://github.com/AbdelbassetKABOU/OpenQCM</a></li>
  <li><a href="https://stackoverflow.com/questions/77015126/is-there-any-way-to-overwrite-fastapi-logout-function">https://stackoverflow.com/questions/77015126/is-there-any-way-to-overwrite-fastapi-logout-function</a></li>
  <li><a href="https://stackoverflow.com/questions/71222144/runtimeerror-no-response-returned-in-fastapi-when-refresh-request">https://stackoverflow.com/questions/71222144/runtimeerror-no-response-returned-in-fastapi-when-refresh-request</a></li>
  <li><a href="https://github.com/python-discord/forms-backend">https://github.com/python-discord/forms-backend</a> subject to MIT</li>
  <li><a href="https://github.com/shrikaran-ks-786/studybud">https://github.com/shrikaran-ks-786/studybud</a></li>
  <li><a href="https://univ-nantes.io/E23B114Y/fastapi_encryptfile/-/blob/main/Dockerfile.backend?ref_type=heads">https://univ-nantes.io/E23B114Y/fastapi_encryptfile/-/blob/main/Dockerfile.backend?ref_type=heads</a></li>
  </ol>
</div>
"""
