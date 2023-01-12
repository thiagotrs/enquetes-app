import { Container, Typography } from '@mui/material'
import React from 'react'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const Loading = () => {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100vw",
        height: "100vh"
      }}
    >
      <Typography component='p' variant='h1'><HourglassTopIcon fontSize='large' /></Typography>
      <Typography component='h1' variant="h3">Autenticando...</Typography>
    </Container>
  )
}

export default Loading