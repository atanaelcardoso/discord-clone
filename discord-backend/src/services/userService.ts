import { UserRepository } from '../repository/userRepository.js';

const userRepository = new UserRepository();

export class UserService {
  public async getAll() {
    return await userRepository.findAll();
  }

  public async create(body: any) {
    const nickname = body.nickname;
    const avatar = body.avatar || null;
    const isBot = body.isBot || false;
    const email = body.email || `${nickname}@discord.com`;
    const password = body.password || "123456";

    return await userRepository.create({ nickname, avatar, isBot, email, password });
  }

  public async update(id: number, body: any) {
    return await userRepository.update(id, {
      nickname: body.nickname,
      avatar: body.avatar,
      email: body.email,
      password: body.password
    });
  }

  public async delete(id: number) {
    await userRepository.delete(id);
  }
}