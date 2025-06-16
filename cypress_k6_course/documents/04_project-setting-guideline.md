# การตั้งค่าโปรเจค Cypress + K6

## 📋 สารบัญ
- [เครื่องมือที่ต้องติดตั้ง](#เครื่องมือที่ต้องติดตั้ง)
- [การสร้างโปรเจค](#การสร้างโปรเจค)
- [การติดตั้ง Dependencies](#การติดตั้ง-dependencies)
- [การตั้งค่า ESLint](#การตั้งค่า-eslint)
- [การตั้งค่า Visual Studio Code](#การตั้งค่า-visual-studio-code)
- [การตั้งค่า TypeScript](#การตั้งค่า-typescript)
- [การเริ่มต้นใช้งาน Cypress](#การเริ่มต้นใช้งาน-cypress)
- [การตั้งค่าโปรเจคตัวอย่าง](#การตั้งค่าโปรเจคตัวอย่าง)
- [การแก้ไขปัญหา ESLint (2025)](#การแก้ไขปัญหา-eslint-2025)

---

## 🛠 เครื่องมือที่ต้องติดตั้ง

### 1. Node.js
- **วัตถุประสงค์**: JavaScript runtime สำหรับรันโปรเจค
- **ที่มาพร้อม**: npm (Node Package Manager)
- **ดาวน์โหลด**: [nodejs.org](https://nodejs.org)

### 2. Docker Desktop
- **วัตถุประสงค์**: รันแอปพลิเคชันตัวอย่างในสภาพแวดล้อมที่แยกออกมา
- **ดาวน์โหลด**: [docker.com](https://www.docker.com/products/docker-desktop)

### 3. Visual Studio Code
- **วัตถุประสงค์**: Editor สำหรับเขียนโค้ด
- **ดาวน์โหลด**: [code.visualstudio.com](https://code.visualstudio.com)
- **หลังติดตั้ง**: สามารถใช้คำสั่ง `code` ใน Terminal ได้

> 💡 **สำหรับผู้ใช้ Windows**: แนะนำให้ใช้ Git Bash แทน PowerShell เพื่อความสะดวกในการใช้คำสั่ง Unix-style

---

## 🚀 การสร้างโปรเจค

### 1. สร้าง Folder และเปิดใน VS Code
```bash
# สร้าง folder โปรเจค
mkdir cypress_k6
cd cypress_k6

# เปิดใน VS Code
code .
```

### 2. เริ่มต้นโปรเจค Node.js
```bash
# สร้าง package.json อย่างอัตโนมัติ
npm init -y
```

**ผลลัพธ์**: จะได้ไฟล์ `package.json` ที่เป็นไฟล์หลักในการจัดการ dependencies ของโปรเจค

---

## 📦 การติดตั้ง Dependencies

### การติดตั้งแพ็คเกจหลัก
```bash
npm install -D cypress typescript eslint @antfu/eslint-config
```

**อธิบายแต่ละแพ็คเกจ**:
- `cypress`: เครื่องมือทำ E2E testing
- `typescript`: เพิ่มระบบ type checking ให้ JavaScript
- `eslint`: เครื่องมือตรวจสอบคุณภาพโค้ด
- `@antfu/eslint-config`: ชุดกฎ ESLint ที่พร้อมใช้งาน

> 📝 **Note**: ใช้ `-D` (dev dependency) เพราะเครื่องมือเหล่านี้ใช้เฉพาะในการพัฒนา ไม่ใช่ในการ deploy

---

## ⚙️ การตั้งค่า ESLint

### สร้างไฟล์ `eslint.config.js` (เวอร์ชันเก่า)
```javascript
const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  typescript: true,
  rules: {
    'node/prefer-global/process': 0,
    'no-unused-expressions': 0,
  },
})
```

**อธิบายการตั้งค่า**:
- `typescript: true`: เปิดใช้งาน TypeScript support
- `'node/prefer-global/process': 0`: ปิดการเตือนเรื่อง global process
- `'no-unused-expressions': 0`: ปิดการเตือนเรื่อง unused expressions (สำหรับ Cypress commands)

### เพิ่ม script ใน `package.json`
```json
{
  "scripts": {
    "lint:fix": "eslint . --fix",
    "cy:open": "cypress open"
  }
}
```

**การใช้งาน**:
```bash
# แก้ไขโค้ดให้ตรงมาตรฐานอัตโนมัติ
npm run lint:fix

# เปิด Cypress Studio
npm run cy:open
```

---

## 🎨 การตั้งค่า Visual Studio Code

### สร้างไฟล์ `.vscode/settings.json`
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "eslint.format.enable": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true
}
```

**ฟีเจอร์ที่ได้**:
- ✅ Format โค้ดอัตโนมัติเมื่อ Save
- ✅ ใช้ ESLint เป็น formatter หลัก
- ✅ ตั้ง tab size เป็น 2 spaces

### ติดตั้ง Extension ที่จำเป็น
1. **ESLint**: ตรวจสอบและแก้ไขโค้ดตามมาตรฐาน
2. **Cypress Snippets**: Auto-complete สำหรับ Cypress commands

---

## 📄 การตั้งค่า TypeScript

### สร้างไฟล์ `cypress/tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```

**ความสำคัญ**: ไฟล์นี้บอก TypeScript ว่าต้อง compile โค้ดอย่างไรสำหรับ Cypress

---

## 🎯 การเริ่มต้นใช้งาน Cypress

### 1. เปิด Cypress Studio
```bash
npm run cy:open
```

### 2. เลือกประเภทการทดสอบ
- **E2E Testing**: ทดสอบแอปพลิเคชันทั้งหมด (เลือกตัวนี้)
- **Component Testing**: ทดสอบ component แยกส่วน

### 3. เลือก Browser
- Chrome (แนะนำ)
- Firefox
- Edge
- Electron

### 4. สร้าง Example Specs
- เลือก "Scaffold example specs" เพื่อให้ Cypress สร้างตัวอย่างให้
- ไฟล์ตัวอย่างจะถูกสร้างใน `cypress/e2e/`

---

## 🏗 การตั้งค่าโปรเจคตัวอย่าง

### สร้างไฟล์ `docker-compose.yaml`
```yaml
version: '3.8'
services:
  app:
    image: cypress-k6-asset
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/testdb
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=testdb
    ports:
      - "5432:5432"
```

### เริ่มต้นโปรเจค
```bash
# เริ่มต้น services
docker compose up

# เปิด terminal ใหม่ แล้วรันคำสั่งนี้
docker compose exec -it app sh
prisma migrate deploy
exit
```

### ทดสอบแอปพลิเคชัน
เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

---

## 🔧 การแก้ไขปัญหา ESLint (2025)

### 🚨 ปัญหาที่พบ
```
ReferenceError: require is not defined in ES module scope
```

### ✅ วิธีแก้ไข: อัปเดต `eslint.config.js`

**จากโค้ดเดิม**:
```javascript
const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  typescript: true,
  rules: {
    'node/prefer-global/process': 0,
    'no-unused-expressions': 0,
  },
})
```

**เป็นโค้ดใหม่**:
```javascript
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  rules: {
    'node/prefer-global/process': 'off',
    'no-unused-expressions': 'off',
  },
})
```

### 📝 สิ่งที่เปลี่ยนแปลง
1. **เปลี่ยนจาก CommonJS เป็น ES Modules**
   - `require()` → `import`
   - `module.exports` → `export default`

2. **เปลี่ยนค่า rule**
   - `0` → `'off'` (ชัดเจนกว่า)

### 🎯 เหตุผลที่ต้องแก้ไข
- ESLint เวอร์ชันใหม่ (9.x+) ใช้ ES Modules เป็นหลัก
- การใช้ `'off'` แทน `0` ทำให้โค้ดอ่านง่ายขึ้น

---

## 📚 ไฟล์สำคัญในโปรเจค

```
cypress_k6/
├── .vscode/
│   └── settings.json          # การตั้งค่า VS Code
├── cypress/
│   ├── e2e/                   # ไฟล์ test cases
│   ├── support/               # helper functions
│   └── tsconfig.json          # การตั้งค่า TypeScript
├── eslint.config.js           # การตั้งค่า ESLint
├── docker-compose.yaml        # การตั้งค่า Docker
└── package.json               # ข้อมูลโปรเจคและ dependencies
```

---

## ✨ สรุปการปรับปรุง

### 🆕 สิ่งที่เพิ่มเติมจากเดิม

1. **โครงสร้างที่ชัดเจน**: เพิ่มสารบัญและจัดหมวดหมู่
2. **คำอธิบายเชิงลึก**: อธิบายวัตถุประสงค์ของแต่ละเครื่องมือ
3. **ตัวอย่างโค้ด**: ใส่โค้ดตัวอย่างที่สมบูรณ์
4. **วิธีแก้ไขปัญหา**: เพิ่มส่วนแก้ไขปัญหา ESLint 2025
5. **เคล็ดลับ**: เพิ่ม tips และ best practices
6. **Visual Elements**: ใช้ emoji และ formatting ให้ดูน่าอ่าน

### 🎯 เป้าหมาย
- ทำให้ผู้อ่านเข้าใจขั้นตอนทุกขั้น
- สามารถติดตาม setup ได้โดยไม่ติดขัด
- เตรียมพร้อมสำหรับการแก้ไขปัญหาที่อาจเกิดขึ้น

> 💪 **ความพร้อม**: หลังจากทำตามคู่มือนี้แล้ว คุณจะพร้อมเริ่มเขียน E2E tests ด้วย Cypress!
