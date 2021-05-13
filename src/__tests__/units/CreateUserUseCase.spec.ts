import { AppError } from "../../providers/AppError"
import { User } from "../../modules/accounts/infra/typeorm/entities/User"
import { Fake_UsersRepository } from "../../modules/accounts/repositories/fake-repositories/Fake_UsersRepository"
import { I_UsersRepository } from "../../modules/accounts/repositories/I_UsersRepository"
import { CreateUserUseCase } from "../../modules/accounts/useCases/CreateUserUseCase"
import { I_HashProvider } from "../../providers/HashProvider/I_HashProvider"
import { HashProvider_BCrypt } from "../../providers/HashProvider/HashProvider_Bcrypt"

let usersRepository: I_UsersRepository
let createUserUseCase: CreateUserUseCase
let hashProvider: I_HashProvider


describe('Teste Unitário de Criação de usuário', () => {
  beforeEach(async () => {
    usersRepository = new Fake_UsersRepository()
    hashProvider = new HashProvider_BCrypt()
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider)
  })

  test('Deve ser possivel criar um usuário', async () => {
    await createUserUseCase.execute('John Doe', 'john@mail.com', 'valid_password')
    const user = await usersRepository.findByEmail('john@mail.com')
    expect(user.name).toBe('John Doe')
    expect(user).toHaveProperty('id')
  })

  test('Não deve ser possivel criar um usuário com um email já existente', async () => {
    await createUserUseCase.execute('John Doe', 'john@mail.com', 'valid_password') // user 01
    await expect(createUserUseCase.execute('John Doe 2', 'john@mail.com', 'valid_password')).rejects.toEqual(new AppError('E-mail already in use', 400))
  })

  test('A senha deve ser criptografada', async () => {
    await createUserUseCase.execute('John Doe', 'john@mail.com', 'valid_password')
    const user = await usersRepository.findByEmail('john@mail.com')
    await expect(hashProvider.decode('valid_password', user.password)).resolves.toBe(true)
  })
})