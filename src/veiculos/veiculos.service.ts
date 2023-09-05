import { Injectable } from '@nestjs/common';
import { Veiculo } from './veiculos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>
  ) {}

  async findAll(): Promise<Veiculo[]> {
    return this.veiculoRepository.find();
  }

  async findOne(veiId: number): Promise<Veiculo> {
    return this.veiculoRepository.findOne({ where: { veiId } });
  }

  async create(veiculoData: Veiculo): Promise<Veiculo> {
    const veiculo = this.veiculoRepository.create(veiculoData);
    return this.veiculoRepository.save(veiculo);
  }

  async update(veiId: number, veiculoData: Veiculo): Promise<Veiculo> {
    await this.veiculoRepository.update(veiId, veiculoData);
    return this.veiculoRepository.findOne({ where: { veiId } });
  }

  async remove(veiId: number): Promise<void> {
    await this.veiculoRepository.delete(veiId);
  }
}
