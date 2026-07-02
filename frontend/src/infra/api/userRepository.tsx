import type { User } from "../domain/user/entity/user";


export interface UserRepository {
  getUsers(): Promise<User[]>; 
}
