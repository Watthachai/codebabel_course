import React from 'react'
import { 
  styled, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Typography, 
  IconButton 
} from '@mui/material'
import { Delete } from '@mui/icons-material'

import * as actions from '../actions'
import { useDispatch } from 'react-redux'

import currencyFormat from 'utils/currencyFormat'

// สร้าง styled components แทน makeStyles
const ProductCard = styled(Card)({
  display: 'flex',
});

const ProductDetails = styled(CardContent)({
  flex: 1,
});

const ProductImage = styled(CardMedia)({
  width: 150,
});



export default function CartProduct({ id, image, name, price }) {

  const dispatch = useDispatch()
  const remove = () => dispatch(actions.removeFromCart(id))

  return (
    <ProductCard>
      <ProductImage image={image} title={name} />
      <ProductDetails>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Grid 
          container 
          alignItems="center" 
          justifyContent="space-between"
        >
          <Grid item>
            <div>{currencyFormat(price)}</div>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" size="small" onClick={remove}>
              <Delete></Delete>
            </IconButton>
          </Grid>
        </Grid>
      </ProductDetails>
    </ProductCard>
  )
}