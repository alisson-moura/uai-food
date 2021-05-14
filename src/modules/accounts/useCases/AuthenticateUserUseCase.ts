import { AppError } from "../../../providers/AppError"
import { I_HashProvider } from "../../../providers/HashProvider/I_HashProvider"
import { I_TokenProvider } from "../../../providers/TokenProvider/I_TokenProvider"
import { I_UsersRepository } from "../repositories/I_UsersRepository"

interface I_Response {
  token: string
  user: {
    name: string
    email: string
    id: string
  }
}
class AuthenticateUserUseCase {
  private usersRepository: I_UsersRepository
  private hashProvider: I_HashProvider
  private tokenProvider: I_TokenProvider

  constructor(
    usersRepository: I_UsersRepository,
    hashProvider: I_HashProvider,
    tokenProvider: I_TokenProvider
  ) {
    this.usersRepository = usersRepository
    this.hashProvider = hashProvider
    this.tokenProvider = tokenProvider
  }

  async execute(email: string, password: string): Promise<I_Response> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('E-mail or password is invalid!', 401)
    }

    const passwordMatch = await this.hashProvider.decode(password, user.password)
    if (!passwordMatch) {
      throw new AppError('E-mail or password is invalid!', 401)
    }
    
    const token = this.tokenProvider.create(user.id)

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id
      }
    } as I_Response

  }
}

export { AuthenticateUserUseCase }