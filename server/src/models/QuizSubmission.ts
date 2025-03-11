import { JSONSchema, Model, snakeCaseMappers } from 'objection'

import { Quiz } from './Quiz.ts'
import { User } from './User.ts'

export class QuizSubmission extends Model {
  static tableName = 'quiz_submissions'
  static columnNameMappers = snakeCaseMappers()
  static jsonSchema: JSONSchema = {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      quizId: { type: 'number' },
      submissionData: { type: 'object' },
      grade: { type: 'number' },
    },
    required: ['userId', 'quizId', 'submissionData', 'grade'],
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'quiz_submissions.user_id',
          to: 'users.id',
        },
      },
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: 'quiz_submissions.quiz_id',
          to: 'quizzes.id',
        },
      },
    }
  }

  public id!: number | string
  public userId!: number | string
  public quizId!: number | string
  public submissionData!: Record<string, any>
  public grade!: number
}
