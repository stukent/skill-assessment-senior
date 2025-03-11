import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { makeExecutableSchema } from '@graphql-tools/schema'
import * as fs from 'fs'
import { Model } from 'objection'
import * as path from 'path'
import { fileURLToPath } from 'url'

import { authDirectiveTransformer } from './directives/auth.ts'
import { grantDirectiveTransformer } from './directives/grant.ts'
import knex from './knex.ts'
import { getApolloContext } from './lib/getApolloContext.ts'
import { migrateAndSeed } from './lib/migrateAndSeed.ts'
import resolvers from './resolvers/index.ts'

const dirname = fileURLToPath(new URL('.', import.meta.url))
const typeDefs = fs.readFileSync(path.join(dirname, '../schema.graphql'), 'utf8')

Model.knex(knex)

let schema = makeExecutableSchema({ typeDefs, resolvers })
schema = authDirectiveTransformer(schema)
schema = grantDirectiveTransformer(schema)

const server = new ApolloServer({ schema })

await migrateAndSeed()

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async ({ req }) => {
    return getApolloContext(req)
  },
})
console.log(`🚀 Server ready at ${url}`)
