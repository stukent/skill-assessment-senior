import { ProgressCircle } from '@adobe/react-spectrum'

import { QuizzesTable, QuizzesTableProps } from './QuizzesTable'
import { useQuizzesQuery } from '../../schema'

export function ListQuizzes(props: Omit<QuizzesTableProps, 'quizzes'>) {
  const { data, loading } = useQuizzesQuery()
  const quizzes = data?.quizzes ?? []

  if (loading) {
    return (
      <ProgressCircle
        aria-label={'Loading quizzess...'}
        alignSelf={'center'}
        marginX={'auto'}
        isIndeterminate
      />
    )
  } else {
    return <QuizzesTable {...props} quizzes={quizzes} />
  }
}
