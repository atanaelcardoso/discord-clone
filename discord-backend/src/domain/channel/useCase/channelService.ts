import { ChannelRepository } from '../../../infra/repository/channelRepository.ts';
import { Channel } from '../entity/channel.ts';

const channelRepository = new ChannelRepository();

export class ChannelService {
  public async getAll() {
    return await channelRepository.findAll();
  }

  public async create(body: Channel) {
    const name = body.name;
    const serverId = Number(body.serverId);
    const type = body.type || 'TEXT';
    return await channelRepository.create(name, serverId, type);
  }

  public async update(id: number, body: Channel) {
    try {
      const channelUpdated = await channelRepository.update(id, body.name, body.type);
      return channelUpdated;
    } catch (error) {
      throw new Error(`Error updating the channel: ${(error as Error).message}`);
    }
  }

  public async patch(id: number, body: Channel) {
    return await channelRepository.patch(id, body.name);
  }

  public async delete(id: number) {
    await channelRepository.delete(id);
  }
}