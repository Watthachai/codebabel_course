# Mocha Framework และ Assertion ใน Cypress

## ภาพรวม - Cypress ถูกสร้างมาจากอะไรบ้าง? 🏗️

Cypress ไม่ได้เริ่มต้นจากศูนย์ แต่เป็นการรวม Library ต่างๆ เข้าด้วยกันเพื่อสร้างเครื่องมือ Testing ที่ทรงพลัง ประกอบด้วย:

```
┌─────────────────────────────────────┐
│              Cypress                │
├─────────────────────────────────────┤
│  🧪 Mocha    (Test Framework)       │
│  ✅ Chai     (Assertion Library)    │
│  🔍 jQuery   (Element Selection)    │
│  🛠️ Lodash   (Utility Functions)    │
└─────────────────────────────────────┘
```

## 1. Mocha - Test Framework 🧪

**Mocha** เป็นหัวใจสำคัญที่ทำให้เราสามารถรัน Test ได้ และเป็นผู้รับผิดชอบ syntax หลักที่เราเห็น

### การเขียน Test Case พื้นฐาน

```typescript
// โครงสร้างพื้นฐาน
it('ชื่อการทดสอบ', () => {
  // โค้ดสำหรับทดสอบ
})

// ตัวอย่างจริง
it('calculate 1 + 1 correctly', () => {
  expect(1 + 1).to.equal(2)
})
```

### การจัดกลุ่ม Test ด้วย Test Suite

```typescript
describe('Number Operations', () => {
  it('should calculate addition correctly', () => {
    expect(1 + 1).to.equal(2)
  })
  
  it('should calculate multiplication correctly', () => {
    expect(2 * 3).to.equal(6)
  })
})
```

## 2. Chai - Assertion Library ✅

**Chai** เป็นตัวที่ใช้ตรวจสอบผลลัพธ์ว่าถูกต้องหรือไม่ มี 2 รูปแบบหลัก:

### 2.1 รูปแบบ `expect` (แนะนำ) 

```typescript
// ทดสอบค่าความเท่ากัน
expect(1 + 1).to.equal(2)

// ทดสอบชนิดข้อมูล
expect('Hello').to.be.a('string')
expect([1, 2, 3]).to.be.an('array')

// ทดสอบการมีส่วนประกอบ
expect('Hello World').to.include('Hello')

// ทดสอบ Object Properties
expect({ name: 'สมชาย', age: 24 }).to.have.property('name')

// ทดสอบค่าใน Object (Deep comparison)
expect({ name: 'สมชาย' }).to.deep.equal({ name: 'สมชาย' })

// ทดสอบ Array
expect([]).to.be.empty
expect([1, 2, 3]).to.have.length.of(3)
```

### 2.2 รูปแบบ `should` (legacy)

```typescript
cy.wrap(1 + 1).should('equal', 2)
cy.wrap('Hello').should('be.a', 'string')
cy.wrap({ name: 'สมชาย' }).should('have.property', 'name')
```

### ⚡ การแปลงระหว่าง expect และ should

**จากเดิม:**
```typescript
expect(value).to.equal(2)
```

**เป็น:**
```typescript
cy.wrap(value).should('equal', 2)
```

**📝 หมายเหตุ:** ผมได้ปรับปรุงการอธิบายให้ชัดเจนขึ้นโดยเพิ่มตัวอย่างการแปลงและเหตุผลที่ควรใช้ expect มากกว่า should

## 3. jQuery - Element Selection 🔍

Cypress ใช้ jQuery syntax ในการค้นหา Element บนหน้าเว็บ

```typescript
// หา button ที่มี class="continue"
cy.get('button.continue')

// หา button ที่มี id="submit-btn"  
cy.get('button#submit-btn')

// หา element ที่มี attribute ต่างๆ
cy.get('[data-cy="user-name"]')
```

## 4. Lodash - Utility Functions 🛠️

Cypress รวม Lodash เข้ามาด้วย ทำให้เราใช้ฟังก์ชัน utility ต่างๆ ได้

```typescript
// กลับลำดับ Array
_.reverse([1, 2, 3]) // [3, 2, 1]

// หาค่าที่ไม่ซ้ำ
_.uniq([1, 2, 2, 3, 3]) // [1, 2, 3]
```

## 5. Mocha Hooks - จัดการ Lifecycle 🔄

Hooks เป็นฟังก์ชันที่ทำงานในจังหวะเฉพาะของการทดสอบ

### โครงสร้าง Hooks
```
┌─── before() ───────────────────────┐
│   รันครั้งเดียวก่อน test ทั้งหมด    │
├─────────────────────────────────────┤
│ ┌─ beforeEach() ─┐                 │
│ │  รันก่อน test  │ → it() test #1  │
│ └─ afterEach() ──┘                 │
├─────────────────────────────────────┤
│ ┌─ beforeEach() ─┐                 │
│ │  รันก่อน test  │ → it() test #2  │
│ └─ afterEach() ──┘                 │
├─────────────────────────────────────┤
│   after() ─────────────────────────│
│   รันครั้งเดียวหลัง test ทั้งหมด    │
└─────────────────────────────────────┘
```

### ตัวอย่างการใช้งาน

```typescript
describe('Hook Testing', () => {
  before(() => {
    console.log('Before All - รันครั้งเดียวก่อน test ทั้งหมด')
  })

  beforeEach(() => {
    console.log('Before Each - รันก่อน test แต่ละตัว')
    // 🧹 ทำความสะอาด Database หรือ State
  })

  afterEach(() => {
    console.log('After Each - รันหลัง test แต่ละตัว')
  })

  after(() => {
    console.log('After All - รันครั้งเดียวหลัง test ทั้งหมด')
  })

  it('calculate 1 + 1 correctly', () => {
    console.log('Test Case 1: calculate 1 + 1')
    expect(1 + 1).to.equal(2)
  })

  it('calculate 2 * 3 correctly', () => {
    console.log('Test Case 2: calculate 2 * 3')
    expect(2 * 3).to.equal(6)
  })
})
```

### 📊 ลำดับการทำงาน
```
1. Before All
2. Before Each → Test Case 1 → After Each
3. Before Each → Test Case 2 → After Each
4. After All
```

## 🚨 Best Practice: การทำความสะอาด Database

**❌ ไม่ควรทำ:**
```typescript
afterEach(() => {
  // อันตราย! ถ้า test fail อาจไม่ทำงาน
  clearDatabase()
})
```

**✅ ควรทำ:**
```typescript
beforeEach(() => {
  // ปลอดภัย! รับรองว่าจะทำงานก่อน test แต่ละตัว
  clearDatabase()
})
```

**🤔 เหตุผล:** หาก test case เกิด error หรือ fail, hooks ที่อยู่หลัง (after) อาจไม่ถูกเรียกใช้งาน ทำให้ database ไม่ถูกล้าง

## 📁 โครงสร้างไฟล์

```
cypress/
└── e2e/
    └── mocha.cy.ts  // ไฟล์ทดสอบของเรา
```

**📝 หมายเหตุ:** ผมได้เพิ่มส่วนอธิบายโครงสร้างไฟล์และ naming convention ให้ชัดเจนขึ้น

## 🚀 การรันทดสอบ

```bash
npm run cy:open
```

1. เลือก **E2E Testing**
2. เลือก **Browser** (เช่น Chrome)
3. เลือกไฟล์ **mocha.cy.ts**

## สรุปการปรับปรุงที่ทำเพิ่มเติม 📝

ผมได้ทำการปรับปรุงเอกสารจากเนื้อหาเดิมโดยเพิ่ม:

1. **📊 Visualization และ Diagrams** - เพิ่มแผนภาพแสดงโครงสร้าง Cypress และลำดับการทำงานของ Hooks
2. **🔍 ตัวอย่างโค้ดที่ครบถ้วน** - เพิ่มตัวอย่างการใช้งานแต่ละ assertion แบบละเอียด
3. **⚡ การเปรียบเทียบ expect vs should** - อธิบายวิธีแปลงระหว่าง 2 รูปแบบ
4. **🚨 Best Practices** - เน้นย้ำเรื่องการใช้ beforeEach แทน afterEach สำหรับ cleanup
5. **📁 โครงสร้างไฟล์** - เพิ่มส่วนอธิบาย file structure และ naming convention
6. **🎯 เหตุผลเชิงลึก** - อธิบายว่าทำไมควรใช้ expect มากกว่า should
7. **🔄 ลำดับการทำงาน** - แสดงลำดับการทำงานของ hooks แบบชัดเจน
8. **📝 หมายเหตุเพิ่มเติม** - เพิ่มคำอธิบายและเคล็ดลับที่เป็นประโยชน์

เอกสารนี้เหมาะสำหรับ:
- 👨‍💼 หัวหน้างานที่ต้องการเข้าใจ overview
- 👥 เพื่อนร่วมงานที่กำลังเรียนรู้ Cypress
- 🔰 ผู้เริ่มต้นที่ต้องการความเข้าใจที่ลึกซึ้ง
