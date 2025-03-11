import { ProgressCircle } from '@adobe/react-spectrum'
import { useApolloClient } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { setAuthToken } from './useAuthToken'

export function Logout() {
  const navigate = useNavigate()
  const client = useApolloClient()
  React.useEffect(() => {
    setAuthToken(null)
    setTimeout(async () => {
      await client.resetStore()
      navigate('/')
    }, 1000)
  }, [])
  return (
    <div style={{ textAlign: 'center' }}>
      <ProgressCircle
        aria-label={'Logging out...'}
        alignSelf={'center'}
        marginX={'auto'}
        isIndeterminate
      />
    </div>
  )
}
