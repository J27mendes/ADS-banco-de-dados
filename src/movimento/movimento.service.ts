import { BadRequestException, Injectable } from '@nestjs/common';
import { Movimentar } from './movimento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from '../funcionarios/funcionarios.entity';
import { Cliente } from '../clientes/clientes.entity';

@Injectable()
export class MovimentoService {
  constructor(
    @InjectRepository(Movimentar)
    private readonly movimentoRepository: Repository<Movimentar>,
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) {}

  async findAll(): Promise<Movimentar[]> {
    return this.movimentoRepository.find();
  }

  async findOne(id: string): Promise<Movimentar> {
    return this.movimentoRepository.findOne({ where: { id } });
  }

  async create(movimentoData: Movimentar): Promise<Movimentar> {
    const funcionarioData = { ...movimentoData };
    const clienteData = { ...movimentoData };
    async function processFuncionarioData(
      movimentoData: any,
      funcionarioRepository: Repository<Funcionario>
    ): Promise<void> {
      const { funcionario } = movimentoData;
      if (!funcionario || typeof funcionario !== 'object' || !funcionario.id) {
        return;
      }

      const id = Number(funcionario.id);
      const loadedFuncionario = await funcionarioRepository.findOne({ where: { id } });

      if (!loadedFuncionario) {
        return;
      }

      movimentoData.funcionario = loadedFuncionario;
    }

    async function processClienteData(movimentoData: any, clienteRepository: Repository<Cliente>): Promise<void> {
      const { cliente } = movimentoData;

      if (!cliente || typeof cliente !== 'object' || !cliente.id) {
        return;
      }

      const clienteId = Number(cliente.id);

      const loadedCliente = await clienteRepository
        .createQueryBuilder('cliente')
        .where('cliente.id = :id', { id: clienteId })
        .getOne();
      if (!loadedCliente) {
        return;
      }
      if (typeof loadedCliente.mensalidade !== 'undefined') {
        movimentoData.cliente = loadedCliente;
      } else {
        console.log('esta faltando a mensalidade do cliente');
        return;
      }
    }

    await processFuncionarioData(funcionarioData, this.funcionarioRepository);
    await processClienteData(clienteData, this.clienteRepository);

    const validationResult = await this.validateMovimentar(movimentoData);
    if (validationResult === true) {
      const movimento = this.movimentoRepository.create(movimentoData);
      return this.movimentoRepository.save(movimento);
    } else {
      throw new BadRequestException(validationResult);
    }
  }

  async update(id: string, movimentoData: Movimentar): Promise<Movimentar> {
    await this.movimentoRepository.update(id, movimentoData);
    return this.movimentoRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.movimentoRepository.delete(id);
  }

  async validateMovimentar(movimentoData: Movimentar): Promise<boolean> {
    if (movimentoData.cliente && !movimentoData.cliente.mensalidade) {
      throw new BadRequestException('Cliente com mensalidade inativa não pode retirar um veículo.');
    }
    if (movimentoData.funcionario && movimentoData.funcionario.faltas) {
      throw new BadRequestException('Funcionário com faltas ativas não pode retirar veículo.');
    }

    const dataAtual = new Date();
    if (movimentoData.devolucaoVeiculo <= dataAtual) {
      movimentoData.multa = true;
    }
    if (movimentoData.multa && !movimentoData.veiculo && movimentoData.veiculo.ano >= 2000) {
      throw new BadRequestException('Veículo com multa só pode ser retirado se for de ano igual ou inferior a 2000.');
    }

    return true;
  }
}
