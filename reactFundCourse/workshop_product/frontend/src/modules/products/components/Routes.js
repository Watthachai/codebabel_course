import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProductList from './ProductList'
import ProductDetails from './ProductDetails'

export default function ProductRoutes() {
    
  return (
    <Routes>
      <Route path=":id" element={<ProductDetails />} />
      <Route path="/" element={<ProductList />} />
    </Routes>
  )
}