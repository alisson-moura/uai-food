import { AppError } from "../../providers/AppError"
import { User } from "../../modules/accounts/infra/typeorm/entities/User"
import { Fake_UsersRepository } from "../../modules/accounts/repositories/fake-repositories/Fake_UsersRepository"
import { I_UsersRepository } from "../../modules/accounts/repositories/I_UsersRepository"
import { AuthenticateUserUseCase } from "../../modules/accounts/useCases/AuthenticateUserUseCase"
import { I_HashProvider } from "../../providers/HashProvider/I_HashProvider"
import HashProvider_BCrypt from "../../providers/HashProvider/HashProvider_Bcrypt"
import { I_TokenProvider } from "../../providers/TokenProvider/I_TokenProvider"
import TokenProvider_JWT from "../../providers/TokenProvider/TokenProvider_JWT"

let usersRepository: I_UsersRepository
let createSessionUseCase: AuthenticateUserUseCase
let hashProvider: I_HashProvider
let tokenProvider: I_TokenProvider

describe('Teste Unitário de Criação de Sessão', () => {
  beforeEach(async () => {
    usersRepository = new Fake_UsersRepository()
    hashProvider = HashProvider_BCrypt
    tokenProvider = TokenProvider_JWT
    createSessionUseCase = new AuthenticateUserUseCase(usersRepository, hashProvider, tokenProvider)
    await usersRepository.create('John Doe', 'john@mail.com', await hashProvider.cripto('123456'))
  })

  test('Deve ser possivel realizar uma nova sessão/autenticação na API', async () => {
    const result = await createSessionUseCase.execute('john@mail.com', '123456')
    expect(result.user).toHaveProperty('id')
    expect(result).toHaveProperty('token')
  })

  test('Não deve ser possivel realizar uma nova sessão com um email inválido', async () => {
    await expect(createSessionUseCase.execute('invalid_mail@mail.com', '123456')).rejects.toEqual(new AppError('E-mail or password is invalid!', 401))
  })

  test('Não deve ser possivel realizar uma nova sessão com uma senha inválido', async () => {
    await expect(createSessionUseCase.execute('john@mail.com', 'invalid_password')).rejects.toEqual(new AppError('E-mail or password is invalid!', 401))
  })
})