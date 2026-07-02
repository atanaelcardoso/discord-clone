import api from "../../../api/api";
import type { UserRepository } from "../../../api/userRepository";
import type { User } from "../entity/user";

export class ApiUserRepository implements UserRepository {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/users");
    return response.data;
  }
}
