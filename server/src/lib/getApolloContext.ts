import { IncomingMessage } from 'http'

import { verify } from './jwt.ts'
import { User } from '../models/User.ts'
import { Context, TokenPayload } from '../types.ts'

export async function getApolloContext(req: IncomingMessage): Promise<Context> {
  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) {
    const jwt = authHeader.split(' ')[1]
    const { id } = await verify<TokenPayload>(jwt)
    if (!id) throw new Error('JWT is invalid.')
    return { user: await User.query().findById(id).throwIfNotFound() }
  } else {
    return { user: { group: 'ANONYMOUS' } }
  }
}
