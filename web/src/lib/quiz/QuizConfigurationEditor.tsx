import { Flex, SpectrumTextFieldProps } from '@adobe/react-spectrum'

import { AddQuestionButton } from './AddQuestionButton'
import { QuestionEditor } from './QuestionEditor'
import { getQuestionId } from './getQuestionId'
import { QuizConfigurationInput } from '../../schema'

export interface QuizConfigurationEditorProps {
  value?: QuizConfigurationInput | null
  onChange: (value: QuizConfigurationInput | null) => void
  validationState?: SpectrumTextFieldProps['validationState']
  errorMessage?: string
}
export function QuizConfigurationEditor({
  value,
  onChange,
  validationState,
  errorMessage,
}: QuizConfigurationEditorProps) {
  return (
    <div>
      <Flex direction={'column'} gap={'size-250'}>
        {value?.questions.map(question => {
          return (
            <QuestionEditor
              question={question}
              onRemove={() => {
                onChange({
                  ...value,
                  questions:
                    value?.questions.filter(q => getQuestionId(q) !== getQuestionId(question)) ??
                    [],
                })
              }}
              onChange={newQuestion => {
                onChange({
                  ...value,
                  questions:
                    value?.questions.map(question => {
                      if (getQuestionId(question) === getQuestionId(newQuestion)) {
                        return newQuestion
                      }
                      return question
                    }) ?? [],
                })
              }}
              key={getQuestionId(question)}
            />
          )
        })}
        <AddQuestionButton
          onAdd={newQuestion => {
            onChange({
              ...value,
              questions: [...(value?.questions ?? []), newQuestion],
            })
          }}
        />
      </Flex>
      {validationState === 'invalid' ? (
        <p style={{ color: 'var(--spectrum-red-900)', fontSize: 12 }}>
          {errorMessage ?? 'This field is invalid.'}
        </p>
      ) : null}
    </div>
  )
}
