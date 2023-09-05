import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMovimento implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movimento',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'veiculosId',
            type: 'int32',
          },
          {
            name: 'funcionariosId',
            type: 'int32',
          },
          {
            name: 'clienteId',
            type: 'int32',
          },
          {
            name: 'aluguelVeiculo',
            type: 'boolean',
            default: false,
          },
          {
            name: 'retiradaVeiculo',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'devolucaoVeiculo',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'devolucaoPostergada',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'retiradaBloqueada',
            type: 'boolean',
            default: false,
          },
          {
            name: '48Horas',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: '24Horas',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      })
    );

    // Adicione chaves estrangeiras
    await queryRunner.createForeignKey(
      'movimento',
      new TableForeignKey({
        columnNames: ['veiculosId'],
        referencedColumnNames: ['veiculos_id'],
        referencedTableName: 'veiculos',
      })
    );

    await queryRunner.createForeignKey(
      'movimento',
      new TableForeignKey({
        columnNames: ['funcionariosId'],
        referencedColumnNames: ['funcionarios_id'],
        referencedTableName: 'funcionarios',
      })
    );

    await queryRunner.createForeignKey(
      'movimento',
      new TableForeignKey({
        columnNames: ['clienteId'],
        referencedColumnNames: ['cliente_id'],
        referencedTableName: 'clientes',
      })
    );
    await queryRunner.createForeignKey(
      'oficina',
      new TableForeignKey({
        columnNames: ['veiculosId'],
        referencedColumnNames: ['veiculos_id'],
        referencedTableName: 'veiculo',
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter as operações da migração, se necessário
  }
}
