# บริหาร state ในแอพพลิเคชันด้วย Redux

## 1. Redux คืออะไร ทำไมจึงสำคัญ

เว็บแอพทั่วไปมักมีข้อมูลที่ต้องส่งผ่านระหว่างคอมโพแนนท์หรือใช้งานร่วมกัน เราจึงต้องการเครื่องมือที่ทำให้การส่งผ่านข้อมูลหรือ state ระหว่างคอมโพแนนท์เป็นไปอย่างสะดวกและสามารถ Debug หรือรู้ลำดับการทำงานอย่างชัดแจ้ง บทเรียนนี้จึงยก Redux ที่เป็นตัวจัดการ state (state management) ยอดนิยมใน React มาพูดถึง

Redux คือไลบรารีสำหรับการจัดการ state ที่มีหลักการสำคัญ 3 ประการ:
1. **Store เป็น Single Source of Truth** - ข้อมูลทั้งหมดของแอพถูกเก็บไว้ในที่เดียว ทำให้การติดตามและจัดการ state ง่ายขึ้น
2. **State is Read-Only** - state ไม่สามารถเปลี่ยนแปลงได้โดยตรง ต้องส่ง Action ไปที่ Store เพื่อบอกว่าต้องการเปลี่ยนแปลงอะไร
3. **Changes are Made with Pure Functions** - การเปลี่ยนแปลง state ทำผ่าน Reducer ซึ่งเป็น Pure Function ที่รับ state เก่าและ action แล้วคืนค่า state ใหม่

## 2. Store และ Reducers

เริ่มต้นด้วยการติดตั้ง Redux ในโปรเจค React ของผม:

```bash
yarn add redux react-redux
yarn add -D redux-devtools-extension
```

จากนั้นให้ติดตั้งส่วนเสริม Redux DevTools บนเบราว์เซอร์เพื่อช่วยในการ debug

**คำเตือน!**
ในบทเรียนนี้ผมใช้ Redux แบบดั้งเดิม (v4 หรือเก่ากว่า) ซึ่งต่างจากปัจจุบันที่ Redux Toolkit ได้กลายเป็นมาตรฐานที่แนะนำ ผมเลือกใช้แบบเดิมเพื่อให้สอดคล้องกับบทเรียนที่กำลังศึกษา

**แบบเก่า (ที่ใช้ในบทเรียนนี้):**

```javascript
import { applyMiddleware, createStore, combineReducers } from "redux";

// นำ reducers มารวมกัน
const rootReducer = combineReducers({
  // cart: cartReducer,
  // products: productsReducer,
  // เพิ่ม reducers อื่นๆ ที่นี่
});

export default function configureStore(initialState) {
    const middleware = [];
    
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
    return store;
}
```

**แบบใหม่ด้วย Redux Toolkit (เพื่อการอ้างอิง):**

```javascript
import { configureStore } from "@reduxjs/toolkit";

export default function setupStore(preloadedState) {
  return configureStore({
    reducer: {
      // cart: cartSlice.reducer,
      // products: productsSlice.reducer,
    },
    preloadedState
  });
}
```

**ข้อดีของ Redux Toolkit:**
- ลดโค้ด boilerplate ลงมาก
- มี middleware ในตัว (redux-thunk)
- ใช้ immer ช่วยจัดการ immutable state
- รองรับ TypeScript ได้ดีกว่า

แม้ว่า Redux แบบดั้งเดิมจะแสดงข้อความเตือนว่าควรใช้ Redux Toolkit แทน แต่ผมยังคงใช้แบบเดิมในบทเรียนนี้เพื่อให้เข้าใจพื้นฐานของ Redux และไม่สับสนกับเนื้อหาที่กำลังเรียน

## 3. Actions และ Action Creators

Actions คือวัตถุ JavaScript ธรรมดา (plain objects) ที่อธิบายว่าเกิดอะไรขึ้นในแอพพลิเคชัน โดยต้องมี property ชื่อ `type` เสมอ ซึ่งระบุประเภทของ action

Action Creators คือฟังก์ชันที่สร้างและส่งคืน action object ช่วยให้เราไม่ต้องเขียน action object ซ้ำๆ และเพิ่มความสะดวกในการส่ง actions

ตัวอย่างเช่น:

```javascript
// Action type
const ADD_TO_CART = 'ADD_TO_CART';

// Action creator
function addToCart(product, quantity) {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity
    }
  };
}
```

ในการใช้งานจริง ผมสามารถเรียกใช้ action creator นี้เมื่อต้องการเพิ่มสินค้าลงตะกร้า โดยผลลัพธ์จะเป็น pure function ที่ให้ค่าคงที่และคาดเดาได้เสมอเมื่อใส่ input เดิม
