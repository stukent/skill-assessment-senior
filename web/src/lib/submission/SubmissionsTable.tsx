import { Cell, Column, Row, TableBody, TableHeader, TableView } from '@adobe/react-spectrum'

import { QuizSubmissionFragment } from '../../schema'
import { TableEmptyState } from '../TableEmptyState'

export interface QuizSubmissionActionsProps {
  quizSubmission: QuizSubmissionFragment
}
export interface QuizSubmissionsTableProps {
  quizSubmissions: QuizSubmissionFragment[]
  actions: (props: QuizSubmissionActionsProps) => React.ReactNode
  usersColumn?: boolean
}
export function QuizSubmissionsTable({
  quizSubmissions,
  usersColumn,
  actions: Actions,
}: QuizSubmissionsTableProps) {
  return (
    <TableView
      aria-label={'Quiz Submissions'}
      renderEmptyState={() => <TableEmptyState children={'No quiz submissions found.'} />}
      minHeight={400}
    >
      <TableHeader>
        {[
          <Column key={'name'}>Name</Column>,
          ...(usersColumn ? [<Column key={'user'}>User</Column>] : []),
          <Column key={'grade'} width={150}>
            Grade
          </Column>,
          <Column key={'actions'} width={200}>
            Actions
          </Column>,
        ]}
      </TableHeader>
      <TableBody items={quizSubmissions}>
        {quizSubmission => {
          return (
            <Row key={quizSubmission.id}>
              {[
                <Cell key={`${quizSubmission.id}-name`}>{quizSubmission.quiz.name}</Cell>,
                ...(usersColumn
                  ? [<Cell key={`${quizSubmission.id}-user`}>{quizSubmission.user.username}</Cell>]
                  : []),
                <Cell key={`${quizSubmission.id}-grade`}>{quizSubmission.grade}</Cell>,
                <Cell key={`${quizSubmission.id}-actions`}>
                  <Actions quizSubmission={quizSubmission} />
                </Cell>,
              ]}
            </Row>
          )
        }}
      </TableBody>
    </TableView>
  )
}
