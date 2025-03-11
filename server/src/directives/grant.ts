import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { GraphQLSchema } from 'graphql'

import { grantPermission } from '../lib/permission.ts'

export function grantDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.ENUM_VALUE]: (valueConfig, typeName, schema, externalValue) => {
      const grantDirective = getDirective(schema, valueConfig, 'grant')?.[0]
      if (grantDirective) {
        for (const group of grantDirective.to ?? []) {
          grantPermission(group, externalValue)
        }
      }
      return valueConfig
    },
  })
}
