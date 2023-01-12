export class UsuarioDto {
  id: string;
  nome: string;
  cpf: string;
}

export class PagedUsuarioDto {
  total: number;
  page: number;
  limit: number;
  usuarios: UsuarioDto[];
}
