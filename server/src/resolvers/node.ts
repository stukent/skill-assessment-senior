import { fromGlobalId } from 'graphql-relay'
import { Model } from 'objection'

import { isOwn } from '../lib/ownership/index.ts'
import { Models } from '../models/index.ts'
import { Resolvers } from '../schema.ts'
import { Context, isUser } from '../types.ts'

export default {
  Node: {
    __resolveType: (parent: Model) => {
      return parent.constructor.name as any
    },
  },
  Query: {
    node: async (parent, { id: globalId }, context) => {
      const { type, id } = fromGlobalId(globalId)
      const model = Models[type]
      if (!model) throw new Error('Model type not found.')

      // TODO: In a production environment, you would implement permissions here
      // to make sure the user has access to the node they're trying to query.

      // We have an any cast here because there's not a super great way to cast
      // to the right type here without creating some sort of switch statement with
      // all of the model types in it, which isn't really scalable.
      return model.query().findById(id).castTo<any>().throwIfNotFound()
    },
  },
  Mutation: {
    deleteNode: async (parent, { id: globalId }, context) => {
      const { type, id } = fromGlobalId(globalId)
      const model = Models[type]
      if (!model) throw new Error('Model type not found.')

      // Make sure the user owns the model.
      const instance = await model.query().findById(id)
      if (instance) {
        const doesOwn = isUser(context.user) ? await isOwn(instance, context.user) : false
        if (!doesOwn) {
          throw new Error('Not allowed to delete this node.')
        }
        const numDeleted = await instance.$query().delete()
        return { numDeleted }
      } else {
        return { numDeleted: 0 }
      }
    },
  },
} satisfies Resolvers<Context>
