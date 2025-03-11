import { Quiz } from '../../models/Quiz.ts'
import { User } from '../../models/User.ts'
import { UserGroup } from '../../schema.ts'

export async function getQuizzes(user: User) {
  if (user.group === UserGroup.Teacher) {
    return user.$relatedQuery('quizzes')
  } else {
    return Quiz.query()
  }
}
