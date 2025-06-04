# การเตรียมโปรเจคสำหรับการ Deploy

## Deployment Guide - จากการพัฒนาสู่การใช้งานจริง

การ Deploy แอปพลิเคชัน Next.js ไปยัง Production เป็นขั้นตอนสำคัญที่ต้องมีการวางแผนและเตรียมการอย่างรอบคอบ เอกสารนี้จะแนะนำขั้นตอนการเตรียมโปรเจคและการ Deploy ด้วย Docker

---

## 📋 รายการขั้นตอนที่ต้องทำ

### ✅ ขั้นตอนที่ 1: สร้างไฟล์ Dockerfile

Dockerfile คือไฟล์คำสั่งที่บอกว่าเราจะสร้าง Docker Image อย่างไรสำหรับแอปพลิเคชันของเรา

```dockerfile
# DEPENDENCIES
FROM --platform=linux/amd64 node:21.5.0-alpine3.18 AS deps
WORKDIR /app

# Install Prisma Client - remove if not using Prisma
COPY prisma ./

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# BUILDER
FROM --platform=linux/amd64 node:21.5.0-alpine3.18 AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXTAPP_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn db:deploy && yarn build; \
  elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run db:deploy && npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run db:deploy && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# RUNNER
FROM --platform=linux/amd64 node:21.5.0-alpine3.18 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**💡 อธิบายโครงสร้าง Dockerfile:**

- **DEPENDENCIES**: ติดตั้ง dependencies ที่จำเป็น
- **BUILDER**: สร้างแอปพลิเคชันและรัน database migration
- **RUNNER**: เตรียม environment สำหรับการรันแอปพลิเคชันบน Production

---

### ✅ ขั้นตอนที่ 2: สร้างไฟล์ .dockerignore

ไฟล์นี้จะบอก Docker ว่าไฟล์ไหนไม่ต้องนำไปใช้ในการสร้าง Image

```dockerignore
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.next
.git
public/uploads
```

**🎯 เหตุผลที่ต้องมี .dockerignore:**

- ลดขนาดของ Docker Image
- เพิ่มความเร็วในการ Build
- ป้องกันไฟล์ที่ไม่จำเป็นเข้าไปใน Production

---

### ✅ ขั้นตอนที่ 3: แก้ไขไฟล์ next.config.mjs

เพิ่มการตั้งค่า `output: 'standalone'` เพื่อให้ Next.js สร้าง bundle ที่พร้อมใช้งานแบบ standalone

```javascript
await import("./features/shared/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone", // 🔥 เพิ่มบรรทัดนี้
  eslint: {
    dirs: ["."],
  },
  redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
    ],
  },
};

export default config;
```

**🚀 ประโยชน์ของ Standalone Mode:**

- สร้าง server ที่พร้อมใช้งานในไฟล์เดียว
- ลดขนาดของ deployment package
- ไม่ต้องพึ่งพา external dependencies ตอน runtime

---

### ✅ ขั้นตอนที่ 4: แก้ไข docker-compose.yml

```yaml
version: "3.9"
services:
  app:
    platform: "linux/amd64"
    build:
      context: .
      dockerfile: Dockerfile
      network: host
      args:
        NEXT_PUBLIC_CLIENTVAR: "clientvar"
        DATABASE_URL: "postgresql://myapp:mypassword@localhost:9111/absence-management?schema=public"
        NEXTAUTH_SECRET: "p0I0oiZgFGhha0eQKzumB5Awyeqe4hQ2jmaQ4t/HuMk="
        NEXTAUTH_URL: "http://localhost:3000"
        NEXTAPP_URL: "http://localhost:3000"
    working_dir: /app
    volumes:
      - ./data/uploads:/app/public/uploads
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "postgresql://myapp:mypassword@db:5432/absence-management?schema=public"
    depends_on:
      - db
  db:
    image: "postgres:15.3-alpine3.18"
    ports:
      - "9111:5432"
    environment:
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: mypassword
    volumes:
      - ./data/pg:/var/lib/postgresql/data
```

**⚠️ หมายเหตุสำคัญ:**

- ในการใช้งานจริง ไม่ควรเขียน Secret ลงไปตรงๆ ควรใช้ Environment Variables หรือ Secret Management
- Volume mapping ช่วยให้ข้อมูลไม่หายไปเมื่อ Container ถูกลบ

---

### ✅ ขั้นตอนที่ 5: เพิ่มบรรทัดใน .gitignore

```gitignore
# Docker Data
data
```

**📁 เหตุผล:** โฟลเดอร์ `data` ใช้เก็บข้อมูลจาก Docker Volume ไม่ควร commit ขึ้น Git

---

### ✅ ขั้นตอนที่ 6: เพิ่ม script ใน package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --fix",
    "db:seed": "prisma db seed",
    "db:push": "prisma db push",
    "db:deploy": "prisma migrate deploy"
  }
}
```

**🔄 script `db:deploy`:** ใช้สำหรับรัน database migration บน Production

---

## 🚨 ปัญหาการอัปโหลดไฟล์ใน Production

### ปัญหาที่พบ

Next.js จะ serve ไฟล์ใน `public` folder ได้เฉพาะไฟล์ที่มีอยู่ตอน build time เท่านั้น ไฟล์ที่อัปโหลดหลัง build จะไม่สามารถเข้าถึงได้

### ✅ วิธีแก้ไข: สร้าง API Route สำหรับ serve ไฟล์

สร้างไฟล์ `app/api/uploads/[...path]/route.ts`:

```typescript
import { readFile } from "fs/promises";

interface Params {
  params: {
    path: string[];
  };
}

export const GET = async (req: Request, { params: { path } }: Params) => {
  const publicDir = __dirname.split(".next")[0] + "public/uploads/";
  const fileUrl = path.join("/");
  const file = await readFile(`${publicDir}${fileUrl}`);

  return new Response(file);
};
```

### ✅ แก้ไข Helper Function

แก้ไขไฟล์ `features/shared/helpers/upload.ts`:

```typescript
import * as z from "zod";

export function getImagePath(file: string): string;
export function getImagePath(file?: null): undefined;
export function getImagePath(file?: string | null) {
  if (!file) return;

  try {
    z.string().url().parse(file);
    return file;
  } catch {
    return `/api/uploads/${file}`; // 🔥 เปลี่ยนจาก `/uploads/${file}`
  }
}
```

---

## 🚀 การ Deploy

### ขั้นตอนการ Deploy:

1. **Start Database:**

   ```bash
   docker compose up db
   ```

2. **Start Application:**
   ```bash
   docker compose up app
   ```

### 📊 Flow Chart การ Deploy

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Source Code   │ -> │   Build Image   │ -> │  Run Container  │
│    + Docker     │    │  (Docker Build) │    │ (Docker Compose)│
│   Configuration │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         v                       v                       v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ - Dockerfile    │    │ - Install deps  │    │ - App running   │
│ - .dockerignore │    │ - Run migration │    │ - DB connected  │
│ - docker-compose│    │ - Build app     │    │ - Files served  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🛠️ การแก้ไขและปรับปรุงเพิ่มเติม

### ✨ การปรับปรุงจากเวอร์ชันเดิม:

1. **🔧 ปรับปรุง Dockerfile:**

   - เพิ่ม multi-stage build เพื่อลดขนาด image
   - ใช้ Alpine Linux เพื่อความเบาและปลอดภัย
   - เพิ่มการจัดการ permissions ที่ดีขึ้น

2. **📁 ปรับปรุงการจัดการไฟล์:**

   - เพิ่ม Volume mapping สำหรับ uploads และ database
   - ปรับปรุง .dockerignore ให้ครอบคลุมมากขึ้น

3. **🔐 ปรับปรุงความปลอดภัย:**

   - รัน application ด้วย non-root user
   - แยก environment variables ระหว่าง build time และ run time

4. **🚀 ปรับปรุงประสิทธิภาพ:**
   - ใช้ standalone mode เพื่อลดขนาด deployment
   - เพิ่ม caching layers ใน Dockerfile

---

## 📝 หมายเหตุสำหรับทีม

### สำหรับ Development Team:

- ตรวจสอบให้แน่ใจว่าได้ test การ build locally ก่อน push code
- ใช้ environment variables แทนการ hardcode values
- อัปเดต documentation เมื่อมีการเปลี่ยนแปลง configuration

### สำหรับ DevOps Team:

- พิจารณาใช้ CI/CD pipeline สำหรับการ deploy อัตโนมัติ
- ตั้งค่า monitoring และ logging
- วางแผน backup strategy สำหรับ database และ uploaded files

### สำหรับ Production:

- ใช้ VPS หรือ Cloud services เช่น Digital Ocean, AWS, GCP
- ตั้งค่า reverse proxy (Nginx) สำหรับ SSL และ load balancing
- ใช้ orchestration tools เช่น Kubernetes สำหรับ large-scale deployment

---

## 🎯 Next Steps

1. **ทดสอบการ Deploy:** ทดสอบบน staging environment ก่อน production
2. **ตั้งค่า CI/CD:** ใช้ GitHub Actions หรือ GitLab CI สำหรับ automated deployment
3. **Monitoring:** ตั้งค่า application monitoring และ error tracking
4. **Backup Strategy:** วางแผนการ backup database และ uploaded files

---

**✅ พร้อมสำหรับการ Deploy แล้ว!**

หากมีปัญหาหรือข้อสงสัย สามารถติดต่อทีม DevOps หรือเปิด issue ใน repository ได้เลยครับ 🚀
