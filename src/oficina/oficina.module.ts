import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OficinaController } from './oficina.controller';
import { OficinaService } from './oficina.service';
import { Oficina } from './oficina.entity';
import { VeiculosModule } from 'src/veiculos/veiculos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Oficina]), VeiculosModule],
  controllers: [OficinaController],
  providers: [OficinaService],
})
export class OficinaModule {}
