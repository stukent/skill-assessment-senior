import { Quiz } from '../../models/Quiz.ts'
import questions from '../questions/index.ts'

interface GradeResult {
  questionId: string
  grade: number
  isValid: boolean
}

function calculateAverageGrade(gradeResults: GradeResult[]): number {
  const validResults = gradeResults.filter(result => result.isValid === true)
  if (validResults.length === 0) {
    return 0
  }

  let sumOfGrades = 0
  for (let i = 0; i < validResults.length; i++) {
    const currentResult = validResults[i]
    const currentGrade = currentResult.grade
    sumOfGrades = sumOfGrades + currentGrade
  }

  const numberOfValidResults = validResults.length
  const averageGrade = sumOfGrades / numberOfValidResults

  return averageGrade
}

function findQuestionConfiguration(quizConfiguration: Quiz['configuration'], questionId: string) {
  const allQuestions = quizConfiguration.questions
  let matchingConfiguration = null
  for (let i = 0; i < allQuestions.length; i++) {
    const currentQuestion = allQuestions[i]
    if (currentQuestion.id === questionId) {
      matchingConfiguration = currentQuestion
      break
    }
  }
  return matchingConfiguration
}

function findMatchingQuestionType(typename: string) {
  let matchingQuestion = null
  for (let i = 0; i < questions.length; i++) {
    const currentQuestion = questions[i]
    if (currentQuestion.type === typename) {
      matchingQuestion = currentQuestion
      break
    }
  }
  return matchingQuestion
}

export async function autogradeSubmission(quizId: string | number, data: Record<string, any>) {
  const quiz = await Quiz.query().findById(quizId).throwIfNotFound()
  const quizConfiguration = quiz.configuration
  const gradeResults: GradeResult[] = []
  const submissionEntries = Object.entries(data)

  for (let i = 0; i < submissionEntries.length; i++) {
    const entry = submissionEntries[i]
    const questionId = entry[0]
    const submissionData = entry[1]

    const configuration = findQuestionConfiguration(quizConfiguration, questionId)
    if (!configuration) throw new Error('Cannot find question configuration.')

    const question = findMatchingQuestionType(configuration.__typename)
    if (!question) throw new Error('Cannot find matching question type.')

    const grade = question.autograde(configuration, submissionData)

    const gradeResult: GradeResult = {
      questionId: questionId,
      grade: grade,
      isValid: true,
    }
    gradeResults.push(gradeResult)
  }

  const averageGrade = calculateAverageGrade(gradeResults)
  return averageGrade
}
