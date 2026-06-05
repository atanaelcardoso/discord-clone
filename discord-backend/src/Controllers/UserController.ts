import { Request, Response } from 'express';
import { UserService } from '../Services/userService.js';

const userService = new UserService();

export class UserController {
  public async get(req: Request, res: Response) {
    const data = await userService.getAll();
    res.json(data);
  }
  public async post(req: Request, res: Response) {
    const data = await userService.create(req.body);
    res.status(201).json(data);
  }
  public async put(req: Request, res: Response) {
    const data = await userService.update(Number(req.params.id), req.body);
    res.json(data);
  }
  public async delete(req: Request, res: Response) {
    await userService.delete(Number(req.params.id));
    res.status(204).send();
  }
}

