import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('users', (table) => {
      table.string('registrationDate');
      table.string('profileImage');
      table.string('phone');
      table.string('profession');
    })
    .createTable('fitnessGoal', (table) => {
      table.increments('id');
      table.integer('userId').unsigned();
      table.foreign('userId').references('users.id').onDelete('CASCADE');
      table.string('name', 255);
      table.string('targetDate', 255);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('users', (table) => {
      table.dropColumn('registrationDate');
      table.dropColumn('profileImage');
      table.dropColumn('phone');
      table.dropColumn('profession');
    })
    .dropTable('fitnessGoal');
}
