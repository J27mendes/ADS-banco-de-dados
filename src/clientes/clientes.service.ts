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

  async findOne(id: number): Promise<Cliente> {
    return this.clienteRepository.findOne({ where: { id } });
  }

  async create(clienteData: Cliente): Promise<Cliente> {
    const cliente = this.clienteRepository.create(clienteData);
    return this.clienteRepository.save(cliente);
  }

  async update(id: number, clienteData: Cliente): Promise<Cliente> {
    await this.clienteRepository.update(id, clienteData);
    return this.clienteRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
