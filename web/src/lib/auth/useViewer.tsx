import { InlineAlert, ProgressCircle } from '@adobe/react-spectrum'
import React from 'react'

import { UserFragment, useViewerQuery } from '../../schema'

export const ViewerContext = React.createContext<UserFragment | undefined>(undefined)

export function useViewer(require?: false): UserFragment | undefined
export function useViewer(require: true): UserFragment
export function useViewer(require?: boolean): UserFragment | undefined {
  const viewer = React.useContext(ViewerContext)
  if (!viewer && require) throw new Error('Viewer is required but not found.')
  return viewer
}

export interface ViewerProviderProps {
  children: React.ReactNode
}
export function ViewerProvider({ children }: ViewerProviderProps) {
  const { data, loading, error } = useViewerQuery()
  const viewer = data?.viewer ?? undefined
  if (loading) {
    return (
      <ProgressCircle
        aria-label={'Logging in...'}
        alignSelf={'center'}
        margin={'size-1000'}
        isIndeterminate
      />
    )
  } else if (error) {
    return (
      <InlineAlert margin={'size-1000'} variant={'negative'} alignSelf={'center'} width={400}>
        Failed to connect to the server.
      </InlineAlert>
    )
  } else {
    return <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
  }
}
