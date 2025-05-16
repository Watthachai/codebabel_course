import { Grid, Card, Chip, CardContent, Typography, CardActionArea, CardActions, Button, CardMedia, styled } from '@mui/material'
import React from 'react'
import currencyFormat from 'utils/currencyFormat'

export default function ProductItem({ id, image, name, desc, category, price,}) {
    
    const CardMediaItems = styled(CardMedia) (({ theme }) => ( {
        height: 200,
        marginTop: theme.spacing(2),
    }))

    const GridItems = styled(Grid) (({ theme }) => ({
        marginBottom: theme.spacing(2),
    }))
  
    return (
    <Grid
    item 
    xs={12}
    sm={6}
    lg={4}
    >
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMediaItems
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <GridItems container alignItems="center" justifyContent="space-between">
            <span>{currencyFormat(price)}</span>
            <Chip label={category} size='small'></Chip>
          </GridItems>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
    </Grid>
  )
}
