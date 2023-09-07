import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './clientes.controller';
import { Cliente } from './clientes.entity';
import { ClienteService } from './clientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClienteService],
  exports: [ClienteService, TypeOrmModule],
})
export class ClientesModule {}
