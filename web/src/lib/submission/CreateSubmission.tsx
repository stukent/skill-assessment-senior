import { useNavigate } from 'react-router-dom'

import { SubmissionForm } from './SubmissionForm'
import { useCreateQuizSubmissionMutation } from '../../schema'
import { onMutationError } from '../onMutationError'

export interface CreateSubmissionProps {
  quizId: string
}
export function CreateSubmission({ quizId }: CreateSubmissionProps) {
  const navigate = useNavigate()
  const [create, { loading }] = useCreateQuizSubmissionMutation({
    onError: onMutationError('There was an error creating that submission.'),
    onCompleted() {
      navigate('/student/quizzes')
    },
  })

  return (
    <SubmissionForm
      quizId={quizId}
      onSubmit={async submissionData => {
        await create({
          variables: {
            input: {
              id: quizId,
              submissionData,
            },
          },
        })
      }}
      loading={loading}
    />
  )
}
