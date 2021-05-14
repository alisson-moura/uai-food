import { getRepository, Repository } from "typeorm";
import { I_UsersRepository } from "../../../repositories/I_UsersRepository";
import { User } from "../entities/User";

class UsersRepository implements I_UsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const user = this.repository.create({ name, email, password })
    await this.repository.save(user)
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email
      }
    })
    return user
  }

}

export default new UsersRepository()