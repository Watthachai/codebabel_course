import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Cart from './Cart'

export default function CartRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Cart />} />
    </Routes>
  )
}