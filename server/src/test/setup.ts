import { Model } from 'objection'

import { migrateAndSeed } from '../lib/migrateAndSeed'

beforeAll(async () => {
  await migrateAndSeed()
})

beforeEach(() => {
  Model.knex(global.knex)
})

afterEach(async () => {
  const knex = global.knex
  const tables = await knex.select('tablename').from('pg_tables').where('schemaname', 'public')
  const toTruncate = tables.filter(table => !table.tablename.includes('migrations'))
  await knex.transaction(async tx => {
    return Promise.all(
      toTruncate.map(async item => {
        await tx.raw(`
          ALTER TABLE "${item.tablename}" DISABLE TRIGGER ALL;
          DELETE FROM "${item.tablename}";
          ALTER TABLE "${item.tablename}" ENABLE TRIGGER ALL;
        `)
      }),
    )
  })
})
