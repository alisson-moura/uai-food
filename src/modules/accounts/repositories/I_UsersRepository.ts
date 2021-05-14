import { User } from "../infra/typeorm/entities/User";

interface I_UsersRepository {
  create(name: string, email: string, password: string): Promise<User>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
}
export { I_UsersRepository }