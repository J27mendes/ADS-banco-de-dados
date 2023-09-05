import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Funcionario } from './funcionarios.entity';
import { FuncionariosService } from './funcionarios.service';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Get()
  async findAll(): Promise<Funcionario[]> {
    return this.funcionariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Funcionario> {
    return this.funcionariosService.findOne(id);
  }

  @Post()
  async create(@Body() funcionariosData: Funcionario): Promise<Funcionario> {
    return this.funcionariosService.create(funcionariosData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() funcionariosData: Funcionario): Promise<Funcionario> {
    return this.funcionariosService.update(id, funcionariosData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.funcionariosService.remove(id);
  }
}
