import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('quizzes', table => {
    table.increments('id')
    table.integer('user_id').notNullable().unsigned().index()
    table.foreign('user_id').references('users.id')
    table.string('name').notNullable()
    table.jsonb('configuration').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('quizzes')
}
