import { prisma } from '../Database/database.js';

export class ServerService {
  public async getAll() {
    return await prisma.server.findMany({ include: { channels: true } });
  }

  public async create(body: any) {
    return await prisma.server.create({
      data: { name: body.name, ownerId: Number(body.ownerId) }
    });
  }

  public async update(id: number, body: any) {
    return await prisma.server.update({
      where: { id },
      data: { name: body.name, icon: body.icon }
    });
  }

  public async patch(id: number, body: any) {
    return await prisma.server.update({
      where: { id },
      data: { name: body.name }
    });
  }

  public async delete(id: number) {
    return await prisma.server.delete({ where: { id } });
  }
}
