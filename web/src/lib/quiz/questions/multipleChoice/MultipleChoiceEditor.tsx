import { ActionButton, Flex, Icon, Text } from '@adobe/react-spectrum'
import { Plus } from 'iconoir-react'
import React from 'react'

import { MultipleChoiceOptionEditor } from './MultipleChoiceOptionEditor'
import { getRandomString } from '../../../getRandomString'
import { QuestionEditorProps } from '../types'

export function MultipleChoiceEditor({ value, onChange }: QuestionEditorProps<'multipleChoice'>) {
  const onAdd = React.useCallback(() => {
    onChange({
      ...value,
      options: [
        ...value.options,
        {
          value: getRandomString(),
          isCorrect: false,
          name: '',
        },
      ],
    })
  }, [onChange, value])
  return (
    <Flex direction={'column'} gap={'size-100'} marginStart={'size-100'} alignItems={'stretch'}>
      {value?.options.map(option => {
        return (
          <MultipleChoiceOptionEditor
            key={option.value}
            option={option}
            onAdd={onAdd}
            onRemove={() => {
              onChange({
                ...value,
                options: value.options.filter(opt => opt.value !== option.value),
              })
            }}
            onChange={changes => {
              const newOptions = changes.isCorrect
                ? value.options.map(opt => ({ ...opt, isCorrect: false }))
                : value.options
              onChange({
                ...value,
                options: newOptions.map(opt =>
                  opt.value === option.value ? { ...opt, ...changes } : opt,
                ),
              })
            }}
          />
        )
      })}
      <ActionButton
        alignSelf={'flex-start'}
        onPress={onAdd}
        marginStart={50}
        marginTop={'size-100'}
      >
        <Icon>
          <Plus />
        </Icon>
        <Text>Add Option</Text>
      </ActionButton>
    </Flex>
  )
}
