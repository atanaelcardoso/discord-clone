import api from "../../../api/api";
import type { ChannelRepository } from "../../../api/channelRepository";
import type { MessageBackend } from "../entity/channel";

export class apiChannelRepository implements ChannelRepository {
  async getChannels(): Promise<MessageBackend[]> {
    const response = await api.get<MessageBackend[]>("/channels");
    return response.data;
  }
}
