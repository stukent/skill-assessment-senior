import { QuizQuestionInput, Resolvers } from '../../schema'

export interface QuestionType {
  inputKey: keyof QuizQuestionInput
  submissionDataTypename: string
  type: keyof Resolvers
  autograde: (configuration: any, submissionData: any) => number
}
