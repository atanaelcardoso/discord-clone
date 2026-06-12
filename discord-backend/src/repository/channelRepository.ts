import { prisma } from '../database/database.js';

import { ServerService } from '../services/serverService.js';
import { MessageService } from '../services/messagemService.js';
export class Channel {
  public id: number;
  public name: string;
  public type: string;
  public serverId: number;
  public server?: ServerService;
  public messages?: MessageService[];

  constructor(props: Channel) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.serverId = props.serverId;
    this.server = props.server;
    this.messages = props.messages;
  }
}

export class ChannelRepository {
  public async findAll(): Promise<Channel[]> {
    const channels = await prisma.channel.findMany();
    return channels.map(c => new Channel(c));
  }

  public async create(name: string, serverId: number, type: string): Promise<Channel> {
    const channelEntity = await prisma.channel.create({ data: { name, serverId, type } });
    return new Channel(channelEntity);
  }

  public async update(id: number, name: string, type: string): Promise<Channel> {
    const channelEntity = await prisma.channel.update({
      where: { id },
      data: { name, type }
    });

    return new Channel({
      id: channelEntity.id,
      name: channelEntity.name,
      type: channelEntity.type,
      serverId: channelEntity.serverId
    });
  }

  public async patch(id: number, name: string): Promise<Channel> {
    const channelEntity = await prisma.channel.update({ where: { id }, data: { name } });
    return new Channel(channelEntity);
  }

  public async delete(id: number): Promise<void> {
    await prisma.channel.delete({ where: { id } });
  }
}