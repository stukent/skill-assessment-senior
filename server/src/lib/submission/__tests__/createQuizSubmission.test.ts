import { Quiz } from '../../../models/Quiz'
import { QuizSubmission } from '../../../models/QuizSubmission'
import { User } from '../../../models/User'
import { createQuiz } from '../../../test/factory/Quiz'
import { createUser } from '../../../test/factory/User'
import { createQuizSubmission } from '../createQuizSubmission'

describe('#createQuizSubmission()', () => {
  let quiz: Quiz
  let user: User
  let result: QuizSubmission
  beforeEach(async () => {
    user = await createUser({ group: 'STUDENT' })
    quiz = await createQuiz()
    result = await createQuizSubmission(user, {
      quizId: quiz.id,
      submissionData: {},
    })
  })

  it('creates the submission', () => {
    expect(result.quizId).toEqual(quiz.id)
    expect(result.userId).toEqual(user.id)
    expect(result.submissionData).toEqual({})
  })
  // Because there are no questions.
  it('records the grade as 0', () => {
    expect(result.grade).toBe(0)
  })
})
