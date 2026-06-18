import { User } from '../../domain/user/entity/user.js';
import { prisma } from '../database/database.js';
export class UserRepository {
  public async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  public async create(data: { nickname: string; avatar: string | null; isBot: boolean; email: string; password: string }): Promise<User> {
    const userEntity = await prisma.user.create({ data });
    return userEntity;
  }

  public async update(id: number, data: { nickname?: string; avatar?: string | null; email?: string; password: string }): Promise<User> {
    const userEntity = await prisma.user.update({ where: { id }, data });
    return userEntity;
  }

  public async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
