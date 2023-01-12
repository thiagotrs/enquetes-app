export class RespostaDto {
  id: string;
  data: string;
  respostaPerguntas: RespostaPergDto[];
}

export class RespostaPergDto {
  id: string;
  descricao: string;
}

export class PagedRespostaDto {
  total: number;
  page: number;
  limit: number;
  respostas: RespostaDto[];
}
