import { ArrayNotEmpty, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateQuestionarioDto {
  @IsOptional()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsNotEmpty()
  descricao?: string;

  @IsOptional()
  @ArrayNotEmpty()
  perguntas?: UpdatePerguntaDto[];
}

export class UpdatePerguntaDto {
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  descricao: string;
}
