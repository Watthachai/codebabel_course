# 3. Arrow Functions, Spread, Rest, Destructuring

## การเตรียมพร้อม - สร้าง Project เบื้องต้น

### สร้าง Project Directory
```bash
mkdir ts-demo
cd ts-demo
code .
```

### เริ่มต้น Node.js Project
```bash
npm init -y
```

### สร้างไฟล์ main.mjs
เนื่องจากเราจะใช้ ES modules แทน CommonJS เพื่อให้ทันสมัยและเข้ากับ React
```javascript
// main.mjs
console.log("Hello World");
```

### เพิ่ม Script ใน package.json
```json
{
    "scripts": {
        "dev": "node --watch main.mjs"
    }
}
```

### รัน Project
```bash
npm run dev
```

---

## การประกาศตัวแปร (Variable Declaration)

### สามวิธีหลักในการประกาศตัวแปร

#### 1. `var` (ไม่แนะนำให้ใช้)
```javascript
var oldStyle = "ไม่ควรใช้";
```

#### 2. `let` (สำหรับค่าที่เปลี่ยนแปลงได้)
```javascript
let age = 25;
age = 26; // สามารถเปลี่ยนค่าได้
console.log(age); // 26
```

#### 3. `const` (สำหรับค่าคงที่)
```javascript
const name = "สมชาย";
// name = "สมหญิง"; // Error! ไม่สามารถเปลี่ยนค่าได้
```

**หลักการใช้งาน:** พยายามใช้ `const` ให้มากที่สุด หากไม่สามารถใช้ได้จึงใช้ `let`

---

## ชนิดข้อมูล (Data Types)

### Primitive Data Types
```javascript
const number = 42;
const text = "Hello";
const isActive = true;
```

### Object Data Type
```javascript
const book = {
    id: 1,
    title: "JavaScript Guide",
    description: "เรียนรู้ JavaScript"
};

// เข้าถึงข้อมูลใน Object
console.log(book.title); // "JavaScript Guide"
console.log(book["title"]); // "JavaScript Guide"

// แก้ไขข้อมูลใน Object
book.description = "คู่มือ JavaScript ฉบับสมบูรณ์";
```

### Array Data Type
```javascript
const numbers = [1, 2, 3, 4, 5];

// เข้าถึงข้อมูลใน Array
console.log(numbers[0]); // 1
console.log(numbers[2]); // 3

// Array ก็คือ Object ในรูปแบบพิเศษ
// จริงๆ แล้ว Array เก็บข้อมูลแบบนี้:
// { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }
```

### ทำไม const Object/Array ถึงแก้ไขได้?
```javascript
const book = { title: "Original" };
book.title = "Modified"; // ทำได้! เพราะว่า...

// const เก็บ "ตัวชี้" (reference) ไปยัง Object
// ไม่ใช่เก็บ Object โดยตรง
// เมื่อเราแก้ไข Object เราไม่ได้เปลี่ยน "ตัวชี้"
// เราแค่เปลี่ยนข้อมูลที่ตัวชี้ชี้ไป
```

---

## Destructuring - การทำลายโครงสร้าง

### Object Destructuring

#### การใช้งานพื้นฐาน
```javascript
const person = {
    name: "สมชาย",
    age: 24,
    email: "somchai@email.com"
};

// แบบเดิม
const name = person.name;
const age = person.age;
const email = person.email;

// แบบ Destructuring (เขียนสั้นลง)
const { name, age, email } = person;
console.log(name, age, email); // สมชาย 24 somchai@email.com
```

#### การเปลี่ยนชื่อตัวแปร
```javascript
const person = {
    name: "สมชาย",
    age: 24,
    sex: "male"
};

// เปลี่ยนชื่อ sex เป็น gender
const { name, age, sex: gender } = person;
console.log(gender); // "male"
```

#### การกำหนดค่าเริ่มต้น
```javascript
const person = {
    name: "สมชาย",
    age: 24
    // ไม่มี email
};

// กำหนดค่าเริ่มต้นกรณีไม่มีข้อมูล
const { name, age, email = "ไม่ระบุ" } = person;
console.log(email); // "ไม่ระบุ"
```

#### Nested Object Destructuring
```javascript
const person = {
    name: "สมชาย",
    age: 24,
    social: {
        line: "@somchai",
        facebook: "somchai.fb"
    }
};

// ดึงข้อมูลจาก Object ซ้อน Object
const { 
    name, 
    age, 
    social: { line, facebook } 
} = person;

console.log(line, facebook); // @somchai somchai.fb
// หมายเหตุ: ตัวแปร social จะไม่ถูกสร้างขึ้น
```

### Array Destructuring

#### การใช้งานพื้นฐาน
```javascript
const languages = ["Thai", "Chinese", "English"];

// แบบเดิม
const thai = languages[0];
const english = languages[2];

// แบบ Destructuring
const [thai, , english] = languages; // ข้าม Chinese
console.log(thai, english); // Thai English
```

#### ความแตกต่างระหว่าง Object และ Array Destructuring
- **Object:** สำคัญที่ชื่อ key (ลำดับไม่สำคัญ)
- **Array:** สำคัญที่ลำดับ (ตำแหน่งสำคัญ)

---

## Spread Operator - การกระจาย

### Array Spread
```javascript
const numbers1 = [1, 2, 3];
const numbers2 = [4, 5];

// รวม Array
const allNumbers = [...numbers1, ...numbers2];
console.log(allNumbers); // [1, 2, 3, 4, 5]

// เพิ่มตัวเลขตรงกลาง
const withMiddle = [...numbers1, 99, ...numbers2];
console.log(withMiddle); // [1, 2, 3, 99, 4, 5]
```

### Object Spread
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// รวม Object
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// กรณี key ซ้ำกัน (ตัวหลังทับตัวแรก)
const obj3 = { a: 1, b: 2 };
const obj4 = { a: 99, c: 3 };
const result = { ...obj3, ...obj4 };
console.log(result); // { a: 99, b: 2, c: 3 }
```

### ใช้งานกับ Function
```javascript
const numbers = [1, 5, 3, 9, 2];

// Math.min ต้องการตัวเลขแยกกัน ไม่ใช่ Array
console.log(Math.min(...numbers)); // 1
// เหมือนกับ Math.min(1, 5, 3, 9, 2)
```

---

## Rest Operator - การเก็บส่วนที่เหลือ

### Object Rest
```javascript
const book = {
    id: 1,
    title: "JavaScript Guide",
    description: "คู่มือเรียน JS",
    author: "สมชาย"
};

// ดึง id ออกมา, ส่วนที่เหลือเก็บใน rest
const { id, ...rest } = book;
console.log(id); // 1
console.log(rest); 
// { title: "JavaScript Guide", description: "คู่มือเรียน JS", author: "สมชาย" }
```

### Array Rest
```javascript
const numbers = [1, 2, 3, 4, 5];

// ดึงตัวแรกออกมา, ส่วนที่เหลือเก็บใน rest
const [first, ...rest] = numbers;
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
```

### Function Parameters Rest
```javascript
// รับพารามิเตอร์ไม่จำกัดจำนวน
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

---

## Boolean Operations และ Short Circuit

### Logical AND (&&)
```javascript
// ถ้าด้านซ้ายเป็น true จะคืนค่าด้านขวา
const result1 = true && "Hello"; // "Hello"
const result2 = false && "Hello"; // false

// ใช้ในการแสดงผลแบบมีเงื่อนไข
const hasError = true;
const message = hasError && "เกิดข้อผิดพลาด!";
console.log(message); // "เกิดข้อผิดพลาด!"
```

### Logical OR (||)
```javascript
// ถ้าด้านซ้ายเป็น false จะคืนค่าด้านขวา
const result1 = false || "Default"; // "Default"
const result2 = true || "Default"; // true

// ใช้ในการกำหนดค่าเริ่มต้น
const user = { name: "สมชาย" }; // ไม่มี email
const email = user.email || "ไม่ระบุอีเมล";
console.log(email); // "ไม่ระบุอีเมล"
```

---

## String Templates (Template Literals)

### การใช้ Backticks
```javascript
const name = "สมชาย";
const age = 25;

// แบบเดิม
const greeting1 = "สวัสดี " + name + " อายุ " + age + " ปี";

// แบบ Template Literals
const greeting2 = `สวัสดี ${name} อายุ ${age} ปี`;

// สามารถคำนวณใน ${}
const mathResult = `1 + 1 = ${1 + 1}`; // "1 + 1 = 2"
```

### Multiline Strings
```javascript
const html = `
    <div>
        <h1>${name}</h1>
        <p>อายุ: ${age} ปี</p>
    </div>
`;
```

---

## Arrow Functions

### Syntax พื้นฐาน
```javascript
// Function Declaration แบบเดิม
function add(a, b) {
    return a + b;
}

// Arrow Function
const add = (a, b) => {
    return a + b;
};
```

### การเขียนแบบสั้น

#### เมื่อมี Expression เดียว
```javascript
// เอา return และ {} ออกได้
const add = (a, b) => a + b;

// เมื่อมีพารามิเตอร์เดียว เอา () ออกได้
const double = x => x * 2;

// ไม่มีพารามิเตอร์ ต้องมี ()
const sayHello = () => "Hello!";
```

#### Expression vs Statement
```javascript
// Expression: คำนวณแล้วได้ค่า (ใช้แบบสั้นได้)
const add = (a, b) => a + b;

// Statement: ไม่ได้ค่า (ต้องใช้ {} และ return)
const complexFunction = (x) => {
    const y = x * 2; // Declaration statement
    return y + 1;    // ต้องมี return
};
```

### ตัวอย่างการใช้งานใน Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// Filter เลขคู่
const evenNumbers = numbers.filter(num => num % 2 === 0);

// คูณด้วย 2
const doubled = numbers.map(num => num * 2);

// หาผลรวม
const sum = numbers.reduce((total, num) => total + num, 0);
```

---

## Expression vs Statement

### Expression
```javascript
// สิ่งที่คำนวณแล้วได้ค่า
5 + 3              // ได้ 8
"Hello" + " World" // ได้ "Hello World"
x > 10             // ได้ true หรือ false
myFunction()       // ได้ค่าที่ function return
```

### Statement
```javascript
// สิ่งที่ทำงานแต่ไม่คืนค่า
const x = 5;       // Declaration statement
if (x > 0) {...}   // If statement
for (let i = 0; i < 10; i++) {...} // Loop statement
```

### การใช้ใน Template Literals
```javascript
const x = 10;

// ✅ ใช้ได้ - เป็น Expression
const message1 = `ผลลัพธ์: ${x + 5}`;
const message2 = `สถานะ: ${x > 5 ? 'มาก' : 'น้อย'}`;

// ❌ ใช้ไม่ได้ - เป็น Statement
// const message3 = `${if (x > 5) { return 'มาก' }}`;
```

---

## สรุปจุดสำคัญ

1. **ใช้ `const` ให้มากที่สุด** หาก่อนใช้ `let`
2. **Object/Array ใน `const` แก้ไขได้** เพราะเก็บ reference
3. **Destructuring ช่วยเขียนโค้ดสั้นลง** และอ่านง่ายขึ้น
4. **Spread Operator (`...`) ใช้กระจายข้อมูล**
5. **Rest Operator (`...`) ใช้เก็บส่วนที่เหลือ**
6. **Arrow Functions เขียนสั้นกว่า** แต่ไม่เหมือน function ปกติ 100%
7. **Template Literals ใช้ backticks** และ `${}` สำหรับ interpolation
8. **Boolean operations มี short circuit** ใช้ประโยชน์ได้

### เทคนิคที่จะใช้บ่อยใน React
```javascript
// Conditional rendering
const Component = ({ isLoading, data }) => (
    <div>
        {isLoading && <p>กำลังโหลด...</p>}
        {data && <p>ข้อมูล: {data}</p>}
    </div>
);

// Props destructuring
const UserCard = ({ name, age, email = "ไม่ระบุ" }) => (
    <div>
        <h2>{name}</h2>
        <p>อายุ: {age}</p>
        <p>อีเมล: {email}</p>
    </div>
);

// State spreading
const [user, setUser] = useState({ name: "", age: 0 });
const updateUser = (newData) => {
    setUser(prevUser => ({ ...prevUser, ...newData }));
};
```

