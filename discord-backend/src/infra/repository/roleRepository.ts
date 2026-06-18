import { Role } from '../../domain/role/entity/role.js';
import { prisma } from '../database/database.js';

export class RoleRepository {
  public async findByServer(serverId: number): Promise<Role[]> {
    const roles = await prisma.role.findMany({ where: { serverId } });
    return roles;
  }

  public async create(name: string, color: string, serverId: number, hoist: boolean): Promise<Role> {
    const roleEntity = await prisma.role.create({ data: { name, color, serverId, hoist } });
    return roleEntity;
  }

  public async update(id: number, data: { name: string; color: string; hoist: boolean }): Promise<Role> {
    const roleEntity = await prisma.role.update({ where: { id }, data });
    return roleEntity;
  }

  public async patch(id: number, data: { name?: string; color?: string }): Promise<Role> {
    const roleEntity = await prisma.role.update({ where: { id }, data });
    return roleEntity;
  }

  public async delete(id: number): Promise<void> {
    await prisma.role.delete({ where: { id } });
  }
}