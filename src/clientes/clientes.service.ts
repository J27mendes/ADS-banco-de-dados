import { Injectable } from '@nestjs/common';
import { Cliente } from './clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(cliId: number): Promise<Cliente> {
    return this.clienteRepository.findOne({ where: { cliId } });
  }

  async create(clienteData: Cliente): Promise<Cliente> {
    const cliente = this.clienteRepository.create(clienteData);
    return this.clienteRepository.save(cliente);
  }

  async update(cliId: number, clienteData: Cliente): Promise<Cliente> {
    await this.clienteRepository.update(cliId, clienteData);
    return this.clienteRepository.findOne({ where: { cliId } });
  }

  async remove(cliId: number): Promise<void> {
    await this.clienteRepository.delete(cliId);
  }
}
