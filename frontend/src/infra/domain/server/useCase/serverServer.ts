import api from "../../../api/api";
import type { serverRepository } from "../../../api/serverRepository";
import type { ServerData } from "../entity/server";

export class apiServerRepository implements serverRepository {
  async getServer(): Promise<ServerData[]> {
    const response = await api.get<ServerData[]>("/servers");
    return response.data;
  }
}
