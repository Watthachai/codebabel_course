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