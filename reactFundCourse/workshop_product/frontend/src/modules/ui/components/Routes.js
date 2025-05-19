import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProductRoutes from 'modules/products/components/Routes'
import CartRoutes from 'modules/cart/components/Routes'
import ProductList from 'modules/products/components/ProductList'

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<ProductList />} />
      <Route path="/products/*" element={<ProductRoutes />} />
      <Route path="/cart" element={<CartRoutes />} />

      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  )
}