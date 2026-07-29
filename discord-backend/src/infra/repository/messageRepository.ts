import { prisma } from '../database/database.ts';
import { Message } from '../../types/index.ts';

export class MessageRepository {
  public async findByChannel(channelId: number): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: { channelId },
      include: { user: true }
    });
    return messages;
  }

  public async create(content: string, userId: number, channelId: number): Promise<Message> {
    const messageEntity = await prisma.message.create({ data: { content, userId, channelId } });
    return messageEntity;
  }

  public async update(id: number, content: string): Promise<Message> {
    const messageEntity = await prisma.message.update({ where: { id }, data: { content } });
    return messageEntity;
  }

  public async delete(id: number): Promise<void> {
    await prisma.message.delete({ where: { id } });
  }
}