import { Box, Button, Grid, Modal as ModalMUI, Typography } from '@mui/material'
import React, { FC } from 'react'

type ModalProps = {
  ask: string;
  open: boolean;
  onYes: React.MouseEventHandler<HTMLButtonElement>;
  onNo: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal: FC<ModalProps> = ({ ask, open, onYes, onNo }) => {
  return (
    <ModalMUI
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          { ask }
        </Typography>
        <Grid container spacing={2}>
          <Grid item flexGrow={1}>
            <Button
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
              onClick={onYes}
            >
              Sim
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
              onClick={onNo}
            >
              Não
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ModalMUI>
  )
}

export default Modal