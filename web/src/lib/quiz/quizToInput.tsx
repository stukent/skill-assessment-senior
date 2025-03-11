import questionTypes from './questions'
import { QuizFragment, QuizInput } from '../../schema'
import { omitDeep } from '../omitDeep'

export function quizToInput(quiz: QuizFragment): QuizInput {
  return {
    name: quiz.name,
    configuration: {
      questions: quiz.configuration.questions.map(({ __typename, ...question }) => {
        const questionType = questionTypes.find(
          questionType => questionType.typename === __typename,
        )
        if (!questionType) throw new Error('Invalid question type.')
        return {
          [questionType.inputKey]: omitDeep(question, ['__typename']),
        }
      }),
    },
  }
}
