import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { User } from '../../entity/user.js';
import type { UserService as UserServiceType } from '../userService.js';

const mockFindAll = jest.fn<() => Promise<User[]>>();
const mockCreate = jest.fn<(data: Omit<User, 'id'>) => Promise<User>>();
const mockUpdate = jest.fn<(id: number, data: Omit<User, 'id' | 'isBot'>) => Promise<User>>();
const mockDelete = jest.fn<(id: number) => Promise<void>>();

jest.unstable_mockModule('../../../../infra/repository/userRepository.js', () => ({
  UserRepository: class {
    findAll = mockFindAll;
    create = mockCreate;
    update = mockUpdate;
    delete = mockDelete;
  }
}));

describe('UserService', () => {
  let userService: UserServiceType;

  const mockRepositoryInstance = {
    findAll: mockFindAll,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await import('../userService.js');
    userService = new module.UserService();
  });

  it('deve retornar todos os usuários', async () => {
    const usuariosSimulados: User[] = [
      { id: 1, nickname: 'Atanael', avatar: 'avatar-url.png', isBot: false, email: 'atanael@discord.com', password: 'hash' }
    ];

    mockRepositoryInstance.findAll.mockResolvedValue(usuariosSimulados);

    const resultado = await userService.getAll();

    expect(resultado).toEqual(usuariosSimulados);
    expect(mockRepositoryInstance.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve criar um usuário aplicando todos os fallbacks automáticos (avatar, bot, email e senha)', async () => {
    const novoUsuario: User = {
      id: 0,
      nickname: 'john_doe',
      avatar: '',   
      isBot: undefined as unknown as boolean, 
      email: '',     
      password: ''   
    };

    const usuarioSalvo: User = { 
      id: 2, 
      nickname: 'john_doe', 
      avatar: null, 
      isBot: false, 
      email: 'john_doe@discord.com', 
      password: '123456' 
    };

    mockRepositoryInstance.create.mockResolvedValue(usuarioSalvo);

    await userService.create(novoUsuario);

    expect(mockRepositoryInstance.create).toHaveBeenCalledWith({
      nickname: 'john_doe',
      avatar: null,
      isBot: false,
      email: 'john_doe@discord.com',
      password: '123456'
    });
  });

  it('deve criar um usuário mantendo os dados customizados quando fornecidos', async () => {
    const usuarioCustomizado: User = {
      id: 0,
      nickname: 'BotMestre',
      avatar: 'bot-avatar.png',
      isBot: true,
      email: 'mestre@bot.com',
      password: 'senha_segura_123'
    };

    mockRepositoryInstance.create.mockResolvedValue({ ...usuarioCustomizado, id: 3 });

    await userService.create(usuarioCustomizado);

    expect(mockRepositoryInstance.create).toHaveBeenCalledWith({
      nickname: 'BotMestre',
      avatar: 'bot-avatar.png',
      isBot: true,
      email: 'mestre@bot.com',
      password: 'senha_segura_123'
    });
  });

  it('deve atualizar os dados do usuário enviando o objeto envelopado corretamente', async () => {
    const idUsuario = 1;
    const dadosAtualizados: User = {
      id: idUsuario,
      nickname: 'Atanael Editado',
      avatar: 'novo-avatar.png',
      isBot: false,
      email: 'atanael_novo@discord.com',
      password: 'nova_senha_hash'
    };

    mockRepositoryInstance.update.mockResolvedValue(dadosAtualizados);

    await userService.update(idUsuario, dadosAtualizados);

   expect(mockRepositoryInstance.update).toHaveBeenCalledWith(idUsuario, {
      nickname: 'Atanael Editado',
      avatar: 'novo-avatar.png',
      email: 'atanael_novo@discord.com',
      password: 'nova_senha_hash'
    });
  });

  it('deve deletar um usuário pelo ID', async () => {
    const idUsuario = 7;
    mockRepositoryInstance.delete.mockResolvedValue(undefined);

    await userService.delete(idUsuario);

    expect(mockRepositoryInstance.delete).toHaveBeenCalledWith(idUsuario);
  });
});
