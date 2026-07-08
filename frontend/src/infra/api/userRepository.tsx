import type { User } from "../domain/user/entity/user";
import type { UserService } from "../domain/user/useCase/serverUser";
import api from "./api";

export class UserRepository implements UserService {
  async getAll(params?: User): Promise<User[]> {
    const response = await api.get<User[]>('/users', { params });
    return response.data;
  }
}
