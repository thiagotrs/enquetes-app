import http from "./http";

type AddQuestionario = {
  nome: string;
  descricao: string;
  perguntas: string[];
}

type EditQuestionario = {
  id: string;
  nome: string;
  descricao: string;
  perguntas: string[];
}

type AddRespostas = {
  id: string;
  respostaPerguntas: {
    perguntaId: string;
    descricao: string;
  }[]
}

export const addQuestionario = async ({ nome, descricao, perguntas }: AddQuestionario) => {
  return http.post('/questionario', { nome, descricao, perguntas }, {
    headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` },
  });   
}

export const editQuestionario = async ({ id, nome, descricao, perguntas }: EditQuestionario) => {
  return http.put(`/questionario/${id}`, { nome, descricao, perguntas }, {
    headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` },
  }); 
}

export const addRespostas = async ({ id, respostaPerguntas }: AddRespostas) => {
  return http.post(`/questionario/${id}/resposta`, { respostaPerguntas }, {
    headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` },
  })
}