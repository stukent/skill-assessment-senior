import bcrypt from 'bcrypt'
import { JSONSchema, Model, ModelOptions, QueryContext, snakeCaseMappers } from 'objection'

import { Quiz } from './Quiz.ts'
import { QuizSubmission } from './QuizSubmission.ts'

const BCRYPT_HASH_REGEX = /^\$2[aby]\$\d{2}\$[\d./A-Za-z]{53}$/
const HASH_ROUNDS = 12

function isBcryptHash(str: string) {
  return BCRYPT_HASH_REGEX.test(str)
}

export class User extends Model {
  static tableName = 'users'
  static hidden = ['password']
  static columnNameMappers = snakeCaseMappers()
  static jsonSchema: JSONSchema = {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      group: { type: 'string' },
    },
    required: ['username', 'password', 'group'],
  }
  static get relationMappings() {
    return {
      quizzes: {
        relation: Model.HasManyRelation,
        modelClass: Quiz,
        join: {
          from: 'users.id',
          to: 'quizzes.user_id',
        },
      },
      quizSubmissions: {
        relation: Model.HasManyRelation,
        modelClass: QuizSubmission,
        join: {
          from: 'users.id',
          to: 'quiz_submissions.user_id',
        },
      },
    }
  }

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext)
    return this.generateHash()
  }

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    await super.$beforeUpdate(opt, queryContext)
    if (opt.patch && this.password === undefined) return
    return this.generateHash()
  }

  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  async generateHash() {
    const password = this.password
    if (password) {
      if (isBcryptHash(password)) {
        throw new Error('Password is already encrypted.')
      }

      const hash = await bcrypt.hash(password, HASH_ROUNDS)
      this.password = hash

      return hash
    } else {
      throw new Error('Password is empty.')
    }
  }

  public id!: string | number
  public username!: string
  public password!: string
  public group!: string // TODO: Change me to user group.
  public quizzes?: Quiz[]
  public quizSubmissions?: QuizSubmission[]
}
