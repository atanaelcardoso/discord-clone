import { Request, Response } from 'express';
import { MessageService } from '../Services/MessagemService.js';

const messageService = new MessageService();

export class MessageController {
  public async getByChannel(req: Request, res: Response) {
    const data = await messageService.getByChannel(Number(req.params.channelId));
    res.json(data);
  }
  public async post(req: Request, res: Response) {
    const data = await messageService.create(req.body);
    res.status(201).json(data);
  }
  public async put(req: Request, res: Response) {
    const data = await messageService.update(Number(req.params.id), req.body);
    res.json(data);
  }
  public async delete(req: Request, res: Response) {
    await messageService.delete(Number(req.params.id));
    res.status(204).send();
  }
}
