import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// Pegar Usuario e senha, validar e adicionar na requisição
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const usuario = await this.authService.validateUsuario(
        username,
        password,
      );
      return usuario;
    } catch (error) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }
  }
}
