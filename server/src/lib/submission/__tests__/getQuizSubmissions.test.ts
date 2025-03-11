import { Quiz } from '../../../models/Quiz'
import { QuizSubmission } from '../../../models/QuizSubmission'
import { User } from '../../../models/User'
import { createQuiz } from '../../../test/factory/Quiz'
import { createQuizSubmission } from '../../../test/factory/QuizSubmission'
import { createUser } from '../../../test/factory/User'
import { getQuizSubmissions } from '../getQuizSubmissions'

describe('#getQuizSubmissions()', () => {
  let result: QuizSubmission[]
  let quiz: Quiz
  let teacherUser: User
  let studentUser: User
  beforeEach(async () => {
    teacherUser = await createUser({ group: 'TEACHER' })
    studentUser = await createUser({ group: 'STUDENT' })
    quiz = await createQuiz()
    await Promise.all([
      createQuizSubmission({ userId: studentUser.id, quizId: quiz.id }),
      createQuizSubmission(),
      createQuizSubmission(),
    ])
  })

  describe('when the user is a teacher', () => {
    it('returns all submissions', async () => {
      result = await getQuizSubmissions(teacherUser)
      expect(result).toHaveLength(3)
    })
    it('filters by quiz id', async () => {
      result = await getQuizSubmissions(teacherUser, { quizId: quiz.id })
      expect(result).toHaveLength(1)
      expect(result[0].quizId).toEqual(quiz.id)
    })
  })
  describe('when the user is a student', () => {
    it('returns own submissions', async () => {
      result = await getQuizSubmissions(studentUser)
      expect(result).toHaveLength(1)
      expect(result[0].userId).toEqual(studentUser.id)
    })
  })
})
