import { Container, styled, Toolbar, Snackbar, Button } from '@mui/material'
import React from 'react'
import AppRoutes from './Routes'

// Styled Component from HTML tag main
const Main = styled('main')(({ theme }) => ({
    padding: theme.spacing(2, 0),
}));

export default function Content() {
 return (
    <Main>
        <Container maxWidth="lg">
            <Toolbar />
            <AppRoutes />
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