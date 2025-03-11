import { HelpSquare, PageEdit } from 'iconoir-react'
import { Outlet } from 'react-router-dom'

import { UserGroup } from '../../schema'
import { useProtectedRoute } from '../auth/useProtectedRoute'
import { Shell } from '../shell/Shell'

export function TeacherShell() {
  useProtectedRoute([UserGroup.Teacher])
  return (
    <Shell
      leftNavItems={[
        { path: '/teacher/quizzes', icon: <HelpSquare />, label: 'Quizzes' },
        { path: '/teacher/quiz-submissions', icon: <PageEdit />, label: 'Submissions' },
      ]}
    >
      <Outlet />
    </Shell>
  )
}
