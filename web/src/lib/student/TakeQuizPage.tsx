import { Heading } from '@adobe/react-spectrum'
import { useParams } from 'react-router-dom'

import { CreateSubmission } from '../submission/CreateSubmission'

export function TakeQuizPage() {
  const { id } = useParams()
  return (
    <>
      <Heading level={1}>Take Quiz</Heading>
      {id ? <CreateSubmission quizId={id} /> : null}
    </>
  )
}
