import { Chip, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from 'utils/urlUtils'


export default function CategoryItem({ title, Icon }) {
  const navigate = useNavigate()

  const filterProductsByCategory = () => {
    navigate(`${paths.products}?category=${title}`)
  }

  return (
    <Grid item>
        <Chip 
          icon={<Icon/>} 
          label={title} 
          clickable 
          color="primary"
          onClick={filterProductsByCategory}
        />
    </Grid>
  )
}
