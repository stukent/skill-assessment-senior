import { QuizSubmissionDataInput, QuizSubmissionFragment } from '../../schema'
import questions from '../quiz/questions'

export function submissionToInput(submission: QuizSubmissionFragment): QuizSubmissionDataInput[] {
  return Object.entries(submission.submissionData).map(([, data]) => {
    const question = questions.find(q => q.typename === data.__typename)
    if (!question) throw new Error('Invalid question.')
    return {
      [question.inputKey]: data,
    }
  })
}
