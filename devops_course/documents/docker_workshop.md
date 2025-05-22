# Docker Workshop

จากโจทย์
```
Workshop นี้จะเป็นการทำความเข้าใจถึงหลักการประกาศ Dockerfile เริ่มต้นให้ทำการ clone โปรเจคจาก Repository นี้ก่อน จากนั้นให้ทำการสร้างไฟล์ Dockerfile ในโฟลเดอร์ site

ซอร์จโค้ดในโฟลเดอร์ site เป็นแอปพลิเคชันแบบเว็บ พัฒนาด้วย Node.js โดยอาศัย Nginx เป็นเว็บเซิฟเวอร์ กรณีที่มี Nginx ติดตั้งอยู่บนเครื่องแล้ว เราสามารถออกคำสั่งตามลำดับต่อไปนี้เพื่อ build และ start แอปพลิเคชันดังกล่าว

1. npm ci (เป็นคำสั่งสำหรับการติดตั้งแพคเกจต่าง ๆ ที่โปรเจคต้องใช้งานในการ build เมื่อออกคำสั่งนี้แพคเกจต่าง ๆ เหล่านั้นจะอยู่ภายใต้โฟลเดอร์ชื่อ node_modules ซึ่งเป็นโฟลเดอร์ที่ถูกสร้างใหม่หลังจากออกคำสั่งนี้)
2. npm run build (ผลลัพธ์จากการ build จะได้โฟลเดอร์ dist)
3. cp -R dist /usr/share/nginx/html (คัดลอกทุกไฟล์ในโฟลเดอร์ dist ไปยัง /usr/share/nginx/html)
4. nginx -g daemon off

จากคำสั่งข้างต้นมีเพียงโฟลเดอร์ dist เท่านั้นที่จำเป็นต่อการรันของเว็บเซิฟเวอร์ (Nginx)

1. จงสร้าง Dockerfile แบบ Multi-stage build โดยใช้ node:21.7-alpine3.18 เป็น Base Image สำหรับส่วน builder และใช้ nginx:1.25.4-alpine เป็น Base Image สำหรับ runner
2. จงสร้างไฟล์ .dockerignore ที่เหมาะสมสำหรับการทำงานของ Dockerfile
```

## เป้าหมายของ Workshop
ในการอบรมครั้งนี้ เราจะได้เรียนรู้การสร้าง Dockerfile แบบ Multi-stage build ซึ่งเป็นเทคนิคที่ช่วยให้สามารถสร้าง Docker image ที่มีขนาดเล็กและมีประสิทธิภาพในการทำงาน
**เราไปทำตามพร้อมๆกันเลยดีกว่าเพื่อนๆ**

## การเตรียมพร้อม
1. Clone โปรเจคจาก Repository
```bash
git clone https://github.com/babelcoder-dummy/intro-devops
```

2. เข้าไปที่โฟลเดอร์ของโปรเจค
```bash
cd intro-devops
```

## ความเข้าใจเกี่ยวกับแอปพลิเคชัน
โปรเจคนี้เป็นแอปพลิเคชันเว็บที่พัฒนาด้วย Node.js และใช้ Nginx เป็นเว็บเซิร์ฟเวอร์ โดยมีขั้นตอนการทำงานดังนี้:

1. ติดตั้งแพคเกจที่จำเป็นด้วยคำสั่ง `npm ci`
2. Build แอปพลิเคชันด้วยคำสั่ง `npm run build` (จะได้ไฟล์ output ในโฟลเดอร์ `dist`)
3. คัดลอกไฟล์จากโฟลเดอร์ `dist` ไปยัง `/usr/share/nginx/html` ซึ่งเป็นตำแหน่งที่ Nginx เรียกใช้ไฟล์เพื่อแสดงผล
4. เริ่มต้น Nginx ด้วยคำสั่ง `nginx -g daemon off`

**หมายเหตุ:** มีเพียงไฟล์ในโฟลเดอร์ `dist` เท่านั้นที่จำเป็นสำหรับการรันแอปพลิเคชันบน Nginx

## โจทย์ที่ต้องทำ
1. สร้างไฟล์ `Dockerfile` แบบ Multi-stage build ในโฟลเดอร์ `site` โดย:
    - ใช้ `node:21.7-alpine3.18` เป็น Base Image สำหรับขั้นตอนการ build (stage: builder)
    - ใช้ `nginx:1.25.4-alpine` เป็น Base Image สำหรับการรันแอปพลิเคชัน (stage: runner)

2. สร้างไฟล์ `.dockerignore` ที่เหมาะสม เพื่อป้องกันไม่ให้ไฟล์หรือโฟลเดอร์ที่ไม่จำเป็นถูกคัดลอกเข้าไปใน Docker image

## วิธีการสร้าง Dockerfile แบบ Multi-stage build

### 1. สร้างไฟล์ Dockerfile ในโฟลเดอร์ site
```dockerfile
# Stage 1: Builder stage
FROM node:21.7-alpine3.18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runner stage
FROM nginx:1.25.4-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. สร้างไฟล์ .dockerignore
```
node_modules
dist
.git
.gitignore
README.md
.DS_Store
```

## คำอธิบาย Dockerfile

### Stage 1: Builder
- `FROM node:21.7-alpine3.18 AS builder` - เริ่มต้นด้วยการใช้ Node.js Alpine เป็น base image และตั้งชื่อ stage นี้ว่า "builder"
- `WORKDIR /app` - กำหนดโฟลเดอร์ที่จะทำงานใน container
- `COPY package*.json ./` - คัดลอกเฉพาะไฟล์ package.json และ package-lock.json มาก่อน (เพื่อใช้ประโยชน์จาก Docker cache)
- `RUN npm ci` - ติดตั้งแพคเกจทั้งหมดตามที่ระบุใน package-lock.json
- `COPY . .` - คัดลอกโค้ดทั้งหมดเข้าไปใน container
- `RUN npm run build` - สั่ง build แอปพลิเคชัน (จะได้ไฟล์ output ในโฟลเดอร์ dist)

### Stage 2: Runner
- `FROM nginx:1.25.4-alpine AS runner` - ใช้ Nginx Alpine เป็น base image สำหรับการรันแอปพลิเคชัน
- `COPY --from=builder /app/dist /usr/share/nginx/html` - คัดลอกเฉพาะไฟล์ในโฟลเดอร์ dist จาก stage builder มาไว้ในโฟลเดอร์ที่ Nginx ใช้แสดงผล
- `EXPOSE 80` - เปิด port 80 เพื่อให้สามารถเข้าถึงแอปพลิเคชันได้
- `CMD ["nginx", "-g", "daemon off;"]` - คำสั่งเริ่มต้น Nginx แบบ foreground mode

## คำอธิบาย .dockerignore
ไฟล์ .dockerignore ใช้เพื่อระบุไฟล์หรือโฟลเดอร์ที่ไม่ต้องการให้ถูกคัดลอกเข้าไปใน Docker image ช่วยให้:
- การ build image เร็วขึ้น (เพราะไม่ต้องคัดลอกไฟล์ที่ไม่จำเป็น)
- ลดขนาดของ context ที่ส่งไปยัง Docker daemon
- ป้องกันการคัดลอกไฟล์ที่อาจมีข้อมูลที่เป็นความลับ

## การ Build และรัน Docker image
```bash
# Build Docker image
docker build -t mywebapp .

# Run container
docker run -p 8080:80 mywebapp
```

หลังจากรันคำสั่งข้างต้น คุณสามารถเข้าถึงแอปพลิเคชันได้ที่ http://localhost:8080

## ประโยชน์ของ Multi-stage build

1. **ลดขนาด image** - image สุดท้ายจะมีเฉพาะไฟล์ที่จำเป็นสำหรับการรันแอปพลิเคชันเท่านั้น (ไม่มีเครื่องมือสำหรับการพัฒนาหรือไฟล์ source code)
2. **เพิ่มความปลอดภัย** - ลดความเสี่ยงที่จะมีช่องโหว่ด้านความปลอดภัยในแพคเกจหรือเครื่องมือที่ใช้เฉพาะในขั้นตอนการ build
3. **แยกกระบวนการ build และ runtime ออกจากกัน** - ทำให้สามารถใช้ base image ที่เหมาะสมกับแต่ละขั้นตอน