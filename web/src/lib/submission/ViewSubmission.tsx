import { InlineAlert, ProgressCircle } from '@adobe/react-spectrum'

import { SubmissionForm } from './SubmissionForm'
import { useQuizSubmissionQuery } from '../../schema'
import questions from '../quiz/questions'

export interface ViewSubmissionProps {
  submissionId: string
}
export function ViewSubmission({ submissionId }: ViewSubmissionProps) {
  const { data, loading } = useQuizSubmissionQuery({
    variables: { id: submissionId },
  })
  const submission = data?.node?.__typename === 'QuizSubmission' ? data.node : undefined
  if (loading) {
    return (
      <ProgressCircle
        aria-label={'Loading quiz submission...'}
        alignSelf={'center'}
        margin={'size-1000'}
        isIndeterminate
      />
    )
  } else if (submission) {
    return (
      <SubmissionForm
        defaultValue={submission.submissionData.reduce((acc, data) => {
          const questionType = questions.find(q => q.submissionTypename === data.__typename)
          if (!questionType) throw new Error('Invalid question type.')
          return {
            ...acc,
            [data.questionId]: {
              [questionType.inputKey]: data,
            },
          }
        }, {})}
        quizId={submission.quiz.id}
      />
    )
  } else {
    return (
      <InlineAlert margin={'size-1000'} variant={'negative'} alignSelf={'center'} width={400}>
        Cannot find quiz submission.
      </InlineAlert>
    )
  }
}
