import { UserRepository } from "../../../api/userRepository";
import type { User } from "../entity/user";

export interface IUserRepository {
  getAll(): Promise<{ data: User[] }>;
}
export interface UserService {
  getAll(params?: User): Promise<User[]>;
}

export class SuggestionService {
  private userRepository = new UserRepository();

  async getAll(): Promise<{ data: User[] }> {
    const usersArray = await this.userRepository.getAll();
    return { data: usersArray };
  }
}
