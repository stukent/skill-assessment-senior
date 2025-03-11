import { QuizSubmission } from '../../models/QuizSubmission.ts'
import { User } from '../../models/User.ts'
import { UserGroup } from '../../schema.ts'

export interface GetQuizSubmissionsOpts {
  quizId?: string | number
}
export async function getQuizSubmissions(user: User, { quizId }: GetQuizSubmissionsOpts = {}) {
  const query =
    user.group === UserGroup.Teacher
      ? QuizSubmission.query()
      : user.$relatedQuery('quizSubmissions')
  if (quizId) query.where('quiz_id', quizId)
  return query
}
