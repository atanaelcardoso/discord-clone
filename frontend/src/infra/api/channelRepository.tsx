import type { MessageBackend } from "../domain/channel/entity/channel";

export interface ChannelRepository {
    getChannels(): Promise<MessageBackend[]>;
}