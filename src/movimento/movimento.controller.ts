import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Movimentar } from './movimento.entity';
import { MovimentoService } from './movimento.service';

@Controller('movimento')
export class MovimentoController {
  constructor(private readonly movimentoService: MovimentoService) {}

  @Get()
  async findAll(): Promise<Movimentar[]> {
    return this.movimentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movimentar> {
    return this.movimentoService.findOne(id);
  }

  @Post()
  async create(@Body() movimentoData: Movimentar): Promise<Movimentar> {
    try {
      const validationResult = this.movimentoService.validateMovimentar(movimentoData);
      if ((await validationResult) === true) {
        // Todas as validações passaram, então podemos criar e salvar a movimentação.
        const movimento = await this.movimentoService.create(movimentoData);
        return movimento;
      } else {
        // Alguma validação falhou, lançar uma exceção BadRequestException com a mensagem de erro.
        throw new BadRequestException(validationResult);
      }
    } catch (error) {
      // Lide com o erro aqui, por exemplo, retorne uma resposta HTTP com o erro.
      throw new BadRequestException(`Erro ao criar movimentação: ${error.message}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() movimentoData: Movimentar): Promise<Movimentar> {
    return this.movimentoService.update(id, movimentoData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.movimentoService.remove(id);
  }
}
