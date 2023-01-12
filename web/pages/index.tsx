import Button from '@mui/material/Button';
import { Alert, Avatar, Box, Container, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useAuth from '../components/hooks/useAuth';
import { useRouter } from 'next/router';
import HeadMeta from '../components/HeadMeta';
import http, { getErrorMessage } from '../components/services/http';
import { useState } from 'react';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const { auth } = useAuth({
    redirectTo: '/questionarios',
    redirectIfFound: true,
  })

  const [error, setError] = useState<string | null>(null)

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const { data: { accessToken } } = await http.post<{ accessToken: string }>(
        '/auth/login',
        { username: data.get('cpf'), password: data.get('password') })
      sessionStorage.setItem("token", accessToken);
      router.replace('/questionarios');
    } catch (error) {
      if(error instanceof Error) setError(getErrorMessage(error))
    }
  };

  return (
    <>
      <HeadMeta title="Enquetes App - Login" />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Enquetes App - Log in</Typography>
          {error && <Alert severity="error" sx={{ my: 1 }} onClose={() => setError(null)}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              autoFocus
              error={!!error}
              disabled={!!error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!error}
              disabled={!!error}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Home
