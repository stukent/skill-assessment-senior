import { defaultTheme, Provider } from '@adobe/react-spectrum'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from '@react-spectrum/toast'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router-dom'

import apollo from './apollo'
import { ErrorPage } from './lib/ErrorPage'
import { ViewerProvider } from './lib/auth/useViewer'
import router from './routes'

export default function App() {
  return (
    <Provider theme={defaultTheme} router={{ navigate: router.navigate }}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <ApolloProvider client={apollo}>
          <ToastContainer />
          <ViewerProvider>
            <RouterProvider router={router} />
          </ViewerProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </Provider>
  )
}
