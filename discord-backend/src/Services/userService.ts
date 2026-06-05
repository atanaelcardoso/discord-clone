import { prisma } from '../Database/database.js';

export class UserService {
  public async getAll() {
    return await prisma.user.findMany();
  }

  public async create(body: any) {
    return await prisma.user.create({
      data: {
        nickname: body.nickname,
        avatar: body.avatar,
        isBot: body.isBot || false,
        email: body.email || `${body.nickname}@discord.com`,
        password: body.password || "123456"
      }
    });
  }

  public async update(id: number, body: any) {
    return await prisma.user.update({
      where: { id },
      data: { 
        nickname: body.nickname, 
        avatar: body.avatar,
        email: body.email,
        password: body.password
      }
    });
  }

  public async delete(id: number) {
    return await prisma.user.delete({ where: { id } });
  }
}
