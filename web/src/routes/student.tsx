import { Navigate, RouteObject } from 'react-router-dom'

import { ListQuizSubmissionsPage } from '../lib/student/ListQuizSubmissionsPage'
import { ListQuizzesPage } from '../lib/student/ListQuizzesPage'
import { StudentShell } from '../lib/student/StudentShell'
import { TakeQuizPage } from '../lib/student/TakeQuizPage'
import { ViewQuizSubmissionPage } from '../lib/student/ViewQuizSubmissionPage'

export default {
  path: 'student',
  element: <StudentShell />,
  children: [
    { path: '', element: <Navigate to={'quizzes'} /> },
    { path: 'quizzes', element: <ListQuizzesPage /> },
    { path: 'quizzes/:id', element: <TakeQuizPage /> },
    { path: 'quiz-submissions', element: <ListQuizSubmissionsPage /> },
    { path: 'quiz-submissions/:id', element: <ViewQuizSubmissionPage /> },
  ],
} satisfies RouteObject
