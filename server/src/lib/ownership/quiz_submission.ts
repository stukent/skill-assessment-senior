import { isOwn } from './index.ts'
import { QuizSubmission } from '../../models/QuizSubmission.ts'
import { User } from '../../models/User.ts'

export default async function (model: QuizSubmission, user: User) {
  const isOwnSubmission = model.userId.toString() === user.id.toString()
  if (isOwnSubmission) return true
  const isOwnQuiz = await isOwn(await model.$relatedQuery('quiz').first().throwIfNotFound(), user)
  return isOwnQuiz
}
