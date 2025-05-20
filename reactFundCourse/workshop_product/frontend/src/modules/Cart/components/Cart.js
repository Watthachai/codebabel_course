import React, { useEffect } from 'react'
import { styled, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate

import Delivery from './Delivery'
import Order from './Order'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions'

// สร้าง styled component แทน makeStyles
const TitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

export default function Cart() {
  const productIds = useSelector((state) => state.cart.productIds);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // เพิ่ม useNavigate

  useEffect(() => {
    dispatch(actions.loadCart())
  },[dispatch])

  // เพิ่มฟังก์ชัน handleCheckout 
  const handleCheckout = (deliveryInfo) => {
    // เรียกใช้ action checkout พร้อมส่งข้อมูล deliveryInfo
    dispatch(actions.checkout(deliveryInfo));
    
    // นำทางกลับไปหน้าหลักหลังจากสั่งซื้อสำเร็จ
    navigate('/');
  }

  if(productIds.length === 0) {
    return <p className={TitleTypography}>No order found</p>
  }

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
          <Delivery onSubmit={handleCheckout} />
        </Grid>
      </Grid>
    </>
  )
}