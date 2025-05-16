import React from 'react'
import {
    Headset,
    Watch,
    CameraAlt,
    Nature,
    Computer,
    Book,
    InvertColors,
    Visibility
} from '@mui/icons-material';
import { Grid, styled } from '@mui/material';
import CategoryItem from './CategoryItem';

const CATEGORIES = [
    {
        title: 'Headphone',
        Icon: Headset,
    },
    {
        title: 'Watch',
        Icon: Watch,
    },
    {
        title: 'Camera',
        Icon: CameraAlt,
    },
    {
        title: 'Nature',
        Icon: Nature,
    },
    {
        title: 'Computer',
        Icon: Computer,
    },
    {
        title: 'Book',
        Icon: Book,
    },
    {
        title: 'Lotion',
        Icon: InvertColors,
    },
    {
        title: 'Eyeglass',
        Icon: Visibility,
    }
]

const GridItems = styled(Grid) (({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export default function CategoryList() {
  return (
        <GridItems
        container 
        spacing={2}
        justifyContent="center"
        >
            {
                CATEGORIES.map((category) => (
                <CategoryItem key={category.title} {...category} />
            ))}
        </GridItems>
    )
}