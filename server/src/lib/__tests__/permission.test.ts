import { User } from '../../models/User'
import { createUser } from '../../test/factory/User'
import { ANONYMOUS, grantPermission, hasPermission } from '../permission'

describe('#hasPermission()', () => {
  let user: User
  beforeEach(async () => {
    user = await createUser({ group: 'TEACHER' })
  })

  it('returns true if the user has the permission', async () => {
    grantPermission('TEACHER', 'TESTING')
    expect(await hasPermission(user, 'TESTING')).toBe(true)
  })
  it('returns false if the user does not have the permission', async () => {
    grantPermission('TEACHER', 'TESTING')
    expect(await hasPermission(user, 'SOMETHING')).toBe(false)
  })
  it('defaults to anonymous', async () => {
    grantPermission(ANONYMOUS, 'TESTING')
    expect(await hasPermission(undefined, 'TESTING')).toBe(true)
  })
})
