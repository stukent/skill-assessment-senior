import { ProgressCircle } from '@adobe/react-spectrum'

import { QuizSubmissionsTable, QuizSubmissionsTableProps } from './SubmissionsTable'
import { useQuizSubmissionsQuery } from '../../schema'

export function ListSubmissions(props: Omit<QuizSubmissionsTableProps, 'quizSubmissions'>) {
  const { data, loading } = useQuizSubmissionsQuery()
  const submissions = data?.quizSubmissions ?? []

  if (loading) {
    return (
      <ProgressCircle
        aria-label={'Loading quiz submissions...'}
        alignSelf={'center'}
        marginX={'auto'}
        isIndeterminate
      />
    )
  } else {
    return <QuizSubmissionsTable {...props} quizSubmissions={submissions} />
  }
}
