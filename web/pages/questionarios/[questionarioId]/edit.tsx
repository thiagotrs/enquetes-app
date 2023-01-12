import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { uuid } from 'uuidv4';
import useAuth from '../../../components/hooks/useAuth';
import BackButton from '../../../components/BackButon';
import Header from '../../../components/Header';
import HeadMeta from '../../../components/HeadMeta';
import Layout from '../../../components/Layout';
import Title from '../../../components/Title';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../../components/Modal';
import Loading from '../../../components/Loading';
import { NextPage } from 'next';
import { editQuestionario } from '../../../components/services/questionarioService';
import { getErrorMessage } from '../../../components/services/http';
import { useFetch } from '../../../components/hooks/useFetch';
import { mutate } from 'swr';

type Questionario = {
  nome: string;
  descricao: string;
  perguntas: Pergunta[];
}
type Pergunta = {
  id: string;
  descricao: string;
}

const EditQuestionario: NextPage = () => {
  const { auth, logOff } = useAuth({
    redirectTo: '/',
  })
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { questionarioId } = router.query as { questionarioId: string }
  const { data } = useFetch<Questionario>(`/questionario/${questionarioId}`);

  const [selectPergunta, setSelectPergunta] = useState("");
  const [error, setError] = useState<string | null>(null)

  if (auth.isLoading || !auth.isLoggedIn || !data) {
    return (
      <>
        <HeadMeta title='Enquetes App' />
        <Loading />
      </>
    )
  }

  const isSaveBlocked =
    data.perguntas.some(p => p.descricao.trim() === "")
    || data.perguntas.length === 0
    || data.nome.trim() === "";

  const handleOpen = (id: string) => {
    setSelectPergunta(id)
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setSelectPergunta("")
  }

  const handleNome = (nome: string) => {
    mutate(`/questionario/${questionarioId}`, ({...data, nome }), false)
  }
  const handleDescricao = (descricao: string) => {
    mutate(`/questionario/${questionarioId}`, ({...data, descricao }), false)
  }

  const addPergunta = () => {
    const perg: Pergunta = { id: uuid(), descricao: "" }
    mutate(`/questionario/${questionarioId}`, { ...data, perguntas: [...data.perguntas, perg] }, false)
  }
  const delPergunta = () => {
    mutate(`/questionario/${questionarioId}`, { ...data, perguntas: [...data.perguntas.filter(p => p.id !== selectPergunta)] }, false)
    handleClose()
  }
  const editPergunta = (perg: Pergunta) => {
    mutate(`/questionario/${questionarioId}`, { ...data, perguntas: [...data.perguntas.map(p => p.id === perg.id ? perg : p)] }, false)
  }
  const saveQuestionario = () => {
    editQuestionario({
      id: questionarioId,
      nome: data.nome,
      descricao: data.descricao,
      perguntas: data.perguntas.map(p => p.descricao),
    }).then(v => {
      router.replace('/questionarios');
    }).catch((error) => {
      if(error instanceof Error) setError(getErrorMessage(error))
    })
  }

  return (
    <>
      <HeadMeta title="Enquetes App - Editar Questionario" />
      <Header onLogOut={logOff} />
      <Layout>
        <BackButton to='/questionarios' />
        <Title>Editar Questionário</Title>
        {error && <Alert severity="error" sx={{ my: 1 }} onClose={() => setError(null)}>{error}</Alert>}
        <TextField
          required
          id="nome"
          name="nome"
          label="Nome"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          sx={{ mb: 2 }}
          value={data.nome}
          onChange={(e) => handleNome(e.target.value)}
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
          value={data.descricao}
          onChange={(e) => handleDescricao(e.target.value)}
        />
        <Typography component={'h2'} variant='h5' my={3}>Perguntas</Typography>
        {data.perguntas.map(p => (
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
                onClick={() => handleOpen(p.id)}
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
              onClick={() => addPergunta()}
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
              onClick={() => saveQuestionario()}
            >
              Salvar questionário
            </Button>
          </Grid>
        </Grid>
      </Layout>
      <Modal
        ask="Deseja excluir a pergunta?"
        open={open}
        onYes={delPergunta}
        onNo={handleClose}
      />
    </>
  )
}

export default EditQuestionario
