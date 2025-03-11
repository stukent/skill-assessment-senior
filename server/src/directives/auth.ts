import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { GraphQLSchema, defaultFieldResolver } from 'graphql'
import { fromGlobalId } from 'graphql-relay'

import { isOwn } from '../lib/ownership/index.ts'
import { hasPermission } from '../lib/permission.ts'
import { Models } from '../models/index.ts'

function getIdFromArgs(args: any): { type: string; id: string } | undefined {
  return args?.input?.id
    ? fromGlobalId(args.input.id)
    : args?.id
    ? fromGlobalId(args.id)
    : undefined
}

export function authDirectiveTransformer(schema: GraphQLSchema) {
  const typeDirectiveArgumentMaps: Record<string, any> = {}
  return mapSchema(schema, {
    [MapperKind.TYPE]: type => {
      const authDirective = getDirective(schema, type, 'auth')?.[0]
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective
      }
      return undefined
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const authDirective =
        getDirective(schema, fieldConfig, 'auth')?.[0] ?? typeDirectiveArgumentMaps[typeName]
      if (authDirective) {
        const { requires, own: requiresOwn } = authDirective
        if (requires || requiresOwn) {
          const { resolve = defaultFieldResolver } = fieldConfig
          fieldConfig.resolve = async function (source, args, context, info) {
            const user = context.user ?? null
            let isAllowed = false
            if (requires && (await hasPermission(user, requires))) {
              isAllowed = true
            } else if (requiresOwn && (await hasPermission(user, requiresOwn))) {
              const entityId = getIdFromArgs(args)
              if (entityId && Models[entityId.type]) {
                const model = Models[entityId.type]
                const entity = await model.query().findById(entityId.id)
                if (entity) {
                  isAllowed = await isOwn(entity, user)
                }
              }
            }

            if (!isAllowed) {
              throw new Error('Not allowed.')
            }

            return resolve(source, args, context, info)
          }
          return fieldConfig
        }
      }

      return fieldConfig
    },
  })
}
