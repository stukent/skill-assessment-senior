import knex from '../knex.ts'
import { log } from '../log.ts'
import { User } from '../models/User.ts'

export async function migrateAndSeed() {
  log('migrating database')
  await knex.migrate.latest()

  log('checking for users before seeding')
  const hasUsers = !!parseFloat(
    (await User.query(knex).count().first().castTo<{ count: number | string }>()).count.toString(),
  )
  if (!hasUsers) {
    log('no users found; seeding database')
    await knex.seed.run()
  }
}
