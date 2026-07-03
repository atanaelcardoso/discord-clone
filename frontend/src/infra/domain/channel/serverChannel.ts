import { ChannelRepository } from "../../api/channelRepository";
import type { MessageBackend } from "./entity/channel";

export interface IChannelRepository {
  getAll(): Promise<{ data: MessageBackend[] }>;
}

export interface channelService {
  getAll(params?: MessageBackend): Promise<MessageBackend[]>;
}

export class suggestionservice {
  private channelRepository = new ChannelRepository();

  async getAll(): Promise<{ data: MessageBackend[] }> {
    const channelsArray = await this.channelRepository.getAll();
    return { data: channelsArray };
  }
}
