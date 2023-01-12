import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pergunta } from './pergunta.entity';
import { Resposta } from './resposta.entity';

@Entity()
export class RespostaPerg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Pergunta, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  pergunta: Pergunta;

  @ManyToOne(() => Resposta, (resposta) => resposta.respostaPerguntas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  resposta: Resposta;
}
