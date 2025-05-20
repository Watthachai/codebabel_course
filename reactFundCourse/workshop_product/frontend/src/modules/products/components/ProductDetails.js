import React, { useEffect } from 'react';
import { styled, useTheme, useMediaQuery, Grid, Paper, Typography, ButtonGroup, Button } from '@mui/material';
import { useNavigate, useParams,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as productActions from '../actions'
import * as cartActions from '../../cart/actions'

// สร้าง styled components แทน makeStyles
const DetailsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ContentGrid = styled(Grid)(({ theme }) => ({
  height: '100%',
}));

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product] = useSelector((state) => state.products.items)
  const productIds = useSelector((state) => state.cart.productIds)
  const exists = productIds.includes(id)
  const theme = useTheme()
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'))
  const navigate = useNavigate();


  useEffect(() => {
    const action = productActions.loadProduct(id)

    dispatch(action)
  }, [dispatch, id])

  const addToCart = () => dispatch(cartActions.addToCart(id))

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  }

  if (!product) return null;

  return (
    <DetailsPaper>
      <Grid
        container
        spacing={2}
        justifyContent={isMediumUp ? 'flex-start' : 'center'}
      >
        <Grid item>
          <img src={product.image} alt={product.name} />
        </Grid>
        <Grid item>
          <ContentGrid
            container
            direction="column"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h4" component="h1">
                {product.name}
              </Typography>
              <p>{product.desc}</p>
            </Grid>
              {!exists && (
            <Grid item>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="primary button group"
              >
                <Button onClick={buyNow}>Buy Now</Button>
                <Button onClick={addToCart}>Add to Cart</Button>
              </ButtonGroup>
            </Grid>
              )}
          </ContentGrid>
        </Grid>
      </Grid>
    </DetailsPaper>
  );
}