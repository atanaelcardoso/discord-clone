import { MessageRepository } from '../repository/messageRepository.js';

const messageRepository = new MessageRepository();

export class MessageService {
  public async getByChannel(channelId: number) {
    return await messageRepository.findByChannel(channelId);
  }

  public async create(body: any) {
    const content = body.content;
    const userId = Number(body.userId);
    const channelId = Number(body.channelId);
    return await messageRepository.create(content, userId, channelId);
  }

  public async update(id: number, body: any) {
    return await messageRepository.update(id, body.content);
  }

  public async delete(id: number) {
    await messageRepository.delete(id);
  }
}