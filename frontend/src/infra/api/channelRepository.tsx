import type { AxiosInstance } from "axios";
import type { MessageBackend } from "../domain/channel/entity/channel";
import type { ChannelService } from "../domain/channel/useCase/serverChannel";
export class ChannelRepository implements ChannelService {

  api: AxiosInstance;
  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }
  async getAll(params?: MessageBackend): Promise<MessageBackend[]> {
    const response = await this.api.get<MessageBackend[]>('/channels', { params });
    return response.data;
  }

  async getMessages(channelId: number): Promise<MessageBackend[]> {
    const response = await this.api.get<MessageBackend[]>(`/messages/${channelId}`);
    return response.data;
  }

  async sendMessage(message: { content: string; userId: number; channelId: number }): Promise<MessageBackend> {
    const response = await this.api.post<MessageBackend>('/messages', message);
    return response.data;
  }
}