/*
import { Request, Response } from "express";
import Joi from 'joi'
import { HashProvider_BCrypt } from "../../../../../providers/HashProvider/HashProvider_Bcrypt";
import { I_HashProvider } from "../../../../../providers/HashProvider/I_HashProvider";
import { I_TokenProvider } from "../../../../../providers/TokenProvider/I_TokenProvider";
import { TokenProvider_JWT } from "../../../../../providers/TokenProvider/TokenProvider_JWT";
import { I_UsersRepository } from "../../../repositories/I_UsersRepository";
import { CreateSessionUseCase } from "../../../useCases/CreateSessionUseCase";
import { UsersRepository } from "../../typeorm/repositories/UsersRepository";

class SessionController {
  private usersRepository: I_UsersRepository
  private hashProvider: I_HashProvider
  private tokenProvider: I_TokenProvider

  constructor() {
    this.usersRepository = new UsersRepository()
    this.hashProvider = new HashProvider_BCrypt()
    this.tokenProvider = new TokenProvider_JWT()
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
    const { error, value } = schema.validate(request.body)
    if (error)
      return response.status(400).json({ message: error.message })

    const createSession = new CreateSessionUseCase(this.usersRepository, this.hashProvider, this.tokenProvider)
    const result = await createSession.execute(email, password)
    return response.status(201).json(result)
  }
}
export { SessionController }
*/