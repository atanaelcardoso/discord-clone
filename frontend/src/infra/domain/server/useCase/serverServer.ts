import { ServerRepository } from "../../../api/serverRepository";
import type { ServerData } from "../entity/server";

export interface IServerRepository {
  getAll(): Promise<{ data: ServerData[] }>;
}

export interface ServerService {
  getAll(params?: ServerData): Promise<ServerData[]>;
}

export class SuggestionService {
  private serverRepository = new ServerRepository();

  async getAll(): Promise<{ data: ServerData[] }> {
    const serversArray = await this.serverRepository.getAll();
    return { data: serversArray };
  }
}
