import { log } from '../log.ts'
import { User } from '../models/User.ts'

export const ANONYMOUS = 'ANONYMOUS'
const permissions: Record<string, string[]> = {}

export function grantPermission(group: string, permission: string) {
  if (!permissions[group]) permissions[group] = []
  permissions[group].push(permission)
}

export async function hasPermission(user: User | null, permission: string): Promise<boolean> {
  const group = user?.group ?? ANONYMOUS
  const result = permissions[group]?.includes(permission) ?? false
  log('user %d %s permission %s', user?.id, result ? 'has' : 'does not have', permission)
  return result
}
