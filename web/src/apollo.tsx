import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getAuthToken } from './lib/auth/useAuthToken'
import { log } from './log'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})
const authLink = setContext((_, { headers }) => {
  const token = getAuthToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
const logLink = new ApolloLink((operation, forward) => {
  log('QUERY %s', operation.operationName)
  if (Object.keys(operation.variables ?? {}).length) log(operation.variables)
  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(logLink).concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
