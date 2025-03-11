import { Navigate } from 'react-router-dom'

import { useViewer } from '../lib/auth/useViewer'

export function Root() {
  const viewer = useViewer()
  if (viewer) {
    return <Navigate to={`/${viewer.group.toLowerCase()}`} replace />
  } else {
    return <Navigate to={'/auth/login'} replace />
  }
}
