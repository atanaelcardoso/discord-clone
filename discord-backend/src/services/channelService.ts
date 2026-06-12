import { prisma } from '../database/database.js';

export class ChannelService {
  public async getAll() {
    return await prisma.channel.findMany();
  }

  public async create(body: any) {
    return await prisma.channel.create({
      data: { name: body.name, serverId: Number(body.serverId), type: body.type || 'TEXT' }
    });
  }

  public async update(id: number, body: any) {
    return await prisma.channel.update({
      where: { id },
      data: { name: body.name, type: body.type }
    });
  }

  public async patch(id: number, body: any) {
    return await prisma.channel.update({
      where: { id },
      data: { name: body.name }
    });
  }

  public async delete(id: number) {
    return await prisma.channel.delete({ where: { id } });
  }
}
