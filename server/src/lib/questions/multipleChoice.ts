import { QuestionType } from './types.ts'
import { MultipleChoiceQuizQuestion, MultipleChoiceQuizSubmissionDataInput } from '../../schema.ts'

export default {
  inputKey: 'multipleChoice',
  submissionDataTypename: 'MultipleChoiceQuizSubmissionData',
  type: 'MultipleChoiceQuizQuestion',
  autograde(
    configuration: MultipleChoiceQuizQuestion,
    submissionData: MultipleChoiceQuizSubmissionDataInput,
  ) {
    if (!Array.isArray(configuration.options)) throw new Error('Invalid options.')
    const answerValue = configuration.options.find(op => op.isCorrect)?.value
    return answerValue === submissionData.value ? 1 : 0
  },
} satisfies QuestionType
