## 5. การดึงค่า Dynamic Segments ด้วย useParams
บาง URL ประกอบด้วย Dynamic Segments หรือส่วนที่เปลี่ยนแปลงได้ เช่น `/products/:id` เรียก `:id` ว่า Dynamic Segments บทเรียนนี้จะพูดถึงการทำงานกับ Dynamic Segments ผ่าน `useParams` ซึ่งผู้เรียน อธิบายไว้ให้แล้วในขั้นตอนที่ [(linkไปหัวข้อที่)] 2. การเข้าถึงข้อมูล path ด้วย useParams แทน useRouteMatch

## 6. การดึงค่า Query String ผ่าน useLocation

หลังจากนั้นสามารถใช้ `useLocation()` ต่อได้ตามปกติตามคลิปเลย ในหัวข้อนี้มีการใช้งาน query-string ทำการติดตั้งก่อน:

```bash
yarn add query-string
```

### การปรับใช้งานในหน้า ProductList.js:
```javascript
// เพิ่มส่วนนี้เข้าไป
const { search } = useLocation();
const { category } = queryString.parse(search); 
// หมายเหตุ: การ Deconstruct นี้ทำให้ดึงเฉพาะ property "category" จาก object ที่ได้จากการ parse
// เช่น ถ้า search = "?category=electronics" จะได้ category = "electronics"
```

### เปลี่ยนแปลงใน useEffect()
ปรับการกรองสินค้าตามค่า category ที่ได้จาก query string

### การปรับใช้งานในหน้า CategoryItem.js:
```javascript
// เปลี่ยนจาก useHistory เป็น useNavigate
const navigate = useNavigate();  

const filterProductsByCategory = () => {
    navigate(`${paths.products}?category=${title}`);
}
```

## 7. Redirect ใน React Router

> **การเปลี่ยนแปลงสำคัญจาก React Router v5 ไปยัง v6**

### แบบเดิม (v5):
```jsx
<Route>
  <div>Page not found</div>
</Route>
```

### แบบใหม่ (v6):
```jsx
<Route path="*" element={<div>Page not found</div>} />
```

### เหตุผลที่มีการเปลี่ยนแปลง:
1. **เปลี่ยนจาก Children API เป็น Element Props** - v6 ใช้ element prop แทนการใส่ component โดยตรงเป็น children
2. **ความชัดเจนมากขึ้น** - เห็นชัดเจนว่าอะไรจะถูก render เมื่อ route นั้นถูกเรียกใช้
3. **รองรับโครงสร้างแบบลำดับชั้น** - ทำให้สร้าง nested routes ได้ง่ายขึ้น ผ่าน Outlet component
4. **แยก matching logic และ rendering logic** - แยก logic การจับคู่ URL (path) และการแสดงผล (element) ออกจากกัน
5. **Performance ดีขึ้น** - ช่วยให้ optimize การ render components ได้ดีขึ้น

# การจัดการฟอร์มด้วย React Hook Form

## 1. เปรียบเทียบ Formik กับ React Hook Form
ปัจจุบันมีไลบรารี่สำหรับการทำงานกับฟอร์มที่ได้รับความนิยมคือ Formik และ React Hook Form บทเรียนนี้จะทำการเปรียบเทียบสองสิ่งนี้ พร้อมทั้งระบุเหตุผลที่คอร์สนี้เลือกใช้ React Hook Form

## 2. การสร้างฟอร์มด้วย React Hook Form ผ่าน useForm
## 3. ตรวจสอบความถูกต้องของฟอร์มด้วย Yup

### การติดตั้ง:
```bash
yarn add react-hook-form @hookform/resolvers yup
```

### การแก้ไขจาก API เวอร์ชันเก่าให้เป็นเวอร์ชันใหม่:

#### 1. การใช้งาน register:
- **แบบเก่า (จากคลิป)**: `inputRef={register}`
- **แบบใหม่**: `{...register("fieldName")}`

#### 2. การเข้าถึง errors:
- **แบบเก่า (จากคลิป)**:
  ```javascript
  const { register, errors } = useForm();
  // ...
  {errors.name && <span>{errors.name.message}</span>}
  ```
- **แบบใหม่**:
  ```javascript
  const { register, formState: { errors } } = useForm();
  // ...
  {errors.name && <span>{errors.name.message}</span>}
  ```

#### 3. การใช้งาน handleSubmit:
- **เพิ่มใน form**: `<form onSubmit={handleSubmit(submit)}>`

#### 4. การสร้าง validation schema:
- **แบบเก่า**:
  ```javascript
  yup.string().required()
  ```
- **แบบใหม่**:
  ```javascript
  yup.string().required("Address is required")
  ```
