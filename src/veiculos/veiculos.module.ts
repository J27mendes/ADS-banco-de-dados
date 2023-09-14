import { Module } from '@nestjs/common';
import { VeiculosController } from './veiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './veiculos.entity';
import { VeiculosService } from './veiculos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])],
  controllers: [VeiculosController],
  providers: [VeiculosService],
  exports: [VeiculosService, TypeOrmModule],
})
export class VeiculosModule {}
