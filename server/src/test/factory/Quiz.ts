import { createUser } from './User'
import { Quiz } from '../../models/Quiz'

export async function createQuiz(payload?: Partial<Quiz>) {
  return Quiz.query().insertAndFetch({
    name: 'Test Quiz',
    configuration: {
      questions: [
        {
          id: '1',
          name: 'Question 1',
          __typename: 'TestQuizQuestion',
        },
      ],
    },
    ...payload,
    userId: payload?.userId ? payload.userId : await createUser().then(user => user.id),
  })
}
