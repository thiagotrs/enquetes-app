import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateFullRespostaDto } from './dto/update-full-resposta.dto';
import { RespostaService } from './resposta.service';

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

@ApiTags('Resposta')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('questionario')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  @Get(':questionarioId/respostas')
  async findAll(
    @Param('questionarioId', new ParseUUIDPipe({ version: '4' }))
    questionarioId: string,
    @Query() query: Pagination,
  ) {
    const { limit, page } = query;
    return await this.respostaService.findAll(questionarioId, limit, page);
  }

  @Post(':questionarioId/resposta')
  async create(
    @Param('questionarioId', new ParseUUIDPipe({ version: '4' }))
    questionarioId: string,
    @Body() createRespostaDto: CreateRespostaDto,
  ) {
    try {
      return await this.respostaService.create(
        questionarioId,
        createRespostaDto,
      );
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Questionário inexistente.');
      }
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  @Put(':questionarioId/resposta/:id')
  async updateFull(
    @Param('questionarioId', new ParseUUIDPipe({ version: '4' }))
    questionarioId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateFullRespostaDto: UpdateFullRespostaDto,
  ) {
    try {
      return await this.respostaService.updateFull(
        questionarioId,
        id,
        updateFullRespostaDto,
      );
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Questionário e/ou Resposta inexistente.');
      }
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  @Delete(':questionarioId/resposta/:id')
  @HttpCode(204)
  async remove(
    @Param('questionarioId', new ParseUUIDPipe({ version: '4' }))
    questionarioId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.respostaService.remove(questionarioId, id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Questionário e/ou Resposta inexistente.');
      }

      throw error;
    }
  }
}
