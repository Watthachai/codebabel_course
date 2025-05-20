import React from 'react'
import { 
  styled, 
  Button, 
  TextField, 
  CardActions, 
  Card, 
  CardContent, 
  Typography 
} from '@mui/material'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// สร้าง styled components แทน makeStyles
const FormContent = styled(CardContent)(({ theme }) => ({
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const SubmitButton = styled(Button)({
  flex: 1,
});

export default function Delivery({ onSubmit }) { // เพิ่มการรับ prop

  const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  // อัพเดทฟังก์ชัน submit
  const submit = (deliveryInfo) => {
    if (onSubmit) {
      onSubmit(deliveryInfo);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      <Card>
        <FormContent>
          <Typography variant="h5" component="h2">
            Delivery Information
          </Typography>
          <TextField
            {...register("name")}
            variant="outlined"
            label="Name"
            placeholder="Enter your fullname"
            fullWidth
            helperText={errors.name?.message || ''}
            error={!!errors.name}
          />
          <TextField
            {...register("email")}
            type="email"
            variant="outlined"
            label="Email"
            placeholder="Enter your email"
            fullWidth
            helperText={errors.email?.message || ''}
            error={!!errors.email}
          />
          <TextField
            {...register("address")}
            multiline
            rows={4}
            variant="outlined"
            label="Address"
            placeholder="Enter your address"
            fullWidth
            helperText={errors.address?.message || ''}
            error={!!errors.address}
          />
        </FormContent>
        <CardActions>
          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
          >
            Place Order
          </SubmitButton>
        </CardActions>
      </Card>
    </form>
  )
}