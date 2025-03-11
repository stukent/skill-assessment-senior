import { ActionButton, Checkbox, Flex, Icon, TextField } from '@adobe/react-spectrum'
import { Minus } from 'iconoir-react'

import { MultipleChoiceQuizQuestionOptionInput } from '../../../../schema'

export interface MultipleChoiceOptionEditorProps {
  option: MultipleChoiceQuizQuestionOptionInput
  onAdd: () => void
  onRemove: () => void
  onChange: (option: MultipleChoiceQuizQuestionOptionInput) => void
}
export function MultipleChoiceOptionEditor({
  option,
  onAdd,
  onRemove,
  onChange,
}: MultipleChoiceOptionEditorProps) {
  return (
    <Flex gap={'size-200'} direction={'row'} alignItems={'center'}>
      <Checkbox
        isSelected={option.isCorrect}
        onChange={selected => {
          onChange({
            ...option,
            isCorrect: selected,
          })
        }}
        aria-label={'Is Correct'}
      />
      <TextField
        aria-label={'Label'}
        value={option.name}
        autoFocus
        onChange={value => {
          onChange({
            ...option,
            name: value,
          })
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onAdd()
          }
        }}
        width={'auto'}
        flex={1}
      />
      <ActionButton onPress={onRemove} isQuiet>
        <Icon>
          <Minus />
        </Icon>
      </ActionButton>
    </Flex>
  )
}
