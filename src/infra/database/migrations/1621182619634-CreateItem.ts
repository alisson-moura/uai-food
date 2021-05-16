import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateItem1621182619634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'items',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'restaurant_id',
                    type: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'int'
                },
                {
                    name: 'weight',
                    type: 'int'
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'ingredients',
                    type: 'varchar[]',
                    isNullable: true
                },

            ],
            foreignKeys: [
                {
                    columnNames: ['restaurant_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'restaurants',
                    name: 'Restaurant_Item',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('restaurants', 'Restaurant_Item')
        await queryRunner.dropTable('items')
    }

}
