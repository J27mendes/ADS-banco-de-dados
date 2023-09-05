import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Cliente } from './clientes.entity';
import { ClienteService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Post()
  async create(@Body() clienteData: Cliente): Promise<Cliente> {
    return this.clienteService.create(clienteData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() clienteData: Cliente): Promise<Cliente> {
    return this.clienteService.update(id, clienteData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.clienteService.remove(id);
  }
}
