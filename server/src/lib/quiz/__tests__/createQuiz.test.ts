import { Quiz } from '../../../models/Quiz'
import { User } from '../../../models/User'
import { createUser } from '../../../test/factory/User'
import { createQuiz } from '../createQuiz'

describe('#createQuiz()', () => {
  let result: Quiz
  let user: User
  beforeEach(async () => {
    user = await createUser()
    result = await createQuiz(user, {
      name: 'testing quiz',
      configuration: {
        questions: [],
      },
    })
  })

  it('creates the quiz', () => {
    expect(result).toBeInstanceOf(Quiz)
    expect(result.name).toBe('testing quiz')
    expect(result.configuration).toEqual(
      expect.objectContaining({
        questions: [],
      }),
    )
  })
  it('sets the user id', () => {
    expect(result.userId).toBe(user.id)
  })
})
