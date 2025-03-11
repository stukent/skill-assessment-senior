import { Button, Icon, Item, Menu, MenuTrigger, Text } from '@adobe/react-spectrum'
import { Plus } from 'iconoir-react'

import questionTypes from './questions'
import { QuizQuestionInput } from '../../schema'
import { getRandomString } from '../getRandomString'

export interface AddQuestionButtonProps {
  onAdd: (question: QuizQuestionInput) => void
}
export function AddQuestionButton({ onAdd }: AddQuestionButtonProps) {
  return (
    <MenuTrigger>
      <Button variant={'primary'} alignSelf={'flex-start'}>
        <Icon>
          <Plus />
        </Icon>
        <Text>Add Question</Text>
      </Button>
      <Menu
        onAction={key => {
          const questionType = questionTypes.find(questionType => questionType.inputKey === key)
          if (!questionType) return
          onAdd({
            [questionType.inputKey as any]: {
              ...questionType.defaultInput(),
              id: getRandomString(),
              name: '',
            },
          })
        }}
      >
        {questionTypes.map(questionType => {
          return (
            <Item key={questionType.inputKey}>
              <Icon>{questionType.icon}</Icon>
              <Text>{questionType.label}</Text>
            </Item>
          )
        })}
      </Menu>
    </MenuTrigger>
  )
}
