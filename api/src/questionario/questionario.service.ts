import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { PagedQuestionarioDto, QuestionarioDto } from './dto/questionario.dto';
import { UpdateFullQuestionarioDto } from './dto/update-full-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { Pergunta } from './entities/pergunta.entity';
import { Questionario } from './entities/questionario.entity';

@Injectable()
export class QuestionarioService {
  constructor(
    @InjectRepository(Questionario)
    private questionarioRepository: Repository<Questionario>,
    @InjectRepository(Pergunta)
    private perguntaRepository: Repository<Pergunta>,
  ) {}

  async create(
    createQuestionarioDto: CreateQuestionarioDto,
  ): Promise<QuestionarioDto> {
    const perguntas = createQuestionarioDto.perguntas.map((p) =>
      this.perguntaRepository.create({ descricao: p }),
    );
    const questionario = this.questionarioRepository.create({
      ...createQuestionarioDto,
      perguntas,
    });
    await this.questionarioRepository.save(questionario);
    return this.mapQuestionario(questionario);
  }

  async findAll(limit: number, page: number): Promise<PagedQuestionarioDto> {
    const [questionarios, total] =
      await this.questionarioRepository.findAndCount({
        take: limit,
        skip: page * limit,
        order: {
          data: 'ASC',
        },
      });

    return {
      total,
      page,
      limit,
      questionarios: questionarios.map(this.mapQuestionario),
    };
  }

  async findOne(id: string): Promise<QuestionarioDto> {
    const questionario = await this.questionarioRepository.findOneByOrFail({
      id,
    });
    return this.mapQuestionario(questionario);
  }

  async updateFull(
    id: string,
    updateFullQuestionarioDto: UpdateFullQuestionarioDto,
  ): Promise<QuestionarioDto> {
    const questionario = await this.questionarioRepository.findOneByOrFail({
      id,
    });
    const perguntas = updateFullQuestionarioDto.perguntas.map((p) =>
      this.perguntaRepository.create({ descricao: p }),
    );
    const { nome, descricao } = updateFullQuestionarioDto;
    const questionarioUpdated = await this.questionarioRepository.save({
      ...questionario,
      nome,
      descricao,
      perguntas,
    });
    return this.mapQuestionario(questionarioUpdated);
  }

  async update(
    id: string,
    updateQuestionarioDto: UpdateQuestionarioDto,
  ): Promise<QuestionarioDto> {
    const questionario = await this.questionarioRepository.findOneByOrFail({
      id,
    });
    const questionarioUpdated = await this.questionarioRepository.save({
      ...questionario,
      ...updateQuestionarioDto,
    });
    return this.mapQuestionario(questionarioUpdated);
  }

  async remove(id: string): Promise<void> {
    const questionario = await this.questionarioRepository.findOneByOrFail({
      id,
    });
    await this.questionarioRepository.remove(questionario);
  }

  private mapQuestionario(questionario: Questionario): QuestionarioDto {
    return {
      id: questionario.id,
      data: questionario.data.toISOString(),
      nome: questionario.nome,
      descricao: questionario.descricao,
      perguntas: questionario.perguntas.map((perg) => ({
        id: perg.id,
        descricao: perg.descricao,
      })),
    };
  }
}
