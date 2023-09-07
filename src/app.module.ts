import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { MovimentoModule } from './movimento/movimento.module';
import { OficinaModule } from './oficina/oficina.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    ClientesModule,
    VeiculosModule,
    FuncionariosModule,
    MovimentoModule,
    OficinaModule,
  ],
})
export class AppModule {}
