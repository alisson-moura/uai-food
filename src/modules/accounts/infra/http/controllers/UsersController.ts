import { Request, Response } from "express";
import Joi from 'joi'
import HashProvider_Bcrypt from "../../../../../providers/HashProvider/HashProvider_Bcrypt";
import { CreateUserUseCase } from "../../../useCases/CreateUserUseCase";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

class UsersController {

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const schema = Joi.object({
      name: Joi.string().required().min(3).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().min(6)
    })
    const { error, value } = schema.validate(request.body)
    if (error) 
      return response.status(400).json({ message: error.message })

    const createUser = new CreateUserUseCase(UsersRepository, HashProvider_Bcrypt)
    await createUser.execute(name, email, password)
    return response.status(201).send()
  }
}
export default new UsersController()