import { Button } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackButtonProps = {
  to: string
}

const BackButton: FC<BackButtonProps> = ({ to }) => {
  return (
    <Button LinkComponent={Link} variant="outlined" sx={{ mb: 3 }} startIcon={<ArrowBackIcon />} href={to}>Voltar</Button>
  )
}

export default BackButton