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

// สร้าง styled components แทน makeStyles
const FormContent = styled(CardContent)(({ theme }) => ({
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const SubmitButton = styled(Button)({
  flex: 1,
});

export default function Delivery({ onSubmit }) {
  return (
    <form autoComplete="off">
      <Card>
        <FormContent>
          <Typography variant="h5" component="h2">
            Delivery Information
          </Typography>
          <TextField
            variant="outlined"
            label="Name"
            placeholder="Enter your fullname"
            name="name"
            fullWidth
          />
          <TextField
            type="email"
            variant="outlined"
            label="Email"
            placeholder="Enter your email"
            name="email"
            fullWidth
          />
          <TextField
            multiline
            rows={4}
            variant="outlined"
            label="Address"
            placeholder="Enter your address"
            name="address"
            fullWidth
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