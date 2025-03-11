import { Model, ModelClass } from 'objection'

import { Quiz } from './Quiz.ts'
import { QuizSubmission } from './QuizSubmission.ts'
import { User } from './User.ts'

export const Models: Record<string, ModelClass<Model>> = {
  User,
  Quiz,
  QuizSubmission,
}
