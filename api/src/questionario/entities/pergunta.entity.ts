import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Questionario } from './questionario.entity';

@Entity()
export class Pergunta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Questionario, (questionario) => questionario.perguntas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  questionario: Questionario;
}
