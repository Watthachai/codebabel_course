import React from 'react'
import {
  AppBar as MuiAppBar,
  Toolbar,
  Link,
  FormControlLabel,
  Switch,
  Badge,
  Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ShoppingCart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

import logo from 'assets/images/logo.png'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import * as actions from '../actions';

// สร้าง styled components
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

const LogoLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(2)
}));

const LogoImage = styled('img')({
  width: '30px',
  height: '30px'
});

const Spacer = styled(Box)({
  flexGrow: 1
});

export default function Header() {
  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate('/cart');  // ไปยัง "/cart" โดยเพิ่มเข้าไปใน history stack
    // หรือ navigate('/cart', { replace: true });  // ใช้ replace แทน push
  }

  const dispatch = useDispatch();

  const toggleDarkMode = () => {

    dispatch(actions.toggleDarkMode())
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <LogoLink
          to="/"
          color="inherit"
          underline="none"
          component={RouterLink}
        >
          <LogoImage src={logo} alt="Babel Shopping" />
        </LogoLink>
        <Link to="/products" color="inherit" underline="none" component={RouterLink}>
          Products
        </Link>

        <Spacer />
        <FormControlLabel
          control={<Switch color="secondary" onChange={toggleDarkMode} />}
          label="Dark"
          labelPlacement="end"
        />
        <Badge badgeContent={5} color="secondary" onClick={navigateToCart}>
          <ShoppingCart />
        </Badge>
      </Toolbar>
    </AppBar>
  )
}