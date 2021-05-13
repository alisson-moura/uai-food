interface I_TokenProvider {
  create(user_id: string): string
  decode(token: string): null | I_TokenPayload
}
interface I_TokenPayload {
  sub: string
  exp: Date
  iat: Date
}

export {I_TokenProvider, I_TokenPayload}