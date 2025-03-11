import auth from './auth.ts'
import node from './node.ts'
import quiz from './quiz.ts'
import submission from './submission.ts'
import { Resolvers } from '../schema.ts'

function merge(base: Resolvers, others: Resolvers[]): Resolvers {
  return others.reduce((acc, other) => {
    return {
      ...acc,
      ...other,
      Query: {
        ...acc.Query,
        ...other.Query,
      },
      Mutation: {
        ...acc.Mutation,
        ...other.Mutation,
      },
    }
  }, base)
}

export default merge({}, [node, auth, quiz, submission])
