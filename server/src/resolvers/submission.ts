import { fromGlobalId, toGlobalId } from 'graphql-relay'

import questions from '../lib/questions/index.ts'
import { createQuizSubmission } from '../lib/submission/createQuizSubmission.ts'
import { getQuizSubmissions } from '../lib/submission/getQuizSubmissions.ts'
import { Quiz } from '../models/Quiz.ts'
import { QuizSubmission } from '../models/QuizSubmission.ts'
import { User } from '../models/User.ts'
import { Resolvers } from '../schema.ts'
import { Context, isUser } from '../types.ts'

export default {
  QuizSubmission: {
    id: parent => toGlobalId('QuizSubmission', parent.id),
    quiz: async (parent: QuizSubmission) => {
      return parent.$relatedQuery<Quiz>('quiz').first().throwIfNotFound()
    },
    user: async (parent: QuizSubmission) => {
      return parent.$relatedQuery<User>('user').first().throwIfNotFound()
    },
    submissionData: async (parent: QuizSubmission) => {
      const quiz = await parent.$relatedQuery<Quiz>('quiz').first().throwIfNotFound()
      return Object.entries(parent.submissionData).reduce((acc, [questionId, data]) => {
        const question = quiz.configuration.questions.find(q => q.id === questionId)
        if (!question) return acc
        const questionType = questions.find(q => q.type === question.__typename)
        if (!questionType) return acc
        return [
          ...acc,
          {
            ...data,
            __typename: questionType.submissionDataTypename,
            questionId,
          },
        ]
      }, [])
    },
  },
  Query: {
    quizSubmissions: async (parent, args, context) => {
      return isUser(context.user) ? getQuizSubmissions(context.user) : null
    },
  },
  Mutation: {
    createQuizSubmission: async (parent, args, context) => {
      if (!isUser(context.user)) throw new Error('User is invalid')
      const quizId = fromGlobalId(args.input.id)
      if (!quizId || quizId.type !== 'Quiz') throw new Error('Quiz ID not passed.')
      const quizSubmission = await createQuizSubmission(context.user, {
        quizId: parseInt(quizId.id, 10),
        submissionData: args.input.submissionData.reduce((acc, data) => {
          const value = Object.values(data)[0]
          if (!value) return acc
          return {
            ...acc,
            [value.questionId]: value,
          }
        }, {}),
      })
      return { quizSubmission }
    },
  },
} satisfies Resolvers<Context>
