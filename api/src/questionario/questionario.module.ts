import { Module } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { QuestionarioController } from './questionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pergunta } from './entities/pergunta.entity';
import { Questionario } from './entities/questionario.entity';
import { Resposta } from './entities/resposta.entity';
import { RespostaPerg } from './entities/resposta-perg.entity';
import { RespostaController } from './resposta.controller';
import { RespostaService } from './resposta.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Questionario, Pergunta, Resposta, RespostaPerg]),
  ],
  controllers: [QuestionarioController, RespostaController],
  providers: [QuestionarioService, RespostaService],
})
export class QuestionarioModule {}
