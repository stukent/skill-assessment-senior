import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('quiz_submissions', table => {
    table.increments('id')
    table.integer('quiz_id').notNullable().unsigned().index()
    table.foreign('quiz_id').references('quizzes.id')
    table.integer('user_id').notNullable().unsigned().index()
    table.foreign('user_id').references('users.id')
    table.jsonb('submission_data').notNullable()
    table.float('grade').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('quiz_submissions')
}
