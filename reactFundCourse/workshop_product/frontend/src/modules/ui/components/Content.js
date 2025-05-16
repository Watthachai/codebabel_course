import { Container, styled, Toolbar, Snackbar, Button } from '@mui/material'
import ProductDetails from 'modules/products/components/ProductDetails';
import React from 'react'

// สร้าง Styled Component จาก HTML tag main
const Main = styled('main')(({ theme }) => ({
    padding: theme.spacing(2, 0),
}));

export default function Content() {
 return (
    <Main>
        <Container maxWidth="lg">
            <Toolbar />
            <ProductDetails />
            <Snackbar
              open
              message="Hello"
              action={
                <Button color="inherit" size="small">
                  Close
                </Button>
              }
            />
        </Container>
    </Main>
  )
}