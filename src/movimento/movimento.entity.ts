import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Veiculo } from '../veiculos/veiculos.entity';
import { Funcionario } from '../funcionarios/funcionarios.entity';
import { Cliente } from '../clientes/clientes.entity';

@Entity()
export class Movimentar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Chave estrangeira para Veiculo
  @ManyToOne(() => Veiculo, (veiculo) => veiculo.movimentacoes)
  @JoinColumn({ name: 'veiculoId', referencedColumnName: 'veiId' })
  veiculo: Veiculo;

  // Chave estrangeira para Funcionario
  @ManyToOne(() => Funcionario, (funcionario) => funcionario.movimentacoes)
  @JoinColumn({ name: 'funcionarioId', referencedColumnName: 'id' })
  funcionario: Funcionario;

  // Chave estrangeira para Cliente
  @ManyToOne(() => Cliente, (cliente) => cliente.movimentacoes)
  @JoinColumn({ name: 'clienteId', referencedColumnName: 'id' })
  cliente: Cliente;

  @Column({ type: 'boolean', default: false })
  aluguelVeiculo: boolean;

  @Column({ name: 'retiradaVeiculo', type: 'timestamp', nullable: false })
  retiradaVeiculo: Date;

  @Column({ name: 'devolucaoVeiculo', type: 'timestamp', nullable: false })
  devolucaoVeiculo: Date;

  @Column({ name: 'multa', nullable: false })
  multa: boolean;

  @Column({ name: 'credito', nullable: false })
  credito: boolean;
  obterFaltasDoFuncionario: any;
}
