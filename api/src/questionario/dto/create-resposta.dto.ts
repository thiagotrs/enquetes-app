import { ArrayNotEmpty, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRespostaDto {
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  respostaPerguntas: CreateRespostaPergDto[];
}

export class CreateRespostaPergDto {
  @IsUUID(4)
  perguntaId: string;

  @IsNotEmpty()
  descricao: string;
}
