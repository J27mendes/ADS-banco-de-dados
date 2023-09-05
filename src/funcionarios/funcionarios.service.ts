import { Injectable } from '@nestjs/common';
import { Funcionario } from './funcionarios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ) {}

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find();
  }

  async findOne(funcId: number): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { funcId } });
  }

  async create(funcionarioData: Funcionario): Promise<Funcionario> {
    const funcionario = this.funcionarioRepository.create(funcionarioData);
    return this.funcionarioRepository.save(funcionario);
  }

  async update(funcId: number, funcionarioData: Funcionario): Promise<Funcionario> {
    await this.funcionarioRepository.update(funcId, funcionarioData);
    return this.funcionarioRepository.findOne({ where: { funcId } });
  }

  async remove(id: number): Promise<void> {
    await this.funcionarioRepository.delete(id);
  }
}
