import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('nutritionLogger', (table) => {
    table.increments('id');
    table.integer('userId').unsigned();
    table.foreign('userId').references('users.id').onDelete('CASCADE');
    table.string('name', 255);
    table.string('date', 255);
    table.integer('calories').unsigned();
    table.integer('proteins').unsigned();
    table.integer('carbohydrates').unsigned();
    table.integer('fats').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('nutritionLogger');
}
