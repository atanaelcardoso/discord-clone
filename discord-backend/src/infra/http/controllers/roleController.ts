import { Request, Response } from 'express';
import { RoleService } from '../../../domain/services/roleService.js';

const roleService = new RoleService();

export class RoleController {
  public async getByServer(req: Request, res: Response) {
    const data = await roleService.getByServer(Number(req.params.serverId));
    res.json(data);
  }
  public async post(req: Request, res: Response) {
    const data = await roleService.create(req.body);
    res.status(201).json(data);
  }
  public async put(req: Request, res: Response) {
    const data = await roleService.update(Number(req.params.id), req.body);
    res.json(data);
  }
  public async patch(req: Request, res: Response) {
    const data = await roleService.patch(Number(req.params.id), req.body);
    res.json(data);
  }
  public async delete(req: Request, res: Response) {
    await roleService.delete(Number(req.params.id));
    res.status(204).send();
  }
}
