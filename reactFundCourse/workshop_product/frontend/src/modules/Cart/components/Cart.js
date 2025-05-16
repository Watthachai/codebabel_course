import React from 'react'
import { styled, Typography, Grid } from '@mui/material'

import Delivery from './Delivery'
import Order from './Order'

// สร้าง styled component แทน makeStyles
const TitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

export default function Cart() {
  return (
    <>
      <TitleTypography variant="h4" component="h1">
        Order Summary
      </TitleTypography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Order />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Delivery />
        </Grid>
      </Grid>
    </>
  )
}