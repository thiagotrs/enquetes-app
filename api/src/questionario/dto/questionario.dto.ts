export class QuestionarioDto {
  id: string;
  data: string;
  nome: string;
  descricao: string;
  perguntas: PerguntaDto[];
}

export class PerguntaDto {
  id: string;
  descricao: string;
}

export class PagedQuestionarioDto {
  total: number;
  page: number;
  limit: number;
  questionarios: QuestionarioDto[];
}
