import { Flex, SpectrumTextFieldProps, Text } from '@adobe/react-spectrum'

import { QuizQuestion, QuizSubmissionDataInput } from '../../schema'
import questionTypes from '../quiz/questions'

export interface QuestionFieldProps {
  value?: QuizSubmissionDataInput | null
  onChange: (value: QuizSubmissionDataInput | null) => void
  validationState?: SpectrumTextFieldProps['validationState']
  errorMessage?: string
  question: QuizQuestion & { __typename: string }
  disabled?: boolean
}
export function QuestionField({
  value,
  onChange,
  validationState,
  errorMessage,
  question,
  disabled,
}: QuestionFieldProps) {
  const questionType = questionTypes.find(
    questionType => questionType.typename === question.__typename,
  )
  if (!questionType) throw new Error('Invalid question type.')
  const Field = questionType.field

  return (
    <Flex direction={'column'} gap={'size-150'}>
      <Text>{question.name}</Text>
      <div>
        <Field
          question={question}
          submissionData={value?.[questionType.inputKey]}
          onChange={value => {
            onChange({
              [questionType.inputKey]: value,
            })
          }}
          disabled={disabled}
        />
      </div>
      {validationState === 'invalid' ? (
        <p style={{ color: 'var(--spectrum-red-900)', fontSize: 12 }}>
          {errorMessage ?? 'This field is invalid.'}
        </p>
      ) : null}
    </Flex>
  )
}
