import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('progressLogger', (table) => {
    table.increments('id');
    table.integer('userId').unsigned();
    table.foreign('userId').references('users.id').onDelete('CASCADE');
    table.string('date', 255);
    table.integer('weight').unsigned();
    table.integer('chestMeasurement').unsigned();
    table.integer('bicepsMeasurement').unsigned();
    table.integer('waistMeasurement').unsigned();
    table.integer('hipsMeasurement').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('progressLogger');
}
