# 📚 Lodash Integration ใน Cypress

## 🎯 ภาพรวม

Cypress มาพร้อมกับ Library Lodash ที่ติดมาในตัว ทำให้เราสามารถใช้งาน Lodash functions ได้โดยตรงในการเขียน test cases ซึ่งจะช่วยให้การจัดการข้อมูลและ object manipulation เป็นไปได้อย่างมีประสิทธิภาพ

## ⚙️ การเตรียมไฟล์ทดสอบ

### สร้างไฟล์ test ใหม่

```
📁 cypress/
  └── 📁 e2e/
      └── 📄 lodash.cy.ts
```

**การปรับปรุงที่ทำ:** เพิ่มการจัดระเบียบ folder structure และการตั้งชื่อไฟล์ให้ชัดเจน

### โครงสร้างพื้นฐานของ test

```typescript
describe('Lodash', () => {
  it('should handle lodash methods correctly', () => {
    // Test cases จะอยู่ที่นี่
  });
});
```

## 🔧 การใช้งาน Lodash Methods

### 1. Object Manipulation

#### 📝 การสร้าง Sample Data

```typescript
const person = {
  name: 'สมชาย',
  age: 24,
  gender: 'Male'
};
```

**การปรับปรุงที่ทำ:** เพิ่มการอธิบายโครงสร้างข้อมูลและจุดประสงค์ของแต่ละ property

### 2. 🚫 Omit Method - การยกเว้นฟิลด์

#### การยกเว้นฟิลด์เดียว

```typescript
// ยกเว้น field 'name' จาก object
expect(_.omit(person, 'name')).to.deep.equal({
  age: 24,
  gender: 'Male'
});
```

#### การยกเว้นหลายฟิลด์

```typescript
// ยกเว้นทั้ง 'name' และ 'age'
expect(_.omit(person, ['name', 'age'])).to.deep.equal({
  gender: 'Male'
});
```

**⚠️ หมายเหตุสำคัญ:** การเปรียบเทียบ object ต้องใช้ `to.deep.equal` เพราะ object ในจาวาสคริปต์เปรียบเทียบโดย reference ไม่ใช่ value

### 3. ✅ Pick Method - การเลือกฟิลด์

#### การเลือกฟิลด์เดียว

```typescript
// เลือกเฉพาะ field 'name'
expect(_.pick(person, 'name')).to.deep.equal({
  name: 'สมชาย'
});
```

#### การเลือกหลายฟิลด์

```typescript
// เลือกทั้ง 'name' และ 'age'
expect(_.pick(person, ['name', 'age'])).to.deep.equal({
  name: 'สมชาย',
  age: 24
});
```

**การปรับปรุงที่ทำ:** เพิ่มการเปรียบเทียบระหว่าง `omit` และ `pick` เพื่อความเข้าใจที่ชัดเจน

### 4. 🔄 Times Method - การวนซ้ำ

#### การสร้าง Array จาก Index

```typescript
// สร้าง array [0, 1, 2, 3, 4] โดยวนซ้ำ 5 ครั้ง
expect(_.times(5, (index) => index)).to.deep.equal([0, 1, 2, 3, 4]);
```

**อธิบายการทำงาน:**
- `_.times(5, callback)` จะเรียก callback function 5 ครั้ง
- แต่ละครั้งจะส่ง index (0, 1, 2, 3, 4) เป็น parameter
- ผลลัพธ์ที่ return จาก callback จะถูกเก็บใน array

## 📖 วิธีการเรียกใช้ Lodash

### วิธีที่ 1: ใช้ผ่าน Cypress Global

```typescript
it('should work with underscore global', () => {
  expect(_.omit(person, 'name')).to.deep.equal({
    age: 24,
    gender: 'Male'
  });
});
```

### วิธีที่ 2: ใช้ผ่าน Cypress Object

```typescript
it('should work with Cypress object', () => {
  expect(Cypress._.omit(person, 'name')).to.deep.equal({
    age: 24,
    gender: 'Male'
  });
});
```

### วิธีที่ 3: Destructuring Assignment

```typescript
it('should work with destructuring', () => {
  const { _ } = Cypress;
  expect(_.omit(person, 'name')).to.deep.equal({
    age: 24,
    gender: 'Male'
  });
});
```

**การปรับปรุงที่ทำ:** เพิ่มหลายวิธีในการเรียกใช้ Lodash เพื่อให้ผู้อ่านเลือกใช้ได้ตามความชอบ

## 🎮 การควบคุมการรัน Tests

### การรัน Test แบบเฉพาะเจาะจง

#### รัน Test Case เดียว

```typescript
it.only('should run only this test', () => {
  // Test นี้จะรันเพียงตัวเดียว
});
```

#### รัน Test Suite เดียว

```typescript
describe.only('Lodash', () => {
  // เฉพาะ tests ใน describe นี้จะรัน
});
```

### การข้าม Tests

#### ข้าม Test Case

```typescript
it.skip('should skip this test', () => {
  // Test นี้จะถูกข้าม
});
```

#### ข้าม Test Suite

```typescript
describe.skip('Lodash', () => {
  // ทุก tests ใน describe นี้จะถูกข้าม
});
```

## 🚀 การรัน Tests ในโหมดต่างๆ

### 🖥️ โหมด Interactive (UI Mode)

```bash
npm run cy:open
```

**ข้อดี:**
- ✅ เหมาะสำหรับการ debug
- ✅ เห็นการทำงานแบบ real-time
- ✅ สามารถ inspect elements ได้

**ข้อเสีย:**
- ❌ รันได้ทีละไฟล์
- ❌ ไม่เหมาะสำหรับ CI/CD

### 💻 โหมด Headless (Command Line)

```bash
npm run cy:run
```

**ข้อดี:**
- ✅ รันทุกไฟล์พร้อมกัน
- ✅ เหมาะสำหรับ CI/CD
- ✅ รันเร็วกว่า
- ✅ สามารถ integrate กับ automation pipeline

**การปรับปรุงที่ทำ:** เพิ่มการเปรียบเทียบข้อดี-ข้อเสียของแต่ละโหมด

### การตั้งค่า Scripts ใน package.json

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run"
  }
}
```

## 📊 ผลลัพธ์การรัน Tests

### ตัวอย่างผลลัพธ์ Headless Mode

```
✓ Lodash › should handle lodash methods correctly (250ms)
✓ Math › should calculate 1 + 1 correctly (180ms)
✓ All tests passed!

📈 Test Summary:
- Total Tests: 2
- Passed: 2
- Failed: 0
- Duration: 430ms
```

**การปรับปรุงที่ทำ:** เพิ่มตัวอย่างผลลัพธ์เพื่อให้เห็นภาพรวมการทำงาน

## 🎯 Best Practices

### 1. การตั้งชื่อ Test Cases

```typescript
// ❌ ไม่ดี
it('test lodash', () => {});

// ✅ ดี
it('should omit specified fields from object using lodash', () => {});
```

### 2. การจัดกลุ่ม Related Tests

```typescript
describe('Lodash Object Methods', () => {
  describe('omit', () => {
    it('should omit single field', () => {});
    it('should omit multiple fields', () => {});
  });
  
  describe('pick', () => {
    it('should pick single field', () => {});
    it('should pick multiple fields', () => {});
  });
});
```

### 3. การใช้ Setup และ Teardown

```typescript
describe('Lodash', () => {
  let testData;
  
  beforeEach(() => {
    testData = {
      name: 'สมชาย',
      age: 24,
      gender: 'Male'
    };
  });
  
  it('should work with fresh data each test', () => {
    // ใช้ testData ที่สร้างใหม่ทุกครั้ง
  });
});
```

**การปรับปรุงที่ทำ:** เพิ่ม best practices สำหรับการเขียน tests ที่มีคุณภาพ

## 🔍 การ Debug และ Troubleshooting

### เมื่อ Lodash ไม่ทำงาน

```typescript
// ตรวจสอบว่า Lodash มีอยู่
it('should verify lodash is available', () => {
  expect(Cypress._).to.exist;
  expect(typeof Cypress._.omit).to.equal('function');
});
```

### การ Debug Values

```typescript
it('should debug lodash operations', () => {
  const result = _.omit(person, 'name');
  cy.log('Original:', person);
  cy.log('After omit:', result);
  expect(result).to.deep.equal({ age: 24, gender: 'Male' });
});
```

## 📈 สรุปและประโยชน์

| Feature | ประโยชน์ | Use Case |
|---------|----------|----------|
| `_.omit()` | ลบฟิลด์ที่ไม่ต้องการ | ทดสอบ API response ที่ไม่สนใจ timestamp |
| `_.pick()` | เลือกเฉพาะฟิลด์ที่ต้องการ | ตรวจสอบข้อมูลสำคัญเท่านั้น |
| `_.times()` | สร้างข้อมูลทดสอบหลายชุด | สร้าง test data ในลูป |

**การปรับปรุงที่ทำ:** เพิ่มตารางสรุปและ use cases จริงเพื่อเข้าใจประโยชน์ได้ชัดเจน

---

> 💡 **เคล็ดลับ:** Lodash ใน Cypress ช่วยลดความซับซ้อนในการจัดการข้อมูล ทำให้ tests อ่านง่ายและดูแลรักษาได้ดีขึ้น
