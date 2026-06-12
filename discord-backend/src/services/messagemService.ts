import { prisma } from '../database/database.js';

export class MessageService {
  public async getByChannel(channelId: number) {
    return await prisma.message.findMany({
      where: { channelId },
      include: { user: true }
    });
  }

  public async create(body: any) {
    return await prisma.message.create({
      data: { content: body.content, userId: Number(body.userId), channelId: Number(body.channelId) }
    });
  }

  public async update(id: number, body: any) {
    return await prisma.message.update({
      where: { id },
      data: { content: body.content }
    });
  }

  public async delete(id: number) {
    return await prisma.message.delete({ where: { id } });
  }
}
