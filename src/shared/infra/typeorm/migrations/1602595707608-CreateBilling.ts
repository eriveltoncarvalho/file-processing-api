import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBilling1602595707608 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'billing',
          columns:[
            {
              name: 'debtId',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'name',
              type: 'varchar'
            },
            {
              name: 'governmentId',
              type: 'int'
            },
            {
              name: 'email',
              type: 'varchar'
            },
            {
              name: 'debtAmount',
              type: 'float'
            },
            {
              name: 'debtDueDate',
              type: 'timestamp with time zone'
            },
            {
              name: 'sendEmail',
              type: 'bool',
              default: false
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('billing');
    }

}
