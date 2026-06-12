import { prisma } from '../database/database.js';
import { UserService } from '../services/userService.js';
export class Message {
  public id: number;
  public content: string;
  public userId: number;
  public channelId: number;
  public user?: UserService;

  constructor(props: Message) {
    this.id = props.id;
    this.content = props.content;
    this.userId = props.userId;
    this.channelId = props.channelId;
    this.user = props.user;
  }
}

export class MessageRepository {
  public async findByChannel(channelId: number): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: { channelId },
      include: { user: true }
    });
    return messages.map(m => new Message(m));
  }

  public async create(content: string, userId: number, channelId: number): Promise<Message> {
    const messageEntity = await prisma.message.create({ data: { content, userId, channelId } });
    return new Message(messageEntity);
  }

  public async update(id: number, content: string): Promise<Message> {
    const messageEntity = await prisma.message.update({ where: { id }, data: { content } });
    return new Message(messageEntity);
  }

  public async delete(id: number): Promise<void> {
    await prisma.message.delete({ where: { id } });
  }
}