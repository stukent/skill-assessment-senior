import { autogradeSubmission } from './autogradeSubmission.ts'
import { QuizSubmission } from '../../models/QuizSubmission.ts'
import { User } from '../../models/User.ts'

export async function createQuizSubmission(
  user: User,
  submission: Pick<QuizSubmission, 'quizId' | 'submissionData'>,
) {
  return QuizSubmission.query().insertAndFetch({
    ...submission,
    userId: user.id,
    grade: await autogradeSubmission(submission.quizId, submission.submissionData),
  })
}
