import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { Server } from '../../entity/server.js';
import type { ServerService as ServerServiceType } from '../serverService.js';

const mockFindAll = jest.fn<() => Promise<Server[]>>();
const mockCreate = jest.fn<(name: string, ownerId: number) => Promise<Server>>();
const mockUpdate = jest.fn<(id: number, data: { name?: string; icon?: string }) => Promise<Server>>();
const mockDelete = jest.fn<(id: number) => Promise<void>>();

jest.unstable_mockModule('../../../../infra/repository/serverRepository.js', () => ({
  ServerRepository: class {
    findAll = mockFindAll;
    create = mockCreate;
    update = mockUpdate; 
    delete = mockDelete;
  }
}));

describe('ServerService', () => {
  let serverService: ServerServiceType;

  const mockRepositoryInstance = {
    findAll: mockFindAll,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await import('../serverService.js');
    serverService = new module.ServerService();
  });

  it('deve retornar todos os servidores', async () => {
    const servidoresSimulados: Server[] = [
      { id: 1, name: 'Servidor dos Devs', ownerId: 10, icon: 'icon-url.png' }
    ];

    mockRepositoryInstance.findAll.mockResolvedValue(servidoresSimulados);

    const resultado = await serverService.getAll();

    expect(resultado).toEqual(servidoresSimulados);
    expect(mockRepositoryInstance.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve criar um servidor convertendo o ownerId para número', async () => {
    const novoServidor: Server = {
      id: 0,
      name: 'Comunidade Gamer',
      ownerId: '42' as unknown as number,
      icon: ''
    };

    mockRepositoryInstance.create.mockResolvedValue({ ...novoServidor, id: 2, ownerId: 42 });

    await serverService.create(novoServidor);

    expect(mockRepositoryInstance.create).toHaveBeenCalledWith('Comunidade Gamer', 42);
  });

  it('deve atualizar o nome e o ícone do servidor', async () => {
    const idServidor = 1;
    const dadosAtualizados: Server = {
      id: idServidor,
      name: 'Nome Atualizado',
      ownerId: 10,
      icon: 'novo-icone.png'
    };

    mockRepositoryInstance.update.mockResolvedValue(dadosAtualizados);

    await serverService.update(idServidor, dadosAtualizados);

     expect(mockRepositoryInstance.update).toHaveBeenCalledWith(idServidor, {
      name: 'Nome Atualizado',
      icon: 'novo-icone.png'
    });
  });

  it('deve chamar o método update do repositório atualizando parcialmente apenas o nome', async () => {
    const idServidor = 1;
    const dadosPatch: Server = {
      id: idServidor,
      name: 'Nome Editado no Patch',
      ownerId: 10,
      icon: 'icone-antigo.png'
    };

    mockRepositoryInstance.update.mockResolvedValue(dadosPatch);

    await serverService.patch(idServidor, dadosPatch);

    expect(mockRepositoryInstance.update).toHaveBeenCalledWith(idServidor, {
      name: 'Nome Editado no Patch'
    });
  });

  it('deve deletar um servidor pelo ID', async () => {
    const idServidor = 7;
    mockRepositoryInstance.delete.mockResolvedValue(undefined);

    await serverService.delete(idServidor);

    expect(mockRepositoryInstance.delete).toHaveBeenCalledWith(idServidor);
  });
});
