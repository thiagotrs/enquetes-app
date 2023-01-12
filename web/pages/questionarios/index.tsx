import { Alert, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import useAuth from '../../components/hooks/useAuth';
import HeadMeta from '../../components/HeadMeta';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import QuizIcon from '@mui/icons-material/Quiz';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import Title from '../../components/Title';
import Loading from '../../components/Loading';
import { useFetch } from '../../components/hooks/useFetch';
import { getErrorMessage } from '../../components/services/http';

type Questionario = {
  id: string;
  data: string;
  nome: string;
  perguntas: Array<any>; 
}

type QuestionarioTable = {
  id: string;
  data: string;
  nome: string;
  qtd_perguntas: number;
}

type PagedQuestionario = {
  total: number;
  page: number;
  limit: number;
  questionarios: Questionario[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pt-br");
}

const Questionario: NextPage = () => {
  const { auth, logOff } = useAuth({
    redirectTo: '/',
  })
  const router = useRouter();
  const { page = '1' } = router.query as { page: string }

  const { data, error } = useFetch<PagedQuestionario>(`questionarios?page=${parseInt(page)-1}&limit=4`);

  const errorMessage = error ? getErrorMessage(error) : null

  if (auth.isLoading || !auth.isLoggedIn || !data) {
    return (
      <>
        <HeadMeta title='Enquetes App' />
        <Loading />
      </>
    )
  }

  const questionario: QuestionarioTable[] = data === undefined ? [] : data.questionarios.map((q: any) => (
    {
      id: q.id,
      data: q.data,
      nome: q.nome,
      qtd_perguntas: q.perguntas.length
    }
  ));

  return (
    <>
      <HeadMeta title="Enquetes App - Questionarios" />
      <Header onLogOut={logOff} />
      <Layout size='lg'>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" mb={3}>
          <Grid item>
            <Title>Questionários</Title>
          </Grid>
          <Grid item >
            <Button LinkComponent={Link} variant="contained" color='success' href='questionarios/add' startIcon={<AddIcon />}>Novo</Button>
          </Grid>
        </Grid>
        {errorMessage && <Alert severity="error" sx={{ my: 1 }}>{errorMessage}</Alert>}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Data</TableCell>
                <TableCell align="left">Perguntas</TableCell>
                <TableCell align="left">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionario.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nome}
                  </TableCell>
                  <TableCell align="left">{formatDate(row.data)}</TableCell>
                  <TableCell align="left">{row.qtd_perguntas}</TableCell>
                  <TableCell align="left">
                    <Grid container spacing={2}>
                      <Grid item>
                        <Button LinkComponent={Link} variant="contained" startIcon={<EditIcon />} href={`questionarios/${row.id}/edit`}>Editar</Button>
                      </Grid>
                      <Grid item>
                        <Button LinkComponent={Link} variant="contained" startIcon={<QuizIcon />} color='secondary' href={`questionarios/${row.id}/respostas/add`}>Responder</Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination page={+ page} total={data.total} path={`/questionarios`} />
      </Layout>
    </>
  )
}

export default Questionario

