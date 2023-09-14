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

  async updateVeiculoStatus(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository
      .createQueryBuilder('veiculo')
      .leftJoinAndSelect('veiculo.oficinas', 'oficinas')
      .where('veiculo.id = :veiculoId', { veiculoId: id })
      .getOne();

    if (!veiculo) {
      return undefined;
    }

    if (veiculo.oficinas && veiculo.oficinas.length > 0) {
      const LavagemOuManutencao = veiculo.oficinas.some((oficina) => oficina.lavagem || oficina.manutencao);
      veiculo.status = LavagemOuManutencao;
    } else {
      veiculo.status = false;
    }

    await this.veiculoRepository.save(veiculo);

    return veiculo;
  }

  async findById(id: number): Promise<Veiculo> {
    return this.veiculoRepository
      .createQueryBuilder('veiculo')
      .leftJoinAndSelect('veiculo.oficinas', 'oficinas')
      .where('veiculo.id = :veiculoId', { veiculoId: id })
      .getOne();
  }

  async findAll(): Promise<Veiculo[]> {
    return this.veiculoRepository.find();
  }

  async findOne(id: number): Promise<Veiculo> {
    return this.veiculoRepository.findOne({ where: { id } });
  }

  async create(veiculoData: Veiculo): Promise<Veiculo> {
    const veiculo = this.veiculoRepository.create(veiculoData);
    return this.veiculoRepository.save(veiculo);
  }

  async update(id: number, veiculoData: Veiculo): Promise<Veiculo> {
    await this.veiculoRepository.update(id, veiculoData);
    return this.veiculoRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.veiculoRepository.delete(id);
  }
}
