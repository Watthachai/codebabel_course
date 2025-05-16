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

export default function CartProduct({ image, name, price }) {
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
            <IconButton aria-label="delete" size="small">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </ProductDetails>
    </ProductCard>
  )
}