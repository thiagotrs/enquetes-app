import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDto } from 'src/usuario/dto/usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async getUsuario(id: string): Promise<UsuarioDto> {
    const usuario = await this.usuarioService.findOne(id);
    return usuario;
  }

  async validateUsuario(cpf: string, senha: string): Promise<UsuarioDto> {
    const usuario = await this.usuarioService.findByCpfSenha(cpf, senha);
    return usuario;
  }

  // Somente gera o Token
  async login(id: string, nome: string): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.sign({
      sub: id,
      name: nome,
    });
    return { accessToken };
  }
}
