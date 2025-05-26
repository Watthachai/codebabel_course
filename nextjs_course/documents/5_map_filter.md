# JavaScript Array Methods: Map, Filter, และ Find

## 📋 สารบัญ
- [วิธีการใช้ Method ใน Array](#วิธีการใช้-method-ใน-array)
- [Method vs Function](#method-vs-function)
- [Array Method สำคัญ 3 ตัว](#array-method-สำคัญ-3-ตัว)
    - [Map - การแปลงข้อมูล 1:1](#1-map---การแปลงข้อมูล-11)
    - [Filter - การกรองข้อมูล](#2-filter---การกรองข้อมูล)
    - [Find - การหาข้อมูลตัวแรก](#3-find---การหาข้อมูลตัวแรก)

---

## วิธีการใช้ Method ใน Array

ก่อนที่เราจะเริ่มเรียนรู้ Array Methods เราต้องเข้าใจก่อนว่า **Method** คืออะไร

### Method vs Function

**Function ธรรมดา:**
```javascript
function sayHello() {
        console.log("Hello!");
}
```

**Method (Function ที่อยู่ใน Object):**
```javascript
const person = {
        name: "สมชาย",
        age: 24,
        printDetails: function() {
                console.log(`ชื่อ: ${this.name}, อายุ: ${this.age}`);
        }
        // หรือเขียนแบบสั้นได้
        // printDetails() {
        //     console.log(`ชื่อ: ${this.name}, อายุ: ${this.age}`);
        // }
};

// การเรียกใช้ Method
person.printDetails(); // ชื่อ: สมชาย, อายุ: 24
```

> 💡 **สรุป:** Method คือ Function ที่อยู่ภายใน Object

---

## Array Method สำคัญ 3 ตัว

สำหรับ Array ใน JavaScript มี Method ที่สำคัญและใช้บ่อยมาก โดยเฉพาะใน React มี 3 ตัวหลัก:

### 1. Map - การแปลงข้อมูล 1:1

**📖 คำอธิบาย:** Map ใช้สำหรับการแปลงข้อมูลแต่ละตัวใน Array โดยได้ Array ใหม่ที่มีจำนวนเท่าเดิม

**🎯 Visual Example:**
```
ข้อมูลเดิม:  [1, 2, 3, 4, 5]
                            ↓  ↓  ↓  ↓  ↓  (คูณ 2)
ข้อมูลใหม่:  [2, 4, 6, 8, 10]
```

**💻 Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// แปลงแต่ละตัวโดยคูณ 2
const doubledNumbers = numbers.map(n => n * 2);

console.log("ข้อมูลเดิม:", numbers);        // [1, 2, 3, 4, 5]
console.log("ข้อมูลใหม่:", doubledNumbers); // [2, 4, 6, 8, 10]
```

**🔄 การทำงานของ Map:**
1. วนลูปแต่ละตัวใน Array
2. ส่งค่าแต่ละตัวเข้าไปใน Function
3. เก็บผลลัพธ์ที่ได้จาก Function ใส่ใน Array ใหม่
4. คืน Array ใหม่ออกมา

**✨ ตัวอย่างการใช้งานจริง:**
```javascript
// แปลงชื่อเป็นตัวพิมพ์ใหญ่
const names = ["สมชาย", "สมหญิง", "สมศักดิ์"];
const upperNames = names.map(name => name.toUpperCase());

// แปลง Object
const users = [
        { name: "John", age: 25 },
        { name: "Jane", age: 30 }
];
const usernames = users.map(user => user.name);
```

---

### 2. Filter - การกรองข้อมูล

**📖 คำอธิบาย:** Filter ใช้สำหรับการกรองข้อมูลตามเงื่อนไขที่กำหนด จะได้ Array ใหม่ที่มีเฉพาะข้อมูลที่ตรงตามเงื่อนไข

**🎯 Visual Example:**
```
ข้อมูลเดิม:  [1, 2, 3, 4, 5]
                            ✗  ✓  ✗  ✓  ✗  (เลขคู่เท่านั้น)
ข้อมูลใหม่:     [2,    4]
```

**💻 Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// กรองเอาเฉพาะเลขคู่ (หาร 2 ลงตัว)
const evenNumbers = numbers.filter(n => n % 2 === 0);

console.log("ข้อมูลเดิม:", numbers);      // [1, 2, 3, 4, 5]
console.log("เลขคู่:", evenNumbers);     // [2, 4]
```

**🔄 การทำงานของ Filter:**
1. วนลูปแต่ละตัวใน Array
2. ส่งค่าแต่ละตัวเข้าไปใน Function
3. ถ้า Function คืน `true` → เก็บค่านั้นไว้ใน Array ใหม่
4. ถ้า Function คืน `false` → ไม่เก็บค่านั้น
5. คืน Array ใหม่ออกมา

**✨ ตัวอย่างการใช้งานจริง:**
```javascript
// กรองคนที่อายุมากกว่า 18
const people = [
        { name: "Alice", age: 15 },
        { name: "Bob", age: 25 },
        { name: "Charlie", age: 17 },
        { name: "Diana", age: 30 }
];

const adults = people.filter(person => person.age >= 18);
// ผลลัพธ์: [{ name: "Bob", age: 25 }, { name: "Diana", age: 30 }]

// กรองสินค้าที่ราคาต่ำกว่า 1000
const products = [
        { name: "เสื้อ", price: 500 },
        { name: "กางเกง", price: 1500 },
        { name: "รองเท้า", price: 800 }
];

const cheapProducts = products.filter(product => product.price < 1000);
```

---

### 3. Find - การหาข้อมูลตัวแรก

**📖 คำอธิบาย:** Find ใช้สำหรับการหาข้อมูลตัวแรกที่ตรงตามเงื่อนไข พอเจอแล้วจะหยุดการทำงานทันที

**🎯 Visual Example:**
```
ข้อมูล:      [1, 2, 3, 4, 5]
                            ✗  ✓  STOP!     (หาเลขคู่ตัวแรก)
ผลลัพธ์:      2
```

**💻 Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// หาเลขคู่ตัวแรก
const firstEven = numbers.find(n => n % 2 === 0);

console.log("เลขคู่ตัวแรก:", firstEven); // 2
```

**🔄 การทำงานของ Find:**
1. วนลูปแต่ละตัวใน Array
2. ส่งค่าแต่ละตัวเข้าไปใน Function
3. ถ้า Function คืน `true` → คืนค่านั้นทันทีและหยุดการทำงาน
4. ถ้าไม่เจอเลย → คืน `undefined`

**✨ ตัวอย่างการใช้งานจริง:**
```javascript
// หาผู้ใช้จาก ID
const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
        { id: 3, name: "Bob" }
];

const user = users.find(user => user.id === 2);
console.log(user); // { id: 2, name: "Jane" }

// หาสินค้าแรกที่มีสต็อก
const products = [
        { name: "A", stock: 0 },
        { name: "B", stock: 5 },
        { name: "C", stock: 10 }
];

const availableProduct = products.find(product => product.stock > 0);
```

---

## 📊 สรุปความแตกต่าง

| Method | Input | Output | เมื่อไหร่ใช้ |
|--------|-------|--------|-------------|
| **Map** | Array | Array (จำนวนเท่าเดิม) | ต้องการแปลงข้อมูลทุกตัว |
| **Filter** | Array | Array (จำนวนน้อยกว่าหรือเท่าเดิม) | ต้องการกรองข้อมูลตามเงื่อนไข |
| **Find** | Array | ตัวแปรเดี่ยว หรือ undefined | ต้องการหาข้อมูลตัวแรกที่ตรงเงื่อนไข |

## 🚀 การใช้งานร่วมกัน (Method Chaining)

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// หาเลขคู่ แล้วคูณ 3 แล้วหาตัวแรกที่มากกว่า 10
const result = numbers
        .filter(n => n % 2 === 0)    // [2, 4, 6, 8, 10]
        .map(n => n * 3)             // [6, 12, 18, 24, 30]
        .find(n => n > 10);          // 12

console.log(result); // 12
```

> ⚠️ **หมายเหตุ:** Array Methods เหล่านี้จะไม่แก้ไข Array ต้นฉบับ แต่จะสร้าง Array ใหม่ออกมา (Immutable)

---

**🎓 เคล็ดลับ:** Methods เหล่านี้เป็นพื้นฐานสำคัญมากใน React โดยเฉพาะ Map ที่ใช้แสดงรายการข้อมูล และ Filter ที่ใช้กรองข้อมูลก่อนแสดงผล
