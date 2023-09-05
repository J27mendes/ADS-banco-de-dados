import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OficinaController } from './oficina.controller';
import { OficinaService } from './oficina.service';
//import { CreateMovimento } from 'src/migration/createMovimento';
import { Oficina } from './oficina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oficina])], //TypeOrmModule.forFeature([CreateMovimento])],
  controllers: [OficinaController],
  providers: [OficinaService],
})
export class OficinaModule {}
