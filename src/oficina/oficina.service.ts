import { Injectable } from '@nestjs/common';
import { Oficina } from './oficina.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OficinaService {
  constructor(
    @InjectRepository(Oficina)
    private readonly oficinaRepository: Repository<Oficina>
  ) {}

  async findAll(): Promise<Oficina[]> {
    return this.oficinaRepository.find();
  }

  async findOne(id: string): Promise<Oficina> {
    return this.oficinaRepository.findOne({ where: { id } });
  }

  async create(oficinaData: Oficina): Promise<Oficina> {
    const oficina = this.oficinaRepository.create(oficinaData);
    return this.oficinaRepository.save(oficina);
  }

  async update(id: string, oficinaData: Oficina): Promise<Oficina> {
    await this.oficinaRepository.update(id, oficinaData);
    return this.oficinaRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.oficinaRepository.delete(id);
  }
}
