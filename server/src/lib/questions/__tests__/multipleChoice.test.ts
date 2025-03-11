import { MultipleChoiceQuizQuestion, MultipleChoiceQuizSubmissionDataInput } from '../../../schema'
import multipleChoice from '../multipleChoice'

describe('multipleChoice autograder', () => {
  let config: MultipleChoiceQuizQuestion
  let submissionData: MultipleChoiceQuizSubmissionDataInput
  beforeEach(() => {
    config = {
      id: '1',
      name: 'testing',
      options: [
        { value: 'one', name: 'One', isCorrect: false },
        { value: 'two', name: 'Two', isCorrect: true },
        { value: 'three', name: 'Three', isCorrect: false },
      ],
    }
  })

  it('grades correct', () => {
    expect(multipleChoice.autograde(config, { questionId: 'test', value: 'two' })).toBe(1)
  })
  it('grades incorrect', () => {
    expect(multipleChoice.autograde(config, { questionId: 'test', value: 'three' })).toBe(0)
  })
})
