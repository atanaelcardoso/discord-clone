import { MessageRepository } from "../../../infra/repository/messageRepository.js";
import { Message } from "../entity/message.js";


const messageRepository = new MessageRepository();

export class MessageService {
  public async getByChannel(channelId: number) {
    return await messageRepository.findByChannel(channelId);
  }

  public async create(body: Message) {
    const content = body.content;
    const userId = Number(body.userId);
    const channelId = Number(body.channelId);
    return await messageRepository.create(content, userId, channelId);
  }

  public async update(id: number, body: Message) {
    return await messageRepository.update(id, body.content);
  }

  public async delete(id: number) {
    await messageRepository.delete(id);
  }
}