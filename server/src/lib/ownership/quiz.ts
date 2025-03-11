import { Quiz } from '../../models/Quiz.ts'
import { User } from '../../models/User.ts'

export default async function (model: Quiz, user: User) {
  return model.userId.toString() === user.id.toString()
}
