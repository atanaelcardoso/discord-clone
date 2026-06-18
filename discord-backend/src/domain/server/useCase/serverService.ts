import { ServerRepository } from '../../../infra/repository/serverRepository.ts';
import { Server } from '../entity/server.ts';

const serverRepository = new ServerRepository();

export class ServerService {
  public async getAll() {
    return await serverRepository.findAll();
  }

  public async create(body: Server) {
    const name = body.name;
    const ownerId = Number(body.ownerId);
    return await serverRepository.create(name, ownerId);
  }

  public async update(id: number, body: Server) {
    return await serverRepository.update(id, {
      name: body.name,
      icon: body.icon
    });
  }

  public async patch(id: number, body: Server) {
    return await serverRepository.update(id, {
      name: body.name
    });
  }

  public async delete(id: number) {
    await serverRepository.delete(id);
  }
}