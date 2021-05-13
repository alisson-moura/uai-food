import { AppError } from "../../../providers/AppError"
import { I_HashProvider } from "../../../providers/HashProvider/I_HashProvider"
import { I_UsersRepository } from "../repositories/I_UsersRepository"

class CreateUserUseCase {
  private usersRepository: I_UsersRepository
  private hashProvider: I_HashProvider

  constructor(
    usersRepository: I_UsersRepository,
    hashProvider: I_HashProvider
  ) {
    this.usersRepository = usersRepository
    this.hashProvider = hashProvider
  }

  async execute(name: string, email: string, password: string) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) {
      throw new AppError('E-mail already in use', 400)
    }
    const hashedPassword = await this.hashProvider.cripto(password)
    await this.usersRepository.create(name, email, hashedPassword)
  }
}

export { CreateUserUseCase }