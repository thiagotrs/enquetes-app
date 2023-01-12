import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { PagedRespostaDto, RespostaDto } from './dto/resposta.dto';
import { UpdateFullRespostaDto } from './dto/update-full-resposta.dto';
import { Questionario } from './entities/questionario.entity';
import { RespostaPerg } from './entities/resposta-perg.entity';
import { Resposta } from './entities/resposta.entity';

@Injectable()
export class RespostaService {
  constructor(
    @InjectRepository(Resposta)
    private respostaRepository: Repository<Resposta>,
    @InjectRepository(RespostaPerg)
    private respostaPergRepository: Repository<RespostaPerg>,
    @InjectRepository(Questionario)
    private questionarioRepository: Repository<Questionario>,
  ) {}

  async create(
    questionarioId: string,
    createRespostaDto: CreateRespostaDto,
  ): Promise<RespostaDto> {
    const questionario = await this.questionarioRepository.findOneByOrFail({
      id: questionarioId,
    });
    const resposta = await this.respostaRepository.save({
      questionario,
    });
    const respostaPerguntas = createRespostaDto.respostaPerguntas.map((p) =>
      this.respostaPergRepository.create({
        descricao: p.descricao,
        pergunta: {
          id: p.perguntaId,
        },
        resposta,
      }),
    );
    resposta.respostaPerguntas = respostaPerguntas;
    const respostaNew = await this.respostaRepository.save(resposta);
    return this.mapResposta(respostaNew);
  }

  async findAll(
    questionarioId: string,
    limit: number,
    page: number,
  ): Promise<PagedRespostaDto> {
    const [respostas, total] = await this.respostaRepository.findAndCount({
      where: {
        questionario: {
          id: questionarioId,
        },
      },
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
      respostas: respostas.map(this.mapResposta),
    };
  }

  async updateFull(
    questionarioId: string,
    id: string,
    updateFullRespostaDto: UpdateFullRespostaDto,
  ): Promise<RespostaDto> {
    const resposta = await this.respostaRepository.findOneByOrFail({
      id,
      questionario: {
        id: questionarioId,
      },
    });
    const respostaPerguntas = updateFullRespostaDto.respostaPerguntas.map((p) =>
      this.respostaPergRepository.create({
        descricao: p.descricao,
        pergunta: {
          id: p.perguntaId,
        },
        resposta,
      }),
    );
    resposta.respostaPerguntas = respostaPerguntas;
    const respostaUpdated = await this.respostaRepository.save(resposta);
    return this.mapResposta(respostaUpdated);
  }

  async remove(questionarioId: string, id: string): Promise<void> {
    const resposta = await this.respostaRepository.findOneByOrFail({
      id,
      questionario: {
        id: questionarioId,
      },
    });
    await this.respostaRepository.remove(resposta);
  }

  private mapResposta(resposta: Resposta): RespostaDto {
    return {
      id: resposta.id,
      data: resposta.data.toISOString(),
      respostaPerguntas: resposta.respostaPerguntas.map((resp) => ({
        id: resp.id,
        descricao: resp.descricao,
      })),
    };
  }
}
