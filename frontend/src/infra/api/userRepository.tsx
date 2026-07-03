import type { User } from "../domain/user/entity/user";
import type { userService } from "../domain/user/serverUser";
import api from "./api";

export class UserRepository implements userService {
  async getAll(params?: User): Promise<User[]> {
    const response = await api.get<User[]>('/users', { params });
    return response.data;
  }
}
