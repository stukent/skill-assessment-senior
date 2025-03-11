import { Quiz } from '../../models/Quiz.ts'
import { User } from '../../models/User.ts'

export async function createQuiz(user: User, quiz: Pick<Quiz, 'name' | 'configuration'>) {
  return Quiz.query().insertAndFetch({
    ...quiz,
    userId: user.id,
  })
}
