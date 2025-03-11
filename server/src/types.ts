import { User } from './models/User'

export interface Context {
  user: User | { group: 'ANONYMOUS' }
}

export function isUser(user: Context['user']): user is User {
  return (user as User).group !== 'ANONYMOUS'
}

export interface TokenPayload {
  id: string | number
}
