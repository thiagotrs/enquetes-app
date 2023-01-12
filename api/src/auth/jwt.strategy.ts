import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

// Pegar JWT, decodificar, validar e adicionar na requisição
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: string }) {
    try {
      const { sub } = payload;
      const usuario = await this.authService.getUsuario(sub);
      return usuario;
    } catch (error) {
      throw new UnauthorizedException('Token Invalido.');
    }
  }
}
