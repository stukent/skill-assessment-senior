import { Model, ModelClass } from 'objection'

import quiz from './quiz.ts'
import quizSubmission from './quiz_submission.ts'
import user from './user.ts'
import { log } from '../../log.ts'
import { User } from '../../models/User.ts'

const OWNERSHIP: Record<string, (model: Model, user: User) => Promise<boolean>> = {
  users: user,
  quizzes: quiz,
  quiz_submissions: quizSubmission,
}

export async function isOwn(model: Model, user: User): Promise<boolean> {
  const anyModel = model as any // Lazy cast for debugging only.
  log(
    'checking ownership of %s %d for user %d',
    anyModel.constructor.tableName,
    anyModel.id,
    user.id,
  )
  const modelConstructor = model.constructor as ModelClass<Model>
  const ownership = OWNERSHIP[modelConstructor.tableName]
  if (!ownership) throw new Error(`Cannot find ownership for ${modelConstructor.tableName}`)
  return ownership(model, user)
}
