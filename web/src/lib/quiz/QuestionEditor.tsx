import { ActionButton, Flex, Icon, TextField, Well } from '@adobe/react-spectrum'
import { Minus } from 'iconoir-react'

import questionTypes from './questions'
import { QuizQuestionInput } from '../../schema'

export interface QuestionEditorProps {
  question: QuizQuestionInput
  onChange: (question: QuizQuestionInput) => void
  onRemove: () => void
}
export function QuestionEditor({ question, onChange, onRemove }: QuestionEditorProps) {
  const questionType = questionTypes.find(
    questionType => questionType.inputKey === Object.keys(question)[0],
  )
  if (!questionType) throw new Error('Invalid question type.')
  const questionValue = question[questionType.inputKey]
  if (!questionValue) throw new Error('Invalid question value.')
  const Editor = questionType.editor
  return (
    <Well maxWidth={800}>
      <Flex direction={'row'} gap={'size-200'} alignItems={'end'} marginBottom={'size-150'}>
        <TextField
          label={'Question Name'}
          isRequired
          flex={1}
          value={questionValue.name}
          onChange={value => {
            onChange({
              ...question,
              [questionType.inputKey]: {
                ...questionValue,
                name: value,
              },
            })
          }}
        />
        <ActionButton onPress={onRemove} aria-label={'Remove'}>
          <Icon>
            <Minus />
          </Icon>
        </ActionButton>
      </Flex>
      <Editor
        value={questionValue}
        onChange={newQuestionValue => {
          onChange({
            ...question,
            [questionType.inputKey]: newQuestionValue,
          })
        }}
      />
    </Well>
  )
}
