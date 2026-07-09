import type { AxiosInstance } from "axios";
import type { User } from "../domain/user/entity/user";
import type { UserService } from "../domain/user/useCase/serverUser";

export class UserRepository implements UserService {

   api: AxiosInstance;
  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  async getAll(params?: User): Promise<User[]> {
    const response = await this.api.get<User[]>('/users', { params });
    return response.data;
  }
}
