import { randomString } from './utils'
import { User } from '../../models/User'

export async function createUser(payload?: Partial<User>) {
  return User.query().insertAndFetch({
    group: 'TEACHER',
    username: randomString(),
    password: 'test-password',
    ...payload,
  })
}
