import { Button, Flex, Heading, Icon, Text } from '@adobe/react-spectrum'
import { Plus } from 'iconoir-react'
import { useNavigate } from 'react-router-dom'

import { QuizActions } from './QuizActions'
import { ListQuizzes } from '../quiz/ListQuizzes'

export function ListQuizzesPage() {
  const navigate = useNavigate()
  return (
    <>
      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={'size-200'}
      >
        <Heading level={1}>Quizzes</Heading>
        <Button variant={'accent'} onPress={() => navigate('create')}>
          <Icon>
            <Plus />
          </Icon>
          <Text>Create Quiz</Text>
        </Button>
      </Flex>
      <ListQuizzes actions={QuizActions} />
    </>
  )
}
