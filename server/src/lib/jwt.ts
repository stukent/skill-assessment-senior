import jwt, { SignOptions, VerifyOptions, DecodeOptions } from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export const sign = <T extends object = object>(
  data: T,
  secret: string = SECRET,
  options: SignOptions = {},
): string => {
  return jwt.sign(data, secret, options)
}

export const verify = <T extends object>(
  token: string,
  secret: string = SECRET,
  options: VerifyOptions = {},
) => {
  return jwt.verify(token, secret, options) as T
}

export const decode = (token: string, options: DecodeOptions = {}) => {
  return jwt.decode(token, options)
}
