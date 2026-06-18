import { Request, Response } from 'express';
import { ServerService } from '../../../domain/server/useCase/serverService.ts';

const serverService = new ServerService();

export class ServerController {
  public async get(req: Request, res: Response) {
    const data = await serverService.getAll();
    res.json(data);
  }
  public async post(req: Request, res: Response) {
    const data = await serverService.create(req.body);
    res.status(201).json(data);
  }
  public async put(req: Request, res: Response) {
    const data = await serverService.update(Number(req.params.id), req.body);
    res.json(data);
  }
  public async patch(req: Request, res: Response) {
    const data = await serverService.patch(Number(req.params.id), req.body);
    res.json(data);
  }
  public async delete(req: Request, res: Response) {
    await serverService.delete(Number(req.params.id));
    res.status(204).send();
  }
}
