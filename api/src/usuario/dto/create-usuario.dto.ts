import { IsNotEmpty, Matches, MinLength } from 'class-validator';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  @Matches(cpfRegex)
  cpf: string;
}
