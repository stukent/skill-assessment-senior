import { Navigate, RouteObject } from 'react-router-dom'

import { CreateQuizPage } from '../lib/teacher/CreateQuizPage'
import { EditQuizPage } from '../lib/teacher/EditQuizPage'
import { ListQuizSubmissionsPage } from '../lib/teacher/ListQuizSubmissionsPage'
import { ListQuizzesPage } from '../lib/teacher/ListQuizzesPage'
import { TeacherShell } from '../lib/teacher/TeacherShell'
import { ViewQuizSubmissionPage } from '../lib/teacher/ViewQuizSubmissionPage'

export default {
  path: 'teacher',
  element: <TeacherShell />,
  children: [
    { path: '', element: <Navigate to={'quizzes'} /> },
    { path: 'quizzes/create', element: <CreateQuizPage /> },
    { path: 'quizzes/:id', element: <EditQuizPage /> },
    { path: 'quizzes', element: <ListQuizzesPage /> },
    { path: 'quiz-submissions', element: <ListQuizSubmissionsPage /> },
    { path: 'quiz-submissions/:id', element: <ViewQuizSubmissionPage /> },
  ],
} satisfies RouteObject
