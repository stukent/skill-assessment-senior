import { NotFoundError } from 'objection'

import { Quiz } from '../../../models/Quiz'
import { createQuiz } from '../../../test/factory/Quiz'
import { updateQuiz } from '../updateQuiz'

describe('#updateQuiz()', () => {
  let quiz: Quiz
  beforeEach(async () => {
    quiz = await createQuiz()
  })

  it('updates the quiz', async () => {
    const updated = await updateQuiz(quiz.id, { name: 'another' })
    expect(updated.name).toBe('another')
    const queried = await quiz.$query()
    expect(queried.name).toBe('another')
  })
  it('throws if the quiz isnt found', async () => {
    await expect(updateQuiz(1024551, { name: 'testing' })).rejects.toThrow(NotFoundError)
  })
})
