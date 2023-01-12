import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateFullUsuarioDto } from './dto/update-full-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PagedUsuarioDto, UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    await this.usuarioRepository.save(usuario);
    return this.mapUsuario(usuario);
  }

  async findAll(limit: number, page: number): Promise<PagedUsuarioDto> {
    const [usuarios, total] = await this.usuarioRepository.findAndCount({
      take: limit,
      skip: page * limit,
    });
    return {
      total,
      page,
      limit,
      usuarios: usuarios.map(this.mapUsuario),
    };
  }

  async findOne(id: string): Promise<UsuarioDto> {
    const usuario = await this.usuarioRepository.findOneByOrFail({ id });
    return this.mapUsuario(usuario);
  }

  async updateFull(
    id: string,
    updateFullUsuarioDto: UpdateFullUsuarioDto,
  ): Promise<UsuarioDto> {
    const usuario = await this.usuarioRepository.findOneByOrFail({ id });
    updateFullUsuarioDto.senha = bcrypt.hashSync(
      updateFullUsuarioDto.senha,
      10,
    );
    const usuarioUpdated = await this.usuarioRepository.save({
      ...usuario,
      ...updateFullUsuarioDto,
    });
    return this.mapUsuario(usuarioUpdated);
  }

  async update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioDto> {
    const usuario = await this.usuarioRepository.findOneByOrFail({ id });
    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = bcrypt.hashSync(updateUsuarioDto.senha, 10);
    }
    const usuarioUpdated = await this.usuarioRepository.save({
      ...usuario,
      ...updateUsuarioDto,
    });
    return this.mapUsuario(usuarioUpdated);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.usuarioRepository.findOneByOrFail({ id });
    await this.usuarioRepository.remove(usuario);
  }

  async findByCpfSenha(cpf: string, senha: string): Promise<UsuarioDto> {
    const usuario = await this.usuarioRepository.findOneBy({ cpf });
    if (!usuario) {
      throw new Error('Credenciais Inválidas');
    }
    const senhaMatch = await bcrypt.compare(senha, usuario.senha);
    if (!senhaMatch) {
      throw new Error('Credenciais Inválidas');
    }
    return usuario;
  }

  private mapUsuario(usuario: Usuario): UsuarioDto {
    return {
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
    };
  }
}
