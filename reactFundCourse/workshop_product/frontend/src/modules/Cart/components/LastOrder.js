// สร้างไฟล์ใหม่ LastOrder.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Box } from '@mui/material';

export default function LastOrder() {
  const lastOrder = useSelector(state => state.cart.lastOrder);
  
  if (!lastOrder) return null;
  
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Your Last Order</Typography>
      <Box>
        <Typography>Order #: {lastOrder.id}</Typography>
        <Typography>Name: {lastOrder.deliveryInfo.name}</Typography>
        <Typography>Email: {lastOrder.deliveryInfo.email}</Typography>
        <Typography>Address: {lastOrder.deliveryInfo.address}</Typography>
        <Typography>Date: {new Date(lastOrder.date).toLocaleString()}</Typography>
        <Typography>Total: ${lastOrder.price}</Typography>
      </Box>
    </Paper>
  );
}