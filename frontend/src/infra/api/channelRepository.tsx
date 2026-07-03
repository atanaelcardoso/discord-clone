import type { MessageBackend } from "../domain/channel/entity/channel";
import type { channelService } from "../domain/channel/serverChannel";
import api from "./api"; 
export class ChannelRepository implements channelService {
  async getAll(params?: MessageBackend): Promise<MessageBackend[]> {
    const response = await api.get<MessageBackend[]>('/channels', { params });
    return response.data;
  }
}