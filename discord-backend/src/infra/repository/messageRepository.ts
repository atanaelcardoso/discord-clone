import { prisma } from '../database/database.ts';
import { Message } from '../../types/index.ts';
import type { PublicUser } from '../../domain/user/entity/user.ts';

export class MessageRepository {
  public async findByChannel(channelId: number): Promise<Array<Message & { user: PublicUser }>> {
    const messages = await prisma.message.findMany({
      where: { channelId },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
            isBot: true,
            email: true
          }
        }
      }
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