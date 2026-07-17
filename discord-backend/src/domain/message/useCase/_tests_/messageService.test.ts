import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { Message } from '../../entity/message.js';
import type { MessageService as MessageServiceType } from '../messageService.js';

const mockFindByChannel = jest.fn<(channelId: number) => Promise<Message[]>>();
const mockCreate = jest.fn<(content: string, userId: number, channelId: number) => Promise<Message>>();
const mockUpdate = jest.fn<(id: number, content: string) => Promise<Message>>();
const mockDelete = jest.fn<(id: number) => Promise<void>>();

jest.unstable_mockModule('../../../../infra/repository/messageRepository.js', () => ({
  MessageRepository: class {
    findByChannel = mockFindByChannel;
    create = mockCreate;
    update = mockUpdate;
    delete = mockDelete;
  }
}));

describe('MessageService', () => {
  let messageService: MessageServiceType; 

  const mockRepositoryInstance = {
    findByChannel: mockFindByChannel,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await import('../messageService.js');
    messageService = new module.MessageService();
  });

  it('deve retornar mensagens de um canal específico', async () => {
    const mensagensSimuladas: Message[] = [
      { id: 1, content: 'Olá', channelId: 10, userId: 1 },
    ];

    mockRepositoryInstance.findByChannel.mockResolvedValue(mensagensSimuladas);

    const resultado = await messageService.getByChannel(10);

    expect(resultado).toEqual(mensagensSimuladas);
    expect(mockRepositoryInstance.findByChannel).toHaveBeenCalledWith(10);
  });

  it('deve criar uma mensagem convertendo os IDs para número', async () => {
    const novaMensagem: Message = {
      id: 0,
      content: 'Nova mensagem',
      userId: 5,
      channelId: 10,
    };

    mockRepositoryInstance.create.mockResolvedValue({ ...novaMensagem, id: 1 });

    await messageService.create(novaMensagem);

    expect(mockRepositoryInstance.create).toHaveBeenCalledWith(
      'Nova mensagem',
      5,
      10,
    );
  });

  it('deve atualizar o conteúdo de uma mensagem', async () => {
    const idMensagem = 1;
    const dadosAtualizados: Message = {
      id: idMensagem,
      content: 'Conteúdo editado',
      userId: 5,
      channelId: 10,
    };

    mockRepositoryInstance.update.mockResolvedValue(dadosAtualizados);

    await messageService.update(idMensagem, dadosAtualizados);

    expect(mockRepositoryInstance.update).toHaveBeenCalledWith(
      1,
      'Conteúdo editado',
    );
  });

  it('deve deletar uma mensagem pelo ID', async () => {
    const idMensagem = 1;
    mockRepositoryInstance.delete.mockResolvedValue(undefined);

    await messageService.delete(idMensagem);

    expect(mockRepositoryInstance.delete).toHaveBeenCalledWith(idMensagem);
  });
});
