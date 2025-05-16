import { styled, Typography, Grid, CircularProgress, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import axios from 'axios';
import ProductItem from './ProductItem';

export default function ProductList() {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL

    // สร้าง styled components แทน makeStyles
    const TitleTypography = styled(Typography)(({ theme }) => ({
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    }));

    const ProgressContainer = styled(Box)(({ theme }) => ({
        textAlign: 'center',
    }));

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            const {data} = await axios.get('/products');
            
            setProducts(data);
            setIsLoading(false);
        }

        loadProducts();
    }, [])

    return (
        <>
            <TitleTypography variant="h4" component="h1">
                All Products
            </TitleTypography>
            <CategoryList />
            {isLoading ? (
                <ProgressContainer>
                    <CircularProgress color="primary" />
                </ProgressContainer>
            ) : (
                <Grid 
                    container
                    spacing={2}
                >
                    {products.map(product => (
                        <ProductItem 
                            key={product.id} 
                            {...product} 
                        />
                    ))}
                </Grid>
            )}
        </>
    )
}