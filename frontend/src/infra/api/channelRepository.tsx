import type { MessageBackend } from "../domain/channel/entity/channel";
import type { ChannelService } from "../domain/channel/useCase/serverChannel";
import api from "./api"; 
export class ChannelRepository implements ChannelService {
  async getAll(params?: MessageBackend): Promise<MessageBackend[]> {
    const response = await api.get<MessageBackend[]>('/channels', { params });
    return response.data;
  }
}