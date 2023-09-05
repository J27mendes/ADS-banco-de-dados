import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionariosController } from './funcionarios.controller';
import { FuncionariosService } from './funcionarios.service';
import { Funcionario } from './funcionarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
  exports: [FuncionariosService, TypeOrmModule],
})
export class FuncionariosModule {}
