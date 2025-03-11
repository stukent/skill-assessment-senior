import { toGlobalId } from 'graphql-relay'

import { sign } from '../lib/jwt.ts'
import { User } from '../models/User.ts'
import { Resolvers } from '../schema.ts'
import { Context, TokenPayload, isUser } from '../types.ts'

export default {
  User: {
    id: parent => toGlobalId('User', parent.id),
  },
  Query: {
    viewer: async (_, args, context) => {
      if (isUser(context.user)) {
        return User.query().findById(context.user.id).throwIfNotFound()
      } else return null
    },
  },
  Mutation: {
    login: async (parent, { input }) => {
      const { username, password } = input
      const matchingUser = await User.query().where('username', 'ilike', username).first()
      if (!matchingUser) throw new Error('Invalid username or password.')
      const isValidPassword = await matchingUser.verifyPassword(password)
      if (!isValidPassword) throw new Error('Invalid username or password.')
      return {
        user: matchingUser,
        jwt: sign<TokenPayload>({ id: matchingUser.id }),
      }
    },
  },
} satisfies Resolvers<Context>
