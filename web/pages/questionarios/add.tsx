import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { uuid } from 'uuidv4';
import useAuth from '../../components/hooks/useAuth';
import BackButton from '../../components/BackButon';
import Header from '../../components/Header';
import HeadMeta from '../../components/HeadMeta';
import Layout from '../../components/Layout';
import Title from '../../components/Title';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../../components/Loading';
import { addQuestionario } from '../../components/services/questionarioService';
import { getErrorMessage } from '../../components/services/http';
import { NextPage } from 'next';

type Questionario = {
  nome: string;
  descricao: string
}

type Pergunta = {
  id: string;
  descricao: string;
}

type Props = {}

const AddQuestionario: NextPage = (props: Props) => {
  const { auth, logOff } = useAuth({
    redirectTo: '/',
  })
  const [questionario, setQuestionario] = useState<Questionario>({ nome: "", descricao: "" });
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null)

  const isSaveBlocked = 
    perguntas.some(p => p.descricao.trim() === "")
    || perguntas.length === 0
    || questionario.nome.trim() === "";

  const addPergunta = () => {
    const perg: Pergunta = { id: uuid(), descricao: "" }
    setPerguntas([...perguntas, perg])
  }
  const delPergunta = (id: string) => {
    setPerguntas([...perguntas.filter(p => p.id !== id)])
  }
  const editPergunta = (perg: Pergunta) => {
    setPerguntas([...perguntas.map(p => p.id === perg.id ? perg : p)])
  }
  const saveQuestionario = () => {
    addQuestionario({
      nome: questionario.nome,
      descricao: questionario.descricao,
      perguntas: perguntas.map(p => p.descricao),
    }).then(v => {
      router.replace('/questionarios');
    }).catch((error) => {
      if(error instanceof Error) setError(getErrorMessage(error))
    })
  }

  if (auth.isLoading || !auth.isLoggedIn) {
    return (
      <>
        <HeadMeta title='Enquetes App' />
        <Loading />
      </>
    )
  }

  return (
    <>
      <HeadMeta title="Enquetes App - Novo Questionario" />
      <Header onLogOut={logOff} />
      <Layout>
        <BackButton to='/questionarios' />
        <Title>Novo Questionário</Title>
        {error && <Alert severity="error" sx={{ my: 1 }} onClose={() => setError(null)}>{error}</Alert>}
        <TextField
          error={questionario.nome.trim() === ""}
          required
          id="nome"
          name="nome"
          label="Nome"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          sx={{ mb: 2 }}
          value={questionario.nome}
          onChange={(e) => setQuestionario({ ...questionario, nome: e.target.value })}
        />
        <TextField
          id="descricao"
          name="descricao"
          label="Descrição"
          multiline
          fullWidth
          rows={3}
          variant="standard"
          sx={{ mb: 2 }}
          value={questionario.descricao}
          onChange={(e) => setQuestionario({ ...questionario, descricao: e.target.value })}
        />
        <Typography component={'h2'} variant='h5' my={3}>Perguntas</Typography>
        {perguntas.map(p => (
          <Grid container spacing={2} key={p.id}>
            <Grid item flexGrow={1}>
              <TextField
                error={p.descricao.trim() === ""}
                required
                label="Pergunta"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                sx={{ mb: 2 }}
                value={p.descricao}
                onChange={(e) => editPergunta({ id: p.id, descricao: e.target.value })}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color='error'
                startIcon={<DeleteIcon />}
                onClick={() => delPergunta(p.id)}
              >
                Excluir
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addPergunta}
            >
              Nova Pergunta
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={isSaveBlocked}
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
              onClick={saveQuestionario}
            >
              Salvar questionário
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default AddQuestionario