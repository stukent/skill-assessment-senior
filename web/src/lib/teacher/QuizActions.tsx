import { Flex, Link } from '@adobe/react-spectrum'

import { DeleteQuizButton } from '../quiz/DeleteQuizButton'
import { QuizActionsProps } from '../quiz/QuizzesTable'

export function QuizActions({ quiz }: QuizActionsProps) {
  return (
    <Flex direction={'row'} gap={'size-100'} alignItems={'center'}>
      <Link href={`/teacher/quizzes/${quiz.id}`}>Edit</Link>
      <DeleteQuizButton id={quiz.id} />
    </Flex>
  )
}
