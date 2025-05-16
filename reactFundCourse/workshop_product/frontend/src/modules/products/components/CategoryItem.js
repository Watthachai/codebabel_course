import { Chip, Grid } from '@mui/material'
import React from 'react'

export default function CategoryItem({ title, Icon }) {
  return (
    <Grid item>
        <Chip icon={<Icon/>} label={title} clickable color="primary">
        </Chip>
    </Grid>
  )
}
