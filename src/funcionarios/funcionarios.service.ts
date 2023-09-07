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

  async findOne(id: number): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { id } });
  }

  async create(funcionarioData: Funcionario): Promise<Funcionario> {
    const funcionario = this.funcionarioRepository.create(funcionarioData);
    return this.funcionarioRepository.save(funcionario);
  }

  async update(id: number, funcionarioData: Funcionario): Promise<Funcionario> {
    await this.funcionarioRepository.update(id, funcionarioData);
    return this.funcionarioRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.funcionarioRepository.delete(id);
  }
}
