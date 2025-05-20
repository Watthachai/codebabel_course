import React from 'react'
import { styled, Typography, Box } from '@mui/material'

import currencyFormat from 'utils/currencyFormat'
import CartProduct from './CartProduct'
import { useSelector } from 'react-redux';

// สร้าง styled components แทน makeStyles
const ProductsContainer = styled(Box)(({ theme }) => ({
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: 'right',
  marginTop: theme.spacing(2),
}));

export default function Order() {
  const price = useSelector((state) => state.cart.price)
  const products = useSelector((state) => state.products.items)

  return (
    <>
      <ProductsContainer>
        {products.map((product) => (
          <CartProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
      {products.length > 0 && (
        <PriceTypography variant="h5" component="h3">
          {currencyFormat(price)}
        </PriceTypography>
      )}
    </>
  )
}