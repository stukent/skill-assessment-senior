import { Heading } from '@adobe/react-spectrum'
import { useParams } from 'react-router-dom'

import { EditQuiz } from '../quiz/EditQuiz'

export function EditQuizPage() {
  const { id } = useParams()
  return (
    <>
      <Heading level={1} marginBottom={'size-200'}>
        Edit Quiz
      </Heading>
      <EditQuiz quizId={id!} />
    </>
  )
}
