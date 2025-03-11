import React from 'react'

const TOKEN_KEY = 'auth-token'

export function getAuthToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(value: string | null) {
  if (value) {
    sessionStorage.setItem(TOKEN_KEY, value)
  } else {
    sessionStorage.removeItem(TOKEN_KEY)
  }
}

export function useAuthToken(): [string | null, (value: string | null) => void] {
  const [authToken, _setAuthToken] = React.useState(getAuthToken())
  return [
    authToken,
    value => {
      _setAuthToken(value)
      setAuthToken(value)
    },
  ]
}
