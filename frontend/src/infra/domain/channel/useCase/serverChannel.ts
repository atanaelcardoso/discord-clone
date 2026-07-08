import { ChannelRepository } from "../../../api/channelRepository";
import type { MessageBackend } from "../entity/channel";

export interface IChannelRepository {
  getAll(): Promise<{ data: MessageBackend[] }>;
}

export interface ChannelService {
  getAll(params?: MessageBackend): Promise<MessageBackend[]>;
}

export class SuggestionService {
  private channelRepository = new ChannelRepository();

  async getAll(): Promise<{ data: MessageBackend[] }> {
    const channelsArray = await this.channelRepository.getAll();
    return { data: channelsArray };
  }
}
