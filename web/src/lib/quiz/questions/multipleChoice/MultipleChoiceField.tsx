import { Flex } from '@adobe/react-spectrum'

import { MultipleChoiceOption } from './MultipleChoiceOption'
import { MultipleChoiceQuizQuestion, MultipleChoiceQuizSubmissionData } from '../../../../schema'
import { QuestionFieldProps } from '../types'

export function MultipleChoiceField({
  question,
  submissionData,
  onChange,
  disabled,
}: QuestionFieldProps<MultipleChoiceQuizQuestion, MultipleChoiceQuizSubmissionData>) {
  return (
    <Flex direction={'column'} gap={'size-100'} marginStart={'size-100'} alignItems={'stretch'}>
      {question.options.map(option => {
        return (
          <MultipleChoiceOption
            key={option.value}
            label={option.name}
            disabled={disabled}
            selected={submissionData?.value === option.value}
            onSelected={() => {
              onChange({
                questionId: question.id,
                value: option.value,
              })
            }}
          />
        )
      })}
    </Flex>
  )
}
