import { BadRequestException, Injectable } from '@nestjs/common';
import { Movimentar } from './movimento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from '../funcionarios/funcionarios.entity';
import { Cliente } from 'src/clientes/clientes.entity';

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
    const { funcionario } = movimentoData;

    if (!funcionario || typeof funcionario !== 'object' || !funcionario.funcId) {
      throw new BadRequestException('Funcionário não fornecido ou indefinido.');
    }

    const funcId = Number(funcionario.funcId); // Converter para número

    const loadedFuncionario = await this.funcionarioRepository.findOne({ where: { funcId } });

    if (!loadedFuncionario) {
      throw new BadRequestException('Funcionário não encontrado.');
    }

    movimentoData.funcionario = loadedFuncionario;

    const { cliente } = movimentoData;
    if (!cliente || typeof cliente !== 'object' || !cliente.cliId) {
      throw new BadRequestException('Funcionário não fornecido ou indefinido.');
    }

    const cliId = Number(cliente.cliId);

    const loadedCliente = await this.clienteRepository.findOne({ where: { cliId } });

    if (!loadedCliente) {
      throw new BadRequestException('Funcionário não encontrado.');
    }
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
    console.log(movimentoData.cliente);
    console.log(movimentoData.cliente.mensalidade);
    if (movimentoData.aluguelVeiculo && movimentoData.cliente && !movimentoData.cliente.mensalidade) {
      throw new BadRequestException('Cliente com mensalidade inativa não pode retirar um veículo.');
    }

    if (movimentoData.funcionario && movimentoData.funcionario.faltas) {
      throw new BadRequestException('Funcionário com faltas ativas não pode retirar veículo.');
    }

    const dataAtual = new Date();
    if (movimentoData.devolucaoVeiculo <= dataAtual) {
      movimentoData.multa = true;
    }

    if (movimentoData.multa && movimentoData.veiculo && movimentoData.veiculo.ano >= 2000) {
      throw new BadRequestException('Veículo com multa só pode ser retirado se for de ano igual ou inferior a 2000.');
    }

    return true;
  }
}
