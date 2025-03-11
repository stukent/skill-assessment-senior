import { JSONSchema, Model, snakeCaseMappers } from 'objection'

import { QuizSubmission } from './QuizSubmission.ts'
import { User } from './User.ts'

export interface StoredQuizQuestion {
  [key: string]: any
  name: string
  id: string
  __typename?: any
}
export interface StoredQuizConfiguration {
  questions: StoredQuizQuestion[]
}

export class Quiz extends Model {
  static tableName = 'quizzes'
  static columnNameMappers = snakeCaseMappers()
  static jsonSchema: JSONSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      configuration: { type: 'object' },
      userId: { type: ['string', 'number'] },
    },
    required: ['name', 'configuration'],
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'quizzes.user_id',
          to: 'users.id',
        },
      },
      submissions: {
        relation: Model.HasManyRelation,
        modelClass: QuizSubmission,
        join: {
          from: 'quizzes.id',
          to: 'quiz_submissions.quiz_id',
        },
      },
    }
  }

  public id!: number | string
  public name!: string
  public userId!: number | string
  public configuration!: StoredQuizConfiguration
  public submissions?: QuizSubmission[]
  public user?: User
}
