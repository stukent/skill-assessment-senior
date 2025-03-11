import { QuizQuestionInput } from '../../schema'

export function getQuestionId(question: QuizQuestionInput) {
  const firstValue = Object.values(question)[0]
  if (!firstValue) throw new Error('Invalid question')
  return firstValue.id
}
