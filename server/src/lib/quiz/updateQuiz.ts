import { Quiz } from '../../models/Quiz.ts'

export async function updateQuiz(
  id: string | number,
  quiz: Partial<Pick<Quiz, 'name' | 'configuration'>>,
) {
  return Quiz.query().patchAndFetchById(id, quiz).throwIfNotFound()
}
