import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { ChannelService as ChannelServiceType } from '../channelService.js';
import type { Channel, ChannelType } from '../../entity/channel.js';

const mockFindAll = jest.fn<() => Promise<Channel[]>>();
const mockCreate = jest.fn<(name: string, serverId: number, type: ChannelType) => Promise<Channel>>();
const mockUpdate = jest.fn<(id: number, name: string, type: ChannelType) => Promise<Channel>>();
const mockPatch = jest.fn<(id: number, name: string) => Promise<Channel>>();
const mockDelete = jest.fn<(id: number) => Promise<void>>();

jest.unstable_mockModule('../../../../infra/repository/channelRepository.js', () => ({
  ChannelRepository: class {
    findAll = mockFindAll;
    create = mockCreate;
    update = mockUpdate;
    patch = mockPatch;
    delete = mockDelete;
  }
}));

describe('ChannelService', () => {
  let channelService: ChannelServiceType;

  const mockRepositoryInstance = {
    findAll: mockFindAll,
    create: mockCreate,
    update: mockUpdate,
    patch: mockPatch,
    delete: mockDelete
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await import('../channelService.js');
    channelService = new module.ChannelService();
  });

  it('deve retornar todos os canais', async () => {
    const canaisSimulados: Channel[] = [
      { id: 1, name: 'geral', serverId: 10, type: 'TEXT' as ChannelType }
    ];

    mockRepositoryInstance.findAll.mockResolvedValue(canaisSimulados);

    const resultado = await channelService.getAll();

    expect(resultado).toEqual(canaisSimulados);
    expect(mockRepositoryInstance.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve criar um canal convertendo serverId para número e aplicando tipo padrão TEXT', async () => {
    const novoCanal: Channel = {
      id: 0,
      name: 'suporte',
      serverId: 15, 
      type: '' as ChannelType
    };

    mockRepositoryInstance.create.mockResolvedValue({ ...novoCanal, serverId: 15, type: 'TEXT' as ChannelType, id: 2 });

    await channelService.create(novoCanal);

    expect(mockRepositoryInstance.create).toHaveBeenCalledWith('suporte', 15, 'TEXT' as ChannelType);
  });

  it('deve criar um canal com o tipo específico caso seja fornecido', async () => {
    const canalVoz: Channel = {
      id: 0,
      name: 'gaming',
      serverId: 20,
      type: 'VOICE' as ChannelType
    };

    mockRepositoryInstance.create.mockResolvedValue({ ...canalVoz, id: 3 });

    await channelService.create(canalVoz);

    expect(mockRepositoryInstance.create).toHaveBeenCalledWith('gaming', 20, 'VOICE' as ChannelType);
  });

  it('deve atualizar o nome e tipo do canal com sucesso', async () => {
    const idCanal = 1;
    const dadosAtualizados: Channel = {
      id: idCanal,
      name: 'avisos-gerais',
      serverId: 10,
      type: 'TEXT' as ChannelType
    };

    mockRepositoryInstance.update.mockResolvedValue(dadosAtualizados);

    const resultado = await channelService.update(idCanal, dadosAtualizados);

    expect(resultado).toEqual(dadosAtualizados);
    expect(mockRepositoryInstance.update).toHaveBeenCalledWith(1, 'avisos-gerais', 'TEXT' as ChannelType);
  });

  it('deve lançar um erro personalizado caso a atualização falhe no repositório', async () => {
    const idCanal = 1;
    const dadosAtualizados: Channel = { id: idCanal, name: 'erro', serverId: 10, type: 'TEXT' as ChannelType };

    mockRepositoryInstance.update.mockRejectedValue(new Error('Database timeout'));

    await expect(channelService.update(idCanal, dadosAtualizados))
      .rejects
      .toThrow('Error on updated the channel: Database timeout');
  });

  it('deve atualizar parcialmente apenas o nome do canal', async () => {
    const idCanal = 1;
    const dadosPatch: Channel = {
      id: idCanal,
      name: 'novo-nome',
      serverId: 10,
      type: 'TEXT' as ChannelType
    };

    mockRepositoryInstance.patch.mockResolvedValue(dadosPatch);

    await channelService.patch(idCanal, dadosPatch);

    expect(mockRepositoryInstance.patch).toHaveBeenCalledWith(1, 'novo-nome');
  });

  it('deve deletar um canal pelo ID', async () => {
    const idCanal = 5;
    mockRepositoryInstance.delete.mockResolvedValue(undefined);

    await channelService.delete(idCanal);

    expect(mockRepositoryInstance.delete).toHaveBeenCalledWith(idCanal);
  });
});
