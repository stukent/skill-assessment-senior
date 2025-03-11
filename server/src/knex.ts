import knex from 'knex'
import * as path from 'path'
import * as url from 'url'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default global.knex ??
  knex({
    client: 'pg',
    connection: {
      host: 'db',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'quiz_manager',
    },
    migrations: {
      extension: 'ts',
      directory: path.join(dirname, 'migrations'),
    },
    seeds: {
      extension: 'ts',
      directory: path.join(dirname, 'seed'),
    },
  })
