import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Oficina } from './oficina.entity';
import { OficinaService } from './oficina.service';

@Controller('Oficina')
export class OficinaController {
  constructor(private readonly oficinaService: OficinaService) {}

  @Get()
  async findAll(): Promise<Oficina[]> {
    return this.oficinaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Oficina> {
    return this.oficinaService.findOne(id);
  }

  @Post()
  async create(@Body() oficinaData: Oficina): Promise<Oficina> {
    return this.oficinaService.create(oficinaData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() oficinaData: Oficina): Promise<Oficina> {
    return this.oficinaService.update(id, oficinaData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.oficinaService.remove(id);
  }
}
