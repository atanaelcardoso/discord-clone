import { Server } from '../../types/index.ts';
import { prisma } from '../database/database.ts';

export class ServerRepository {

  public async findAll(): Promise<Server[]> {
    return prisma.server.findMany();
  }

  public async create(name: string, ownerId: number): Promise<Server> {
    return prisma.server.create({ data: { name, ownerId } });
  }

  public async update(id: number, data: { name?: string; icon?: string | null }): Promise<Server> {
    return prisma.server.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await prisma.server.delete({ where: { id } });
  }
}
