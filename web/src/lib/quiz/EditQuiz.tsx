import { InlineAlert, ProgressCircle } from '@adobe/react-spectrum'
import { ToastQueue } from '@react-spectrum/toast'
import { useNavigate } from 'react-router-dom'

import { QuizForm } from './QuizForm'
import { quizToInput } from './quizToInput'
import { useQuizQuery, useUpdateQuizMutation } from '../../schema'
import { onMutationError } from '../onMutationError'

export interface EditQuizProps {
  quizId: string
}
export function EditQuiz({ quizId }: EditQuizProps) {
  const navigate = useNavigate()
  const { data, loading: quizLoading } = useQuizQuery({
    variables: { id: quizId },
  })
  const quiz = data?.node?.__typename === 'Quiz' ? data.node : undefined
  const [update, { loading }] = useUpdateQuizMutation({
    onError: onMutationError('There was an error updating your quiz.'),
    onCompleted() {
      ToastQueue.info('Quiz updated.', { timeout: 3000 })
      navigate('..')
    },
  })
  if (quizLoading) {
    return (
      <ProgressCircle
        aria-label={'Loading quiz...'}
        alignSelf={'center'}
        margin={'size-1000'}
        isIndeterminate
      />
    )
  } else if (quiz) {
    return (
      <QuizForm
        defaultValue={quizToInput(quiz)}
        onSubmit={async values => {
          await update({
            variables: {
              input: {
                id: quizId,
                patch: values,
              },
            },
          })
        }}
        loading={loading}
        submitText={'Save Changes'}
      />
    )
  } else {
    return (
      <InlineAlert margin={'size-1000'} variant={'negative'} alignSelf={'center'} width={400}>
        Cannot find quiz.
      </InlineAlert>
    )
  }
}
