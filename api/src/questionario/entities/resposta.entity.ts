import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questionario } from './questionario.entity';
import { RespostaPerg } from './resposta-perg.entity';

@Entity()
export class Resposta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  data: Date;

  @ManyToOne(() => Questionario, (questionario) => questionario.respostas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  questionario: Questionario;

  @OneToMany(() => RespostaPerg, (respPerg) => respPerg.resposta, {
    cascade: true,
    eager: true,
  })
  respostaPerguntas: RespostaPerg[];
}
