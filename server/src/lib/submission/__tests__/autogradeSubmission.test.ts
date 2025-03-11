import { Quiz } from '../../../models/Quiz'
import { createQuiz } from '../../../test/factory/Quiz'
import { autogradeSubmission } from '../autogradeSubmission'

describe('#autogradeSubmission()', () => {
  let quiz: Quiz
  beforeEach(async () => {
    quiz = await createQuiz({
      configuration: {
        questions: [
          {
            id: 'one',
            name: 'First Question',
            options: [
              { value: 'one', name: 'One', isCorrect: false },
              { value: 'two', name: 'Two', isCorrect: true },
              { value: 'three', name: 'Three', isCorrect: false },
            ],
            __typename: 'MultipleChoiceQuizQuestion',
          },
          {
            id: 'two',
            name: 'Second Question',
            options: [
              { value: 'one', name: 'One', isCorrect: true },
              { value: 'two', name: 'Two', isCorrect: false },
              { value: 'three', name: 'Three', isCorrect: false },
            ],
            __typename: 'MultipleChoiceQuizQuestion',
          },
        ],
      },
    })
  })

  it('grades the submission', async () => {
    expect(
      await autogradeSubmission(quiz.id, {
        one: { value: 'three' },
        two: { value: 'one' },
      }),
    ).toBe(0.5)
  })
})
