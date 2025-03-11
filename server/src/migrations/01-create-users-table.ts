import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('username').notNullable().unique()
    table.string('password')
    table.string('group')
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('users')
}
