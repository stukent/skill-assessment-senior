import { Heading } from '@adobe/react-spectrum'
import { useParams } from 'react-router-dom'

import { ViewSubmission } from '../submission/ViewSubmission'

export function ViewQuizSubmissionPage() {
  const { id } = useParams()
  if (!id) return null

  return (
    <>
      <Heading level={1}>View Submission</Heading>
      <ViewSubmission submissionId={id} />
    </>
  )
}
