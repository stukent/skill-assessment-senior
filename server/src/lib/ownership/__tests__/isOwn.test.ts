import { isOwn } from '..'
import { Quiz } from '../../../models/Quiz.ts'
import { QuizSubmission } from '../../../models/QuizSubmission.ts'
import { User } from '../../../models/User.ts'
import { createQuiz } from '../../../test/factory/Quiz.ts'
import { createQuizSubmission } from '../../../test/factory/QuizSubmission.ts'
import { createUser } from '../../../test/factory/User.ts'

describe('#isOwn()', () => {
  let teacherUser: User

  beforeEach(async () => {
    teacherUser = await createUser()
  })

  describe('user', () => {
    let target: User

    beforeEach(async () => {
      target = await createUser()
    })

    it('returns true when the user owns the node', async () => {
      expect(await isOwn(teacherUser, teacherUser)).toBe(true)
    })
    it('returns false when the user does not own the node', async () => {
      expect(await isOwn(target, teacherUser)).toBe(false)
    })
  })

  describe('quiz', () => {
    let target: Quiz

    it('returns true when the user owns the node', async () => {
      target = await createQuiz({ userId: teacherUser.id })
      expect(await isOwn(target, teacherUser)).toBe(true)
    })
    it('returns false when the user does not own the node', async () => {
      target = await createQuiz()
      expect(await isOwn(target, teacherUser)).toBe(false)
    })
  })

  describe('quiz submission', () => {
    let target: QuizSubmission

    it('returns true when the user owns the node', async () => {
      target = await createQuizSubmission({ userId: teacherUser.id })
      expect(await isOwn(target, teacherUser)).toBe(true)
    })
    it('returns true when the teacher owns the quiz but not the submission', async () => {
      const quiz = await createQuiz({ userId: teacherUser.id })
      target = await createQuizSubmission({ quizId: quiz.id })
      expect(await isOwn(target, teacherUser)).toBe(true)
    })
    it('returns false when the user does not own the node', async () => {
      target = await createQuizSubmission()
      expect(await isOwn(target, teacherUser)).toBe(false)
    })
  })
})
