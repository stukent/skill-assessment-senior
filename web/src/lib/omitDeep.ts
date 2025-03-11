// Typescript type for OmitDeep to remove a set of keys from an object.
export type OmitDeep<T extends Record<string, any>, Keys extends string[]> = {
  [K in keyof T]: K extends Keys[number] ? never : T[K] extends object ? OmitDeep<T[K], Keys> : T[K]
}

export function omitDeep<T extends Record<string, any>, Keys extends string[]>(
  input: T[],
  excludeKeys: Keys,
): OmitDeep<T, Keys>[]
export function omitDeep<T extends Record<string, any>, Keys extends string[]>(
  input: T,
  excludeKeys: Keys,
): OmitDeep<T, Keys>
export function omitDeep<T extends Record<string, any>, Keys extends string[]>(
  input: T | T[],
  excludeKeys: Keys,
): OmitDeep<T, Keys> | OmitDeep<T, Keys>[] {
  if (Array.isArray(input)) {
    return input.map(item => omitDeep(item, excludeKeys))
  } else if (typeof input === 'object' && input) {
    const newResult: any = {}
    for (const key of Object.keys(input)) {
      if (!excludeKeys.includes(key)) {
        newResult[key] = omitDeep(input[key], excludeKeys)
      }
    }
    return newResult
  } else {
    return input
  }
}
