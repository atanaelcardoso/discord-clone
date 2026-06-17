import { prisma } from '../database/database.js';
import { Channel } from '../../domain/channel/entity/channel.js';
import { ChannelType } from '../../domain/channel/entity/channel.js';


export class ChannelRepository {
  public async findAll(): Promise<Channel[]> {
    const channels = await prisma.channel.findMany();
    return channels as Channel[];
  }

  public async create(name: string, serverId: number, type: ChannelType): Promise<Channel> {
    const channelEntity = await prisma.channel.create({ data: { name, serverId, type } });
    return channelEntity as Channel;
  }

  public async update(id: number, name: string, type: ChannelType): Promise<Channel> {
    const channelEntity = await prisma.channel.update({
      where: { id },
      data: { name, type }
    });

    return channelEntity as Channel;
  }

  public async patch(id: number, name: string): Promise<Channel> {
    const channelEntity = await prisma.channel.update({ where: { id }, data: { name } });
    return channelEntity as Channel;
  }

  public async delete(id: number): Promise<void> {
    await prisma.channel.delete({ where: { id } });
  }
}