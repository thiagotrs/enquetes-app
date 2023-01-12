import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  Put,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { UpdateFullQuestionarioDto } from './dto/update-full-questionario.dto';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ApiBearerAuth, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
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

@ApiTags('Questionário')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class QuestionarioController {
  constructor(private readonly questionarioService: QuestionarioService) {}

  @Post('questionario')
  async create(@Body() createQuestionarioDto: CreateQuestionarioDto) {
    try {
      return await this.questionarioService.create(createQuestionarioDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  @Get('questionarios')
  async findAll(@Query() query: Pagination) {
    const { limit, page } = query;
    return await this.questionarioService.findAll(limit, page);
  }

  @Get('questionario/:id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.questionarioService.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Questionário inexistente.');
      }

      throw error;
    }
  }

  @Put('questionario/:id')
  async updateFull(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateFullQuestionarioDto: UpdateFullQuestionarioDto,
  ) {
    try {
      return await this.questionarioService.updateFull(
        id,
        updateFullQuestionarioDto,
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

  @Patch('questionario/:id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateQuestionarioDto: UpdateQuestionarioDto,
  ) {
    return await this.questionarioService.update(id, updateQuestionarioDto);
  }

  @Delete('questionario/:id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      await this.questionarioService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Questionário inexistente.');
      }

      throw error;
    }
  }
}
