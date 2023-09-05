import { Movimentar } from 'src/movimento/movimento.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity({ name: 'Funcionarios' })
export class Funcionario {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'setor', nullable: false })
  setor: string;

  @Column({ name: 'faltas', nullable: false })
  faltas: boolean;

  @OneToMany(() => Movimentar, (movimentar) => movimentar.funcionario)
  movimentacoes: Movimentar[];
  funcionario: any;
}
