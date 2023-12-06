import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('name', 255).notNullable();
    table.integer('role').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
