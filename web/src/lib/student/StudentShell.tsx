import { HelpSquare, PageEdit } from 'iconoir-react'
import { Outlet } from 'react-router-dom'

import { UserGroup } from '../../schema'
import { useProtectedRoute } from '../auth/useProtectedRoute'
import { Shell } from '../shell/Shell'

export function StudentShell() {
  useProtectedRoute([UserGroup.Student])
  return (
    <Shell
      leftNavItems={[
        { path: '/student/quizzes', icon: <HelpSquare />, label: 'Quizzes' },
        { path: '/student/quiz-submissions', icon: <PageEdit />, label: 'Submissions' },
      ]}
    >
      <Outlet />
    </Shell>
  )
}
