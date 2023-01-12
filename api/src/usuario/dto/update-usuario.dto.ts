import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

const cpfRegex =
  /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

export class UpdateUsuarioDto {
  @IsOptional()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  senha?: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(cpfRegex)
  cpf?: string;
}
