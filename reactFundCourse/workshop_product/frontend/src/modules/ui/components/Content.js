import { Container, styled, Toolbar, Snackbar, Button } from '@mui/material'
import React from 'react'
import AppRoutes from './Routes'
import * as actions from '../actions'
import { useDispatch, useSelector } from 'react-redux';

// Styled Component from HTML tag main
const Main = styled('main')(({ theme }) => ({
    padding: theme.spacing(2, 0),
}));

export default function Content() {

  const flashMessage = useSelector(state => state.ui.flashMessage)
  const dispatch = useDispatch();

  const closeFlashMessage = () => {
    dispatch(actions.clearFlashMessage())
  }

 return (
    <Main>
        <Container maxWidth="lg">
            <Toolbar />
            <AppRoutes />
            { flashMessage && (
              <Snackbar
              open
              message={flashMessage}
              action={
                <Button color="inherit" size="small" onClick={closeFlashMessage}>
                  Close
                </Button>
              }
            />
            )}
        </Container>
    </Main>
  )
}