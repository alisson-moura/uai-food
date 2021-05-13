import { I_UsersRepository } from "../../../repositories/I_UsersRepository";
import { User } from "../entities/User";

class UsersRepository implements I_UsersRepository {
  create(name: string, email: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findByEmail(name: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
}

export {UsersRepository}