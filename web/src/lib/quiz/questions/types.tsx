import { QuizQuestion, QuizQuestionInput, QuizSubmissionData } from '../../../schema'

export interface QuestionEditorProps<InputKey extends keyof QuizQuestionInput> {
  value: NonNullable<Required<QuizQuestionInput>[InputKey]>
  onChange: (value: QuizQuestionInput[InputKey]) => void
}
export interface QuestionFieldProps<
  Question extends QuizQuestion,
  SubmissionData extends QuizSubmissionData,
> {
  question: Question
  submissionData?: SubmissionData
  onChange: (submissionData: SubmissionData) => void
  disabled?: boolean
}
export interface QuestionType<
  InputKey extends keyof QuizQuestionInput,
  Question extends QuizQuestion,
  SubmissionData extends QuizSubmissionData,
> {
  inputKey: InputKey
  typename: string
  submissionTypename: string
  label: string
  icon: React.ReactElement
  defaultInput: () => Omit<QuizQuestionInput[InputKey], 'id' | 'name'>
  editor: (props: QuestionEditorProps<InputKey>) => React.ReactNode
  field: (props: QuestionFieldProps<Question, SubmissionData>) => React.ReactNode
}
