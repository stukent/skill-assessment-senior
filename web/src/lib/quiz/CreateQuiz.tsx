import { useNavigate } from 'react-router-dom'

import { QuizForm } from './QuizForm'
import { useCreateQuizMutation } from '../../schema'
import { onMutationError } from '../onMutationError'

export function CreateQuiz() {
  const navigate = useNavigate()
  const [create, { loading }] = useCreateQuizMutation({
    onError: onMutationError('There was an error creating that quiz.'),
    onCompleted(data) {
      navigate(data.createQuiz.quiz.id)
    },
  })
  return (
    <QuizForm
      onSubmit={async values => {
        await create({
          variables: {
            input: values,
          },
        })
      }}
      loading={loading}
      submitText={'Create Quiz'}
    />
  )
}
