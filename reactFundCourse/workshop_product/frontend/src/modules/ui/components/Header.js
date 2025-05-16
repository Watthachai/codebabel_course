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

import logo from 'assets/images/logo.png'

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
  return (
    <AppBar position="fixed">
      <Toolbar>
        <LogoLink
          href="/"
          color="inherit"
          underline="none"
        >
          <LogoImage src={logo} alt="Babel Shopping" />
        </LogoLink>
        <Link href="/products" color="inherit" underline="none">
          Products
        </Link>
        <Spacer />
        <FormControlLabel
          control={<Switch color="secondary" />}
          label="Dark"
          labelPlacement="end"
        />
        <Badge badgeContent={5} color="secondary">
          <ShoppingCart />
        </Badge>
      </Toolbar>
    </AppBar>
  )
}