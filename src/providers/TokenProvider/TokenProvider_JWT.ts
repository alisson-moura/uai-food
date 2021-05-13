import { sign, verify } from "jsonwebtoken";
import { I_TokenProvider, I_TokenPayload } from "./I_TokenProvider";
import authConfig from '../../config/auth'

class TokenProvider_JWT implements I_TokenProvider {

  decode(token: string): null | I_TokenPayload {
    const decoded = verify(token, authConfig.secret) as I_TokenPayload
    return decoded
  }
  
  create(user_id: string): string {
    const token = sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
      subject: user_id
    })
    return token
  }

}
export { TokenProvider_JWT }