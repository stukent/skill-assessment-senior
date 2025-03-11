import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useViewer } from './useViewer'
import { log } from '../../log'
import { UserGroup } from '../../schema'

export function useProtectedRoute(group: UserGroup[] | null) {
  const { group: userGroup } = useViewer() ?? {}
  const navigate = useNavigate()
  React.useEffect(() => {
    if ((userGroup && (!group || !group.includes(userGroup))) || (!userGroup && group)) {
      log('navigating back to home because of useProtectedRoute()')
      navigate('/')
    }
  }, [userGroup, group])
}
