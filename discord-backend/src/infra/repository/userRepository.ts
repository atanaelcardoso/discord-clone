import { User } from '../../types/index.ts';
import type { PublicUser } from '../../domain/user/entity/user.ts';
import { prisma } from '../database/database.ts';

export class UserRepository {
  public async findAll(): Promise<PublicUser[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nickname: true,
        avatar: true,
        isBot: true,
        email: true
      }
    });
    return users;
  }

  public async create(data: { nickname: string; avatar: string | null; isBot: boolean; email: string; password: string }): Promise<PublicUser> {
    const userEntity = await prisma.user.create({
      data,
      select: {
        id: true,
        nickname: true,
        avatar: true,
        isBot: true,
        email: true
      }
    });
    return userEntity;
  }

  public async update(id: number, data: { nickname?: string; avatar?: string | null; email?: string; password: string }): Promise<PublicUser> {
    const userEntity = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        nickname: true,
        avatar: true,
        isBot: true,
        email: true
      }
    });
    return userEntity;
  }

  public async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
