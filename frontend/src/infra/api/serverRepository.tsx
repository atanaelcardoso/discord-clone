import type { AxiosInstance } from "axios";
import type { ServerData } from "../domain/server/entity/server";
import type { ServerService } from "../domain/server/useCase/serverServer";

export class ServerRepository implements ServerService{

  api: AxiosInstance;
  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  async getAll(params?: ServerData): Promise<ServerData[]> {
    const response = await this.api.get<ServerData[]>('/servers', { params });
    return response.data;
  }
}
