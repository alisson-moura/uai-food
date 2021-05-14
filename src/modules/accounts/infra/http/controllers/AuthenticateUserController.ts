
import { Request, Response } from "express";
import Joi from 'joi'
import HashProvider_BCrypt from "../../../../../providers/HashProvider/HashProvider_Bcrypt";
import TokenProvider_JWT from "../../../../../providers/TokenProvider/TokenProvider_JWT";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import { AuthenticateUserUseCase } from '../../../useCases/AuthenticateUserUseCase'

class AuthenticateUserController {

  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
    const { error, value } = schema.validate(request.body)
    if (error)
      return response.status(400).json({ message: error.message })

    const authenticateUser = new AuthenticateUserUseCase(UsersRepository, HashProvider_BCrypt, TokenProvider_JWT)
    const result = await authenticateUser.execute(email, password)
    return response.status(201).json(result)
  }
}
export default new AuthenticateUserController()
