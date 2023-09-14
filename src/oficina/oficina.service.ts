import { Injectable, NotFoundException } from '@nestjs/common';
import { Oficina } from './oficina.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VeiculosService } from '../veiculos/veiculos.service';

interface CreateOficinaInput {
  lavagem: boolean;
  manutencao: boolean;
  veiculo: { id: number };
}

@Injectable()
export class OficinaService {
  constructor(
    @InjectRepository(Oficina)
    private readonly oficinaRepository: Repository<Oficina>,
    private readonly veiculosService: VeiculosService
  ) {}

  async createOficina(input: CreateOficinaInput): Promise<Oficina> {
    const veiculo = await this.veiculosService.findById(input.veiculo.id);

    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }

    const oficina = new Oficina();
    oficina.lavagem = input.lavagem;
    oficina.manutencao = input.manutencao;
    oficina.veiculo = veiculo;

    await this.oficinaRepository.save(oficina);

    return oficina;
  }

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
