import { Knex } from 'knex'

import { User } from '../models/User.ts'

export async function seed(knex: Knex) {
  await User.query(knex).insert([
    { group: 'TEACHER', username: 'teacher', password: 'testing-teacher' },
    { group: 'STUDENT', username: 'student', password: 'testing-student' },
  ])
}
