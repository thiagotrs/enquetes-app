import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  ParseUUIDPipe,
  HttpCode,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateFullUsuarioDto } from './dto/update-full-usuario.dto';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ApiTags, ApiPropertyOptional, ApiBearerAuth } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

class Pagination {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;
}

@ApiTags('Usuário')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('usuario')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.usuarioService.create(createUsuarioDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('CPF de outro Usuário');
      }

      throw error;
    }
  }

  @Get('usuarios')
  async findAll(@Query() query: Pagination) {
    const { limit, page } = query;
    return await this.usuarioService.findAll(limit, page);
  }

  @Get('usuario/:id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.usuarioService.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Usuário inexistente.');
      }

      throw error;
    }
  }

  @Put('usuario/:id')
  async updateFull(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateFullUsuarioDto: UpdateFullUsuarioDto,
  ) {
    try {
      return await this.usuarioService.updateFull(id, updateFullUsuarioDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Usuário inexistente.');
      }
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('CPF de outro Usuário');
      }

      throw error;
    }
  }

  @Patch('usuario/:id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    try {
      return await this.usuarioService.update(id, updateUsuarioDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Usuário inexistente.');
      }
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('CPF de outro Usuário');
      }

      throw error;
    }
  }

  @Delete('usuario/:id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      await this.usuarioService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Usuário inexistente.');
      }

      throw error;
    }
  }
}
