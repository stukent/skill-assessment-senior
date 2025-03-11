import { createBrowserRouter } from 'react-router-dom'

import { Root } from './Root'
import auth from './auth'
import student from './student'
import teacher from './teacher'
import { ErrorPage } from '../lib/ErrorPage'

export default createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [{ path: '/', element: <Root /> }, auth, teacher, student],
  },
])
