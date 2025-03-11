import { RouteObject } from 'react-router-dom'

import { AuthLayout } from '../lib/auth/AuthLayout'
import { Login } from '../lib/auth/Login'
import { Logout } from '../lib/auth/Logout'

export default {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'logout', element: <Logout /> },
  ],
} satisfies RouteObject
