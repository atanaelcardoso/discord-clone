import { prisma } from '../database/database.js';

export class RoleService {
  public async getByServer(serverId: number) {
    return await prisma.role.findMany({ where: { serverId } });
  }

  public async create(body: any) {
    return await prisma.role.create({
      data: { 
        name: body.name, 
        color: body.color || '#8a8c90', 
        serverId: Number(body.serverId),
        hoist: body.hoist || false
      }
    });
  }

  public async update(id: number, body: any) {
    return await prisma.role.update({
      where: { id },
      data: { name: body.name, color: body.color, hoist: body.hoist }
    });
  }

  public async patch(id: number, body: any) {
    return await prisma.role.update({
      where: { id },
      data: { name: body.name, color: body.color }
    });
  }

  public async delete(id: number) {
    return await prisma.role.delete({ where: { id } });
  }
}
