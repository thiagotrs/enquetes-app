import { Typography } from '@mui/material'
import React, { FC, PropsWithChildren } from 'react'

const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography component={'h1'} variant='h3'>{ children }</Typography>
  )
}

export default Title