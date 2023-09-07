import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Veiculo } from './veiculos.entity';
import { VeiculosService } from './veiculos.service';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Get()
  async findAll(): Promise<Veiculo[]> {
    return this.veiculosService.findAll();
  }

  @Get(':veiId')
  async findOne(@Param('veiId') veiId: number): Promise<Veiculo> {
    return this.veiculosService.findOne(veiId);
  }

  @Post()
  async create(@Body() veiculosData: Veiculo): Promise<Veiculo> {
    return this.veiculosService.create(veiculosData);
  }

  @Put(':veiId')
  async update(@Param('veiId') veiId: number, @Body() veiculosData: Veiculo): Promise<Veiculo> {
    return this.veiculosService.update(veiId, veiculosData);
  }

  @Delete(':veiId')
  async remove(@Param('veiId') veiId: number): Promise<void> {
    return this.veiculosService.remove(veiId);
  }
}
