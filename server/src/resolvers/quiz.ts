import { fromGlobalId, toGlobalId } from 'graphql-relay'

import questionTypes from '../lib/questions/index.ts'
import { createQuiz } from '../lib/quiz/createQuiz.ts'
import { getQuizzes } from '../lib/quiz/getQuizzes.ts'
import { updateQuiz } from '../lib/quiz/updateQuiz.ts'
import { StoredQuizConfiguration } from '../models/Quiz.ts'
import { QuizConfigurationInput, Resolvers } from '../schema.ts'
import { Context, isUser } from '../types.ts'

function mapConfiguration(input: QuizConfigurationInput): StoredQuizConfiguration {
  return {
    questions: input.questions.map(question => {
      const type = Object.keys(question)[0]
      if (!type) throw new Error('Input question type is invalid.')
      const questionType = questionTypes.find(q => q.inputKey === type)
      return {
        ...question[type],
        __typename: questionType.type,
      }
    }),
  }
}

export default {
  Quiz: {
    id: parent => toGlobalId('Quiz', parent.id),
  },
  Query: {
    quizzes: async (parent, args, context) => {
      return isUser(context.user) ? getQuizzes(context.user) : null
    },
  },
  Mutation: {
    createQuiz: async (parent, args, context) => {
      if (!isUser(context.user)) throw new Error('User is invalid.')
      const quiz = await createQuiz(context.user, {
        ...args.input,
        configuration: mapConfiguration(args.input.configuration),
      })
      return { quiz }
    },
    updateQuiz: async (parent, args, context) => {
      if (!isUser(context.user)) throw new Error('User is invalid.')
      const quizId = fromGlobalId(args.input.id)
      if (!quizId || quizId.type !== 'Quiz') throw new Error('Quiz ID not passed.')
      const quiz = await updateQuiz(quizId.id, {
        ...args.input.patch,
        configuration: args.input.patch.configuration
          ? mapConfiguration(args.input.patch.configuration)
          : undefined,
      })
      return { quiz }
    },
  },
} satisfies Resolvers<Context>
