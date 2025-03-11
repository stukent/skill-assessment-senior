import { Flex, Link } from '@adobe/react-spectrum'

import { QuizActionsProps } from '../quiz/QuizzesTable'

export function QuizActions({ quiz }: QuizActionsProps) {
  return (
    <Flex direction={'row'} gap={'size-100'} alignItems={'center'}>
      <Link href={`/student/quizzes/${quiz.id}`}>View</Link>
    </Flex>
  )
}
