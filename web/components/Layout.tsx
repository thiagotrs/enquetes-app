import { Container, Paper } from '@mui/material'
import React, { FC, PropsWithChildren } from 'react'

type LayoutProps = {
  size?: "lg" | "md"
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, size = 'md' }) => {
  return (
    <Container component="main" maxWidth={size}>
      <Paper variant="outlined" sx={{ mt: -6, mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, position: 'relative' }}>
        {children}
      </Paper>
    </Container >
  )
}

export default Layout