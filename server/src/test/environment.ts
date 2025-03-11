// @ts-ignore not picking up on embedded-postgres types for some reason.
import EmbeddedPostgres from 'embedded-postgres'
import fs from 'fs'
import Knex from 'knex'
import path from 'path'
import * as url from 'url'
import type { Environment } from 'vitest/environments'
import '../../import'

const root = path.join(__dirname, '../..')
const DATABASE_DIR = path.join(root, 'test-databases')
const DATABASE_LOCK = path.join(root, 'test-databases-lock')
const TEST_DATABASE = 'test'
const MAX_PG_START_ATTEMPTS = 5

async function findWorker() {
  while (true) {
    try {
      fs.writeFileSync(DATABASE_LOCK, '', { flag: 'wx' })
      const result = _findWorker()
      fs.unlinkSync(DATABASE_LOCK)
      return result
    } catch (err) {
      if (err.code === 'EEXIST') {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100))
        continue
      } else {
        throw err
      }
    }
  }
}
function _findWorker() {
  let maxDir = 0
  if (fs.existsSync(DATABASE_DIR)) {
    const directories = fs.readdirSync(DATABASE_DIR)
    for (const dir of directories) {
      const workerIndex = parseFloat(path.basename(dir).replace('worker-', '').replace('-lock', ''))
      if (isNaN(workerIndex)) continue
      if (workerIndex > maxDir) maxDir = workerIndex
      const lockFile = path.join(DATABASE_DIR, dir.endsWith('-lock') ? dir : `${dir}-lock`)
      if (!fs.existsSync(lockFile)) {
        fs.writeFileSync(lockFile, '')
        return {
          dir: path.join(DATABASE_DIR, dir.replace('-lock', '')),
          index: workerIndex,
          didExist: true,
        }
      }
    }
  } else {
    fs.mkdirSync(DATABASE_DIR)
  }

  maxDir++
  const padded = maxDir.toString().padStart(3, '0')
  fs.writeFileSync(path.join(DATABASE_DIR, `worker-${padded}-lock`), '')
  return { dir: path.join(DATABASE_DIR, `worker-${padded}`), index: maxDir, didExist: false }
}

function releaseWorker(dir) {
  if (fs.existsSync(dir + '-lock')) {
    fs.unlinkSync(dir + '-lock')
  }
}

let worker
function onExit() {
  if (worker) {
    releaseWorker(worker.dir)
  }
}
;['SIGINT', 'SIGTERM', 'SIGHUP', 'exit', 'unhandledRejection', 'uncaughtException'].forEach(
  event => {
    process.on(event, onExit)
  },
)

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  async setup() {
    const pgWorker = await findWorker()
    const pgPort = 54320 + pgWorker.index
    const pglog: string[] = []
    const pg = new EmbeddedPostgres({
      databaseDir: pgWorker.dir,
      user: 'postgres',
      password: 'postgres',
      port: pgPort,
      persistent: true,
      onLog: message => {
        pglog.push(message)
      },
      onError: err => {
        console.error(err)
      },
    })

    if (!pgWorker.didExist) {
      await pg.initialise()
    }

    let attempt = 0
    while (attempt < MAX_PG_START_ATTEMPTS) {
      try {
        await pg.start()
        break
      } catch (err) {
        attempt++
        if (attempt >= MAX_PG_START_ATTEMPTS) {
          console.error('failed to start postgres: %O', err)
          if (!err) {
            throw new Error(
              'postgres failed to start with an undefined error, which means the process crashed',
            )
          }
          throw err
        }

        // Wait a bit for things to cool off...
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    if (pgWorker.didExist) {
      await pg.dropDatabase(TEST_DATABASE)
    }
    await pg.createDatabase(TEST_DATABASE)

    const dirname = url.fileURLToPath(new URL('.', import.meta.url))
    const knexConfig = {
      client: 'pg',
      useNullAsDefault: true,
      migrations: {
        directory: path.join(dirname, '../migrations'),
      },
      seeds: {
        directory: path.join(dirname, '../seed'),
      },
      connection: {
        host: '127.0.0.1',
        port: pgPort,
        database: TEST_DATABASE,
        user: 'postgres',
        password: 'postgres',
      },
    }
    global.knex = Knex(knexConfig)

    return {
      async teardown() {
        releaseWorker(pgWorker.dir)
        await global.knex.destroy()
        await pg.stop()
      },
    }
  },
}
