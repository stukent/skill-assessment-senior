import { Quiz } from '../../models/Quiz.ts'
import questions from '../questions/index.ts'

export async function autogradeSubmission(quizId: string | number, data: Record<string, any>) {
  const quiz = await Quiz.query().findById(quizId).throwIfNotFound()
  const quizConfiguration = quiz.configuration
  const grades: number[] = []
  for (const [questionId, submissionData] of Object.entries(data)) {
    const configuration = quizConfiguration.questions.find(q => q.id === questionId)
    if (!configuration) throw new Error('Cannot find question configuration.')
    const question = questions.find(q => q.type === configuration.__typename)
    if (!question) throw new Error('Cannot find matching question type.')
    const grade = question.autograde(configuration, submissionData)
    grades.push(grade)
  }

  return grades.length > 0 ? grades.reduce((a, b) => a + b) / grades.length : 0
}
