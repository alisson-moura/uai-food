import crypto from 'crypto'

import { User } from "../../infra/typeorm/entities/User";
import { I_UsersRepository } from "../I_UsersRepository";

class Fake_UsersRepository implements I_UsersRepository {
  private users: User[] = []

  async create(name: string, email: string, password: string): Promise<void> {
    const user = new User()
    Object.assign(user, {
      name,
      email,
      password,
      id: crypto.randomBytes(16).toString("hex"),
      created_at: new Date
    })
    this.users.push(user)
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)
    return user
  }

}
export { Fake_UsersRepository }