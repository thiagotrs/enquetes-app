import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pergunta } from './pergunta.entity';
import { Resposta } from './resposta.entity';

@Entity()
export class Questionario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  data: Date;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @OneToMany(() => Pergunta, (pergunta) => pergunta.questionario, {
    cascade: true,
    eager: true,
  })
  perguntas: Pergunta[];

  @OneToMany(() => Resposta, (resposta) => resposta.questionario, {
    cascade: true,
  })
  respostas: Resposta[];
}
