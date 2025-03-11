import { Heading } from '@adobe/react-spectrum'

import { ListSubmissions } from '../submission/ListSubmissions'
import { SubmissionActions } from '../submission/SubmissionActions'

export function ListQuizSubmissionsPage() {
  return (
    <>
      <Heading level={1}>Submissions</Heading>
      <ListSubmissions actions={SubmissionActions} />
    </>
  )
}
