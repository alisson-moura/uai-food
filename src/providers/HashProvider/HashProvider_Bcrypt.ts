import { hash, compare } from 'bcrypt'
import { I_HashProvider } from "./I_HashProvider";

class HashProvider_BCrypt implements I_HashProvider {
  async cripto(password: string): Promise<string> {
    return hash(password, 8)
  }

  async decode(password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
  } 

}
export { HashProvider_BCrypt }