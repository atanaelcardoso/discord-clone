import { RoleRepository } from '../repository/roleRepository.js';

const roleRepository = new RoleRepository();

export class RoleService {
  public async getByServer(serverId: number) {
    return await roleRepository.findByServer(serverId);
  }

  public async create(body: any) {
    const name = body.name;
    const color = body.color || '#8a8c90';
    const serverId = Number(body.serverId);
    const hoist = body.hoist || false;

    return await roleRepository.create(name, color, serverId, hoist);
  }

  public async update(id: number, body: any) {
    return await roleRepository.update(id, {
      name: body.name,
      color: body.color,
      hoist: body.hoist
    });
  }

  public async patch(id: number, body: any) {
    return await roleRepository.patch(id, {
      name: body.name,
      color: body.color
    });
  }

  public async delete(id: number) {
    await roleRepository.delete(id);
  }
}
