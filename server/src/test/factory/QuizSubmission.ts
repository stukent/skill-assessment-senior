import { createQuiz } from './Quiz'
import { createUser } from './User'
import { QuizSubmission } from '../../models/QuizSubmission'

export async function createQuizSubmission(payload?: Partial<QuizSubmission>) {
  return QuizSubmission.query().insertAndFetch({
    grade: 1,
    submissionData: {},
    ...payload,
    userId: payload?.userId ? payload.userId : await createUser().then(user => user.id),
    quizId: payload?.quizId ? payload.quizId : await createQuiz().then(quiz => quiz.id),
  })
}
