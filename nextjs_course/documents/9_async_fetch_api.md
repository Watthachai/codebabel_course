# Async และการใช้งาน Fetch API

## 📚 เนื้อหาที่จะได้เรียนรู้

- การทำความเข้าใจ Synchronous vs Asynchronous
- การใช้งาน setTimeout เป็นตัวอย่าง
- การทำงานของ Callback Functions
- Promise และการใช้งาน async/await
- การใช้งาน Fetch API แบบจริง
- การสร้าง Mock Server ด้วย JSON Server

---

## ⏰ Synchronous vs Asynchronous คืออะไร?

### 🔄 Synchronous (ประสานจังหวะ)
```
Task 1 → Task 2 → Task 3
```
- ทำงานเป็นลำดับ ทีละงาน
- ต้องรอให้งานก่อนหน้าเสร็จก่อน

### ⚡ Asynchronous (ไม่ประสานจังหวะ)
```
Task 1 → Task 3
    ↓
Task 2 (ทำทีหลัง)
```
- สามารถข้ามไปทำงานอื่นได้
- กลับมาทำงานที่ค้างไว้เมื่อพร้อม

---

## 🕐 ตัวอย่างด้วย setTimeout

### การทำงานแบบ Asynchronous

```javascript
console.log("1");           // พิมพ์ทันที
setTimeout(() => {
     console.log("2");       // รอ 1 วินาที
}, 1000);
console.log("3");           // พิมพ์ทันที
```

**ผลลัพธ์:** `1 → 3 → 2`

### ❓ ทำไมไม่ใช่ 1 → 2 → 3?

เพราะ JavaScript ทำงานแบบนี้:

1. **ทำ Synchronous Code ก่อน** (บรรทัด 1 และ 3)
2. **Register Callback** สำหรับ Asynchronous Code (บรรทัด 2)
3. **กลับมาทำ Callback ทีหลัง** เมื่อเวลาครบ

```mermaid
graph TD
     A[console.log "1"] --> B[setTimeout Register Callback]
     B --> C[console.log "3"]
     C --> D[Wait 1 second...]
     D --> E[Execute Callback: console.log "2"]
```

---

## 🌐 ทำไม JavaScript ถึงต้อง Asynchronous?

### 💡 เหตุผล: ป้องกันเว็บค้าง

**หากเป็น Synchronous:**
- คลิกปุ่ม → ส่ง Request → รอ Response → เมาส์ขยับไม่ได้!
- ผู้ใช้จะรู้สึกว่าเว็บค้าง

**เมื่อเป็น Asynchronous:**
- คลิกปุ่ม → ส่ง Request → เมาส์ยังขยับได้
- เมื่อ Response มา → ประมวลผลต่อ

---

## 🔄 Callback Functions

### 📝 คำจำกัดความ
**Callback** = ฟังก์ชันที่ถูกเรียกทีหลัง (Call Back Later)

### 🏗️ วิธีการทำงาน

```javascript
// ส่ง Request
fetchData('https://api.example.com/books', function(response) {
     // ← นี่คือ Callback Function
     console.log(response);
     
     // ถ้าต้องการ fetch ต่อ...
     fetchData('https://api.example.com/authors', function(response2) {
          console.log(response2);
          
          // ถ้าต้องการ fetch ต่อ...
          fetchData('https://api.example.com/reviews', function(response3) {
                // Callback Hell! 😱
          });
     });
});
```

### ⚠️ ปัญหา: Callback Hell
- โค้ดซ้อนหลายชั้น
- ยากต่อการอ่านและดูแล
- ข้อผิดพลาดง่าย

---

## 🤝 Promise: ทางออกจาก Callback Hell

### 💭 Promise คืออะไร?
**Promise** = คำสัญญาว่าในอนาคตจะมีผลลัพธ์ (สำเร็จ หรือ ล้มเหลว)

### 🔧 วิธีใช้งาน Promise

#### Method 1: ใช้ .then()
```javascript
fetch('https://api.example.com/books')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error));
```

#### Method 2: ใช้ async/await (แนะนำ)
```javascript
async function getBooks() {
     try {
          const response = await fetch('https://api.example.com/books');
          const data = await response.json();
          console.log(data);
     } catch (error) {
          console.error(error);
     }
}
```

### 📊 เปรียบเทียบ

| Callback | Promise (.then) | Async/Await |
|----------|----------------|-------------|
| ซ้อนหลายชั้น | เรียงต่อกัน | เหมือนโค้ดปกติ |
| ยากอ่าน | อ่านได้ | อ่านง่ายที่สุด |
| จัดการ Error ยาก | มี .catch() | มี try/catch |

---

## 🚀 Hands-on: สร้าง Project จริง

### 📁 โครงสร้าง Project

```
fetch-demo/
├── api/              # Mock Server
│   ├── package.json
│   └── db.json      # ฐานข้อมูลจำลอง
└── ui/              # Client Code
     ├── package.json
     └── main.mjs     # โค้ดหลัก
```

### 🔧 Setup API Server

1. **สร้างโฟลเดอร์และติดตั้ง json-server:**
```bash
mkdir fetch-demo && cd fetch-demo
mkdir api ui

# Setup API
cd api
npm init -y
npm add json-server
```

2. **สร้างฐานข้อมูลจำลอง (db.json):**
```json
{
  "books": [
     {
        "id": 1,
        "title": "JavaScript Guide",
        "description": "Complete guide to JavaScript"
     },
     {
        "id": 2,
        "title": "React Handbook",
        "description": "Learn React from scratch"
     }
  ]
}
```

3. **เพิ่ม Scripts ใน package.json:**
```json
{
  "scripts": {
     "dev": "json-server --watch db.json --port 5151"
  }
}
```

### 🖥️ Setup Client

```bash
# Setup UI
cd ../ui
npm init -y
```

**package.json:**
```json
{
  "scripts": {
     "dev": "node --watch main.mjs"
  }
}
```

---

## 🔍 การใช้งาน Fetch API

### 📖 1. GET: ดึงข้อมูล

```javascript
async function getBooks() {
     try {
          // 1. ส่ง Request
          const response = await fetch('http://localhost:5151/books');
          
          // 2. แปลง Response เป็น JSON
          const books = await response.json();
          
          // 3. แสดงผล
          console.log('Books:', books);
     } catch (error) {
          console.error('Error:', error);
     }
}

// เรียกใช้งาน
getBooks();
```

### ➕ 2. POST: สร้างข้อมูลใหม่

```javascript
async function createBook() {
     try {
          const response = await fetch('http://localhost:5151/books', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                     title: "New Book Title",
                     description: "New book description"
                })
          });
          
          const newBook = await response.json();
          console.log('Created:', newBook);
     } catch (error) {
          console.error('Error:', error);
     }
}
```

### ✏️ 3. PATCH: แก้ไขข้อมูล

```javascript
async function updateBook(id) {
     try {
          const response = await fetch(`http://localhost:5151/books/${id}`, {
                method: 'PATCH',
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                     title: "Updated Title",
                     description: "Updated description"
                })
          });
          
          const updatedBook = await response.json();
          console.log('Updated:', updatedBook);
     } catch (error) {
          console.error('Error:', error);
     }
}
```

---

## 🎯 สิ่งสำคัญที่ต้องจำ

### ✅ Best Practices

1. **ใช้ async/await แทน .then()**
    - อ่านง่ายกว่า
    - จัดการ Error สะดวกกว่า

2. **อย่าลืม try/catch**
    - ป้องกันแอปพลิเคชันล่ม
    - แสดงข้อผิดพลาดที่เป็นมิตร

3. **ระบุ Content-Type ให้ถูกต้อง**
    - JSON: `application/json`
    - Form Data: `multipart/form-data`

4. **ตรวจสอบ HTTP Status**
    ```javascript
    if (!response.ok) {
         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    ```

### 🔧 การรัน Project

```bash
# Terminal 1: Start API Server
cd api
npm run dev

# Terminal 2: Start Client
cd ui
npm run dev
```

### 🌟 ผลลัพธ์ที่คาดหวัง

เมื่อรันโค้ดจะเห็น:
- ข้อมูลหนังสือถูกดึงมาแสดง
- สามารถสร้างหนังสือใหม่ได้
- สามารถแก้ไขข้อมูลได้
- ข้อมูลใน db.json จะอัพเดทตาม

---

## 🎉 สรุป

การเรียนรู้ Async และ Fetch API จะช่วยให้เราสามารถ:
- สร้างเว็บที่ไม่ค้าง
- ดึงข้อมูลจาก API ได้
- จัดการข้อมูลแบบ Real-time
- เข้าใจการทำงานของ Modern Web Applications

**Next Step:** นำความรู้นี้ไปใช้กับ Next.js เพื่อสร้างเว็บแอปพลิเคชันที่สมบูรณ์!
