import type { ServerData } from "../domain/server/entity/server";
import type { ServerService } from "../domain/server/useCase/serverServer";
import api from "./api";

export class ServerRepository implements ServerService{
  async getAll(params?: ServerData): Promise<ServerData[]> {
    const response = await api.get<ServerData[]>('/servers', { params });
    return response.data;
  }
}
