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

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Veiculo> {
    return this.veiculosService.findOne(id);
  }

  @Post()
  async create(@Body() veiculosData: Veiculo): Promise<Veiculo> {
    return this.veiculosService.create(veiculosData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() veiculosData: Veiculo): Promise<Veiculo> {
    return this.veiculosService.update(id, veiculosData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.veiculosService.remove(id);
  }
}
