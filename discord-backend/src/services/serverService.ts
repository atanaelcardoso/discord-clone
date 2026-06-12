import { ServerRepository } from '../repository/serverRepository.js';

const serverRepository = new ServerRepository();

export class ServerService {
  public async getAll() {
    return await serverRepository.findAll();
  }

  public async create(body: any) {
    const name = body.name;
    const ownerId = Number(body.ownerId);
    return await serverRepository.create(name, ownerId);
  }

  public async update(id: number, body: any) {
    return await serverRepository.update(id, {
      name: body.name,
      icon: body.icon
    });
  }

  public async patch(id: number, body: any) {
    return await serverRepository.update(id, {
      name: body.name
    });
  }

  public async delete(id: number) {
    await serverRepository.delete(id);
  }
}