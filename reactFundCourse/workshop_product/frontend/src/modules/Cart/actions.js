import axios from 'axios'

import * as uiActions from 'modules/ui/actions'
import * as productActions from 'modules/products/actions'

const ADD_TO_CART = 'app/cart/ADD_TO_CART'
const REMOVE_FROM_CART = 'app/cart/REMOVE_FROM_CART'
const CHECKOUT_SUCCESS = 'app/cart/CHECKOUT_SUCCESS'

function addToCart(productId) {
  return (dispatch) => {
    dispatch(
      uiActions.setFlashMessage('The product has been added to your cart')
    )
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId,
      },
    })
  }
}

function loadCart() {
  return async (dispatch, getState) => {
    const {
      cart: { productIds },
    } = getState()

    if (productIds.length === 0) {
      return dispatch(productActions.clearProducts())
    }

    try {
      // ดึงข้อมูลสินค้าทั้งหมดที่อยู่ในตะกร้า
      const { data } = await axios.get('/products')

      // กรองเฉพาะสินค้าที่มี ID อยู่ใน productIds
      const cartProducts = data.filter((product) =>
        productIds.includes(String(product.id))
      )

      // ใช้ action creator แทนการใช้ type โดยตรง
      dispatch(productActions.loadProductsSuccess(cartProducts))
    } catch (err) {
      // ใช้ action creator แทนการใช้ type โดยตรง
      dispatch(productActions.loadProductsFailure())
    }
  }
}

function removeFromCart(productId) {
  return (dispatch) => {
    // แปลง productId เป็น string เพื่อความสม่ำเสมอในการเปรียบเทียบ
    const productIdString = String(productId)

    dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        productId: productIdString,
      },
    })
    dispatch(loadCart())
  }
}

function checkout(deliveryInfo) {
  return async (dispatch, getState) => {
    try {
      const {
        cart: { productIds, price },
      } = getState()

      // สร้าง order object (จำลอง API response เพราะไม่มีการเรียก API จริง)
      const orderData = {
        id: Date.now(), // สร้าง ID ชั่วคราว
        deliveryInfo,
        productIds,
        price,
        date: new Date().toISOString(),
      }

      // แจ้งเตือนว่าสั่งซื้อสำเร็จ
      dispatch(uiActions.setFlashMessage('Your order has been placed!'))

      // บันทึกข้อมูลคำสั่งซื้อลงใน Redux store
      dispatch({ 
        type: CHECKOUT_SUCCESS, 
        payload: { 
          order: orderData
        } 
      })

      return true // สำเร็จ
    } catch (error) {
      dispatch(
        uiActions.setFlashMessage(
          'Failed to place order: ' + error.message,
          'error'
        )
      )
      return false
    }
  }
}

export {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_SUCCESS,
  addToCart,
  loadCart,
  removeFromCart,
  checkout,
}
