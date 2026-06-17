import { prisma } from '../database/database.js';

export class User {
  public id: number;
  public nickname: string;
  public avatar: string | null;
  public isBot: boolean;
  public email: string;

  constructor(props: User) {
    this.id = props.id;
    this.nickname = props.nickname;
    this.avatar = props.avatar;
    this.isBot = props.isBot;
    this.email = props.email;
  }
}

export class UserRepository {
  public async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(u => new User(u));
  }

  public async create(data: { nickname: string; avatar: string | null; isBot: boolean; email: string; password?: string }): Promise<User> {
    const userEntity = await prisma.user.create({ data });
    return new User(userEntity);
  }

  public async update(id: number, data: { nickname?: string; avatar?: string | null; email?: string; password?: string }): Promise<User> {
    const userEntity = await prisma.user.update({ where: { id }, data });
    return new User(userEntity);
  }

  public async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
