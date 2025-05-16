import React, { useState, useEffect } from 'react';
import { styled, useTheme, useMediaQuery, Grid, Paper, Typography, ButtonGroup, Button } from '@mui/material';
import axios from 'axios';

// สร้าง styled components แทน makeStyles
const DetailsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ContentGrid = styled(Grid)(({ theme }) => ({
  height: '100%',
}));

const AmountContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Amount = styled('span')(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

export default function ProductDetails() {
  const id = 1;
  const [product, setProduct] = useState();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    };

    loadProduct();
  }, []);

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
            <Grid item>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="primary button group"
              >
                <Button>Buy Now</Button>
                <Button>Add to Cart</Button>
              </ButtonGroup>
            </Grid>
          </ContentGrid>
        </Grid>
      </Grid>
    </DetailsPaper>
  );
}