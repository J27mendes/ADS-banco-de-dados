import { Movimentar } from 'src/movimento/movimento.entity';
import { Oficina } from 'src/oficina/oficina.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity({ name: 'Veiculos' })
export class Veiculo {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'placa', nullable: false })
  placa: string;

  @Column({ name: 'modelo', nullable: false })
  modelo: string;

  @Column({ name: 'ano', nullable: false })
  ano: number;

  @Column({ name: 'cor', nullable: false })
  cor: string;

  @Column({ name: 'status', default: false })
  status: boolean;

  @OneToMany(() => Movimentar, (movimentar) => movimentar.veiculo)
  movimentacoes: Movimentar[];

  @OneToMany(() => Oficina, (oficina) => oficina.veiculo)
  oficinas: Oficina[];
}
