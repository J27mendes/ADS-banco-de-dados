import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentoController } from './movimento.controller';
import { MovimentoService } from './movimento.service';
import { Movimentar } from './movimento.entity';
import { FuncionariosModule } from '../funcionarios/funcionarios.module';
import { ClientesModule } from '../clientes/clientes.module';
import { VeiculosModule } from 'src/veiculos/veiculos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentar]), FuncionariosModule, ClientesModule, VeiculosModule],
  controllers: [MovimentoController],
  providers: [MovimentoService],
})
export class MovimentoModule {}
