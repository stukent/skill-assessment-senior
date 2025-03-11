import { Cell, Column, Row, TableBody, TableHeader, TableView } from '@adobe/react-spectrum'

import { QuizFragment } from '../../schema'
import { TableEmptyState } from '../TableEmptyState'

export interface QuizActionsProps {
  quiz: QuizFragment
}
export interface QuizzesTableProps {
  quizzes: QuizFragment[]
  actions: (props: QuizActionsProps) => React.ReactNode
}
export function QuizzesTable({ quizzes, actions: Actions }: QuizzesTableProps) {
  return (
    <TableView
      aria-label={'Quizzes'}
      renderEmptyState={() => <TableEmptyState children={'No quizzes found.'} />}
      minHeight={400}
    >
      <TableHeader>
        <Column>Name</Column>
        <Column width={150}>Questions</Column>
        <Column width={200}>Actions</Column>
      </TableHeader>
      <TableBody items={quizzes}>
        {quiz => {
          return (
            <Row key={quiz.id}>
              <Cell>{quiz.name}</Cell>
              <Cell>{quiz.configuration.questions.length}</Cell>
              <Cell>
                <Actions quiz={quiz} />
              </Cell>
            </Row>
          )
        }}
      </TableBody>
    </TableView>
  )
}
