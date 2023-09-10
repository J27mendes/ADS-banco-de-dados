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
    const loadedCliente = await this.processClienteData(movimentoData);
    const loadedFuncionario = await this.processFuncionarioData(movimentoData);

    movimentoData.funcionario = loadedFuncionario;
    movimentoData.cliente = loadedCliente;

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
    if (movimentoData.cliente === undefined && movimentoData.funcionario === undefined) {
      throw new BadRequestException('Cliente ou Funcionario não informados');
    }

    if (movimentoData.cliente && movimentoData.cliente.mensalidade === false) {
      throw new BadRequestException('Cliente com mensalidade inativa não pode retirar um veículo.');
    } else if (movimentoData.cliente === null) {
      return;
    }

    if (movimentoData.funcionario && movimentoData.funcionario.faltas === true) {
      throw new BadRequestException('Funcionário com faltas ativas não pode retirar veículo.');
    }

    const dataAtual = new Date();
    if (movimentoData.devolucaoVeiculo <= dataAtual) {
      movimentoData.multa = true;
    }
    if (movimentoData.multa && !movimentoData.veiculo && movimentoData.veiculo.ano >= 2000) {
      throw new BadRequestException('Veículo com multa só pode ser retirado se for de ano igual ou inferior a 2000.');
    }

    return true; // Validação movimentarData
  }

  async processFuncionarioData(movimentoData: any): Promise<Funcionario> {
    if (!movimentoData || typeof movimentoData.funcionario !== 'object' || !movimentoData.funcionario.id) {
      return;
    }

    const id = Number(movimentoData.funcionario.id);
    const loadedFuncionario = await this.funcionarioRepository.findOne({ where: { id } });

    if (!loadedFuncionario) {
      return;
    }
    return loadedFuncionario;
  } //processamento do funcionario

  async processClienteData(movimentoData: any): Promise<Cliente> {
    if (!movimentoData.cliente || typeof movimentoData.cliente !== 'object' || !movimentoData.cliente.id) {
      return;
    }

    const clienteId = Number(movimentoData.cliente.id);

    const loadedCliente = await this.clienteRepository
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
    return loadedCliente;
  } // Processamento de cliente
}
