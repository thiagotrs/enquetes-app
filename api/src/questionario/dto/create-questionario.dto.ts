import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateQuestionarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  perguntas: string[];
}
