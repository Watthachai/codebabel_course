import React, { useState, useEffect } from 'react';
import { styled, useTheme, useMediaQuery, Grid, Paper, Typography, ButtonGroup, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams,  } from 'react-router-dom'; // Add this import

// สร้าง styled components แทน makeStyles
const DetailsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ContentGrid = styled(Grid)(({ theme }) => ({
  height: '100%',
}));

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    };

    loadProduct();
  }, [id]);

  if (!product) return null;

  const buyNow = () => {
     navigate('/cart');
  }

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
            <Grid item>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="primary button group"
              >
                <Button onClick={buyNow}>Buy Now</Button>
                <Button>Add to Cart</Button>
              </ButtonGroup>
            </Grid>
          </ContentGrid>
        </Grid>
      </Grid>
    </DetailsPaper>
  );
}