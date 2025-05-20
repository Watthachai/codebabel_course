## 5. จัดการสถานะของ Route ด้วย React Router และ Redux

เนื่องจาก `connected-react-router` ไม่รองรับ React Router v6/v7 แล้ว แต่เรายังต้องการเปลี่ยนหน้าเพจจากใน Actions และบันทึกข้อมูลการนำทางใน Redux Store เราจะใช้ React Router Hooks ร่วมกับ Redux แทน

### ปัญหาที่พบ
```
ERROR in ./src/store/configureStore.js 7:0-47
Module not found: Error: Can't resolve 'history' in '/Users/itswatthachai/codebabel_course/reactFundCourse/workshop_product/frontend/src/store'
```

### สาเหตุของปัญหา
1. แพ็คเกจ `history` ไม่ได้ถูกติดตั้ง
2. วิธีการจัดการกับ history เปลี่ยนไปใน React Router v6/v7
3. `connected-react-router` ไม่รองรับ React Router v6/v7

### วิธีแก้ไข

#### 1. แก้ไข reducers.js
```javascript
import { combineReducers } from 'redux';
import productsReducer from './products/reducer';
import cartReducer from './cart/reducer';
import uiReducer from './ui/reducer';

// ไม่ใช้ connectRouter จาก connected-react-router อีกต่อไป
export default combineReducers({
  products: productsReducer, 
  cart: cartReducer,
  ui: uiReducer
});
```

#### 2. แก้ไข configureStore.js ให้ใช้ Redux Toolkit
```javascript
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'modules/reducers';

export default function setupStore(initialState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
```

#### 3. เพิ่ม action type สำหรับ checkout success ใน actions.js
```javascript
// เพิ่ม action type
const CHECKOUT_SUCCESS = 'app/cart/CHECKOUT_SUCCESS';

// เพิ่มตรงส่วน export
export {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_SUCCESS, // เพิ่มบรรทัดนี้
  addToCart,
  loadCart,
  removeFromCart,
  checkout,
}
```

#### 4. ปรับปรุง checkout function ใน actions.js
```javascript
function checkout(deliveryInfo) {
  return async (dispatch, getState) => {
    try {
      const {
        cart: { productIds, price },
      } = getState();

      // สร้าง order object (จำลอง API response)
      const orderData = {
        id: Date.now(),
        deliveryInfo,
        productIds,
        price,
        date: new Date().toISOString(),
      };

      // แจ้งเตือนว่าสั่งซื้อสำเร็จ
      dispatch(uiActions.setFlashMessage('Your order has been placed!'));

      // บันทึกข้อมูลคำสั่งซื้อลงใน Redux store
      dispatch({ 
        type: CHECKOUT_SUCCESS, 
        payload: { order: orderData } 
      });

      return true;
    } catch (error) {
      dispatch(
        uiActions.setFlashMessage(
          'Failed to place order: ' + error.message,
          'error'
        )
      );
      return false;
    }
  }
}
```

#### 5. ปรับปรุง reducer.js เพื่อรองรับ CHECKOUT_SUCCESS
```javascript
import { ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT_SUCCESS } from './actions';
import { LOAD_PRODUCTS_SUCCESS } from 'modules/products/actions';

const initialState = {
  price: 0,
  productIds: [],
  lastOrder: null, // เพิ่มสถานะสำหรับเก็บข้อมูลออเดอร์ล่าสุด
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    // case อื่นๆ คงเดิม...
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        productIds: [], // เคลียร์ตะกร้า
        price: 0,
        lastOrder: action.payload.order, // บันทึกข้อมูลออเดอร์ล่าสุด
      };
    // case อื่นๆ คงเดิม...
    default:
      return state;
  }
}
```

#### 6. แก้ไข Cart.js เพื่อใช้ useNavigate
```javascript
import React, { useEffect } from 'react';
import { styled, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate

import Delivery from './Delivery';
import Order from './Order';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

// styled components คงเดิม...

export default function Cart() {
  const productIds = useSelector((state) => state.cart.productIds);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // เพิ่ม useNavigate

  useEffect(() => {
    dispatch(actions.loadCart());
  },[dispatch]);

  // เพิ่มฟังก์ชัน handleCheckout
  const handleCheckout = (deliveryInfo) => {
    // เรียกใช้ action checkout พร้อมส่งข้อมูล deliveryInfo
    dispatch(actions.checkout(deliveryInfo));
    // นำทางกลับไปหน้าหลักหลังจากสั่งซื้อสำเร็จ
    navigate('/');
  };

  if(productIds.length === 0) {
    return <p className={TitleTypography}>No order found</p>;
  }

  return (
    <>
      <TitleTypography variant="h4" component="h1">
        Order Summary
      </TitleTypography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Order />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Delivery onSubmit={handleCheckout} />
        </Grid>
      </Grid>
    </>
  );
}
```

#### 7. แก้ไข Delivery.js เพื่อรับ onSubmit
```javascript
import React from 'react';
import { 
  styled, 
  Button, 
  TextField, 
  CardActions, 
  Card, 
  CardContent, 
  Typography 
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// styled components คงเดิม...

export default function Delivery({ onSubmit }) { // เพิ่มการรับ prop
  const schema = yup.object({
    // schema คงเดิม...
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  // อัพเดทฟังก์ชัน submit
  const submit = (deliveryInfo) => {
    if (onSubmit) {
      onSubmit(deliveryInfo);
    }
  };

  // ส่วนที่เหลือคงเดิม...
}
```

#### 8. (ตัวเลือก) สร้างคอมโพเนนต์แสดงออเดอร์ล่าสุด
```javascript
// LastOrder.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Box } from '@mui/material';

export default function LastOrder() {
  const lastOrder = useSelector(state => state.cart.lastOrder);
  
  if (!lastOrder) return null;
  
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Your Last Order</Typography>
      <Box>
        <Typography>Order #: {lastOrder.id}</Typography>
        <Typography>Name: {lastOrder.deliveryInfo.name}</Typography>
        <Typography>Email: {lastOrder.deliveryInfo.email}</Typography>
        <Typography>Address: {lastOrder.deliveryInfo.address}</Typography>
        <Typography>Date: {new Date(lastOrder.date).toLocaleString()}</Typography>
        <Typography>Total: ${lastOrder.price}</Typography>
      </Box>
    </Paper>
  );
}
```

### วิธีทดสอบว่าทำงานถูกต้อง
1. เปิดแอปพลิเคชันในเบราวเซอร์
2. เพิ่มสินค้าเข้าตะกร้า
3. ไปที่หน้าตะกร้า
4. กรอกข้อมูลการจัดส่งและกดปุ่ม "Place Order"
5. ควรถูกนำทางกลับไปหน้าแรกโดยอัตโนมัติและเห็นข้อความแจ้งเตือน
6. เปิด Redux DevTools และตรวจสอบที่ `state.cart.lastOrder` จะพบข้อมูลคำสั่งซื้อที่เพิ่งทำ

### หมายเหตุ
- ข้อมูลใน Redux Store จะอยู่เฉพาะในระหว่างที่แอปทำงาน หากรีเฟรชหน้าเว็บข้อมูลจะหาย
- หากต้องการเก็บข้อมูลถาวร ควรใช้ localStorage หรือส่งข้อมูลไปเก็บที่ฐานข้อมูลในฝั่ง Backend
- เราสามารถใช้ `react-router-dom` และ Redux ทำงานร่วมกันได้โดยไม่ต้องใช้ `connected-react-router`
