import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Veiculo } from '../veiculos/veiculos.entity';

@Entity({ name: 'Oficina' })
export class Oficina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.oficinas)
  @JoinColumn({ name: 'veiculoId', referencedColumnName: 'veiId' })
  veiculo: Veiculo;

  @Column({ name: 'lavagem', nullable: false })
  lavagem: boolean;

  @Column({ name: 'manutencao', nullable: false })
  manutencao: boolean;
}
