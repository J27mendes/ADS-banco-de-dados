import { Movimentar } from 'src/movimento/movimento.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity({ name: 'Clientes' })
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id' })
  cliId: number;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'telefone', nullable: false })
  telefone: string;

  @Column({ name: 'mensalidade', nullable: false })
  mensalidade: boolean;

  @OneToMany(() => Movimentar, (movimentar) => movimentar.cliente)
  movimentacoes: Movimentar[];
  multa: Cliente;
}
