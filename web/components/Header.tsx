import { Box, Button } from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';

type HeaderProps = {
  onLogOut: React.MouseEventHandler<HTMLButtonElement>
}

const Header = ({ onLogOut }: HeaderProps) => {
  return (
    <Box sx={{ height: 200, bgcolor: 'indigo', display: 'flex', justifyContent: 'flex-end', alignItems: 'start' }}>
      <Button variant="contained" sx={{ bgcolor: 'white', color: 'indigo', m: 3 }} startIcon={<LogoutIcon />} onClick={onLogOut}>Sair</Button>
    </Box>
  )
}

export default Header