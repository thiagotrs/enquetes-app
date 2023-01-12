import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useAuth from '../../../../components/hooks/useAuth';
import BackButton from '../../../../components/BackButon';
import Header from '../../../../components/Header';
import HeadMeta from '../../../../components/HeadMeta';
import Layout from '../../../../components/Layout';
import Loading from '../../../../components/Loading';
import { getErrorMessage } from '../../../../components/services/http';
import { addRespostas } from '../../../../components/services/questionarioService';
import { useFetch } from '../../../../components/hooks/useFetch';
import Title from '../../../../components/Title';

type Questionario = {
  nome: string;
  descricao: string;
  perguntas: Pergunta[];
}

type Pergunta = {
  id: string;
  descricao: string;
}

type PerguntaResposta = { [perguntaId: string]: string };


const AddResposta: NextPage  = () => {
  const { auth, logOff } = useAuth({
    redirectTo: '/',
  })
  const router = useRouter();
  const { questionarioId } = router.query as { questionarioId: string }
  
  const { data } = useFetch<Questionario>(`/questionario/${questionarioId}`);
  const [respostas, setRespostas] = useState<PerguntaResposta>({});

  const [error, setError] = useState<string | null>(null)

  if (auth.isLoading || !auth.isLoggedIn || !data) {
    return (
      <>
        <HeadMeta title='Enquetes App' />
        <Loading />
      </>
    )
  }

  const addResposta = (id: string, resposta: string) => {
    setRespostas({ ...respostas, [id]: resposta })
  }

  const saveResposta = () => {
    addRespostas({
      id: questionarioId,
      respostaPerguntas: Object.keys(respostas).map(k => ({ perguntaId: k, descricao: respostas[k] })),
    }).then(v => {
      router.replace('/questionarios');
    }).catch((error) => {
      if(error instanceof Error) setError(getErrorMessage(error))
    })
  }

  return (
    <>
      <HeadMeta title="Enquetes App - Responder Questionario" />
      <Header onLogOut={logOff} />
      <Layout>
        <BackButton to='/questionarios' />
        <Title>Resposta</Title>
        {error && <Alert severity="error" sx={{ my: 1 }} onClose={() => setError(null)}>{error}</Alert>}
        <Typography component={'h2'} variant='h4' my={3} fontWeight='light'>{data.nome}</Typography>
        <Typography component={'p'} variant='subtitle1' my={3}>{data.descricao}</Typography>
        {data.perguntas.map(p => (
          <Grid container spacing={2} key={p.id}>
            <Grid item flexGrow={1}>
              <Typography component={'h2'} variant='h6' my={3}>{p.descricao}</Typography>
              <TextField
                error={respostas[p.id] === undefined || respostas[p.id].trim() === ""}
                required
                label="Resposta"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                sx={{ mb: 2 }}
                value={respostas[p.id]}
                onChange={(e) => addResposta(p.id, e.target.value)}
              />
            </Grid>
          </Grid>
        ))}
        <Button
          disabled={Object.keys(respostas).some(k => respostas[k] === undefined || respostas[k].trim() === "")}
          fullWidth
          variant="contained"
          color='secondary'
          sx={{ mt: 3, mb: 2 }}
          onClick={saveResposta}
        >
          Salvar Resposta
        </Button>
      </Layout>
    </>
  )
}

export default AddResposta