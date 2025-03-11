import { Heading } from '@adobe/react-spectrum'

import { CreateQuiz } from '../quiz/CreateQuiz'

export function CreateQuizPage() {
  return (
    <>
      <Heading level={1} marginBottom={'size-200'}>
        Create Quiz
      </Heading>
      <CreateQuiz />
    </>
  )
}
