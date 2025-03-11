import { Flex, Link } from '@adobe/react-spectrum'

import { QuizSubmissionActionsProps } from './SubmissionsTable'

export function SubmissionActions({ quizSubmission }: QuizSubmissionActionsProps) {
  return (
    <Flex direction={'row'} gap={'size-100'} alignItems={'center'}>
      <Link href={`quiz-submissions/${quizSubmission.id}`}>View</Link>
    </Flex>
  )
}
