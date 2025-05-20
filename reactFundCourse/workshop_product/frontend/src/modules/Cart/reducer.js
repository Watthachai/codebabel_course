import { ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT_SUCCESS } from './actions'
import { LOAD_PRODUCTS_SUCCESS } from 'modules/products/actions'

const initialState = {
  price: 0,
  productIds: [],
  lastOrder: null, // เพิ่มสถานะสำหรับเก็บข้อมูลออเดอร์ล่าสุด
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { productId } = action.payload

      if (state.productIds.includes(productId)) return state

      return {
        ...state,
        productIds: [...state.productIds, productId],
      }
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        productIds: state.productIds.filter(
          (id) => id !== String(action.payload.productId)
        ),
      }
    case LOAD_PRODUCTS_SUCCESS: {
      let price = 0

      for (let product of action.payload.products) {
        price += product.price
      }

      return { ...state, price }
    }
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        productIds: [], // เคลียร์ตะกร้า
        price: 0,
        lastOrder: action.payload.order, // บันทึกข้อมูลออเดอร์ล่าสุด
      }
    default:
      return state
  }
}
