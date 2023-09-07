import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OficinaController } from './oficina.controller';
import { OficinaService } from './oficina.service';
import { Oficina } from './oficina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oficina])],
  controllers: [OficinaController],
  providers: [OficinaService],
})
export class OficinaModule {}
