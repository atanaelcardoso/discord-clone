import { Request, Response } from 'express';
import { ChannelService } from '../../../domain/channel/useCase/channelService.ts';

const channelService = new ChannelService();

export class ChannelController {
  public async get(req: Request, res: Response) {
    const data = await channelService.getAll();
    res.json(data);
  }
  public async post(req: Request, res: Response) {
    const data = await channelService.create(req.body);
    res.status(201).json(data);
  }
  public async put(req: Request, res: Response) {
    const data = await channelService.update(Number(req.params.id), req.body);
    res.json(data);
  }
  public async patch(req: Request, res: Response) {
    const data = await channelService.patch(Number(req.params.id), req.body);
    res.json(data);
  }
  public async delete(req: Request, res: Response) {
    await channelService.delete(Number(req.params.id));
    res.status(204).send();
  }
}
