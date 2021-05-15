import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRestaurants1621082575055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'restaurants',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'owner_id',
                    type: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'cnpj',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar'
                },
                {
                    name: 'street',
                    type: 'varchar'
                },
                {
                    name: 'uf',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'banner_url',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'type_food',
                    type: 'varchar'
                },
                {
                    name: 'open_hours',
                    type: 'varchar'
                },
                {
                    name: 'close_hours',
                    type: 'varchar'
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['owner_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    name: 'Restaurant_User',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('restaurants', 'Restaurant_User')
        await queryRunner.dropTable('restaurants')
    }

}
