import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { Role } from '../../entity/role.ts';
import type { RoleService as RoleServiceType } from '../roleService.js';

const mockFindByServer = jest.fn<(serverId: number) => Promise<Role[]>>();
const mockCreate = jest.fn<(name: string, color: string, serverId: number, hoist: boolean) => Promise<Role>>();
const mockUpdate = jest.fn<(id: number, data: { name: string; color: string; hoist: boolean }) => Promise<Role>>();
const mockPatch = jest.fn<(id: number, data: { name?: string; color?: string }) => Promise<Role>>();
const mockDelete = jest.fn<(id: number) => Promise<void>>();

jest.unstable_mockModule('../../../../infra/repository/roleRepository.js', () => ({
  RoleRepository: class {
    findByServer = mockFindByServer;
    create = mockCreate;
    update = mockUpdate;
    patch = mockPatch;
    delete = mockDelete;
  }
}));

describe('RoleService', () => {
  let roleService: RoleServiceType;

  const mockRepositoryInstance = {
    findByServer: mockFindByServer,
    create: mockCreate,
    update: mockUpdate,
    patch: mockPatch,
    delete: mockDelete
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await import('../roleService.ts');
    roleService = new module.RoleService();
  });

  it('deve retornar cargos de um servidor específico', async () => {
    const cargosSimulados: Role[] = [
      { id: 1, name: 'Admin', color: '#ff0000', serverId: 10, hoist: true }
    ];

    mockRepositoryInstance.findByServer.mockResolvedValue(cargosSimulados);

    const resultado = await roleService.getByServer(10);

    expect(resultado).toEqual(cargosSimulados);
    expect(mockRepositoryInstance.findByServer).toHaveBeenCalledWith(10);
    expect(mockRepositoryInstance.findByServer).toHaveBeenCalledTimes(1);
  });

  it('deve criar um cargo aplicando os fallbacks de cor e hoist', async () => {
    const novoCargo: Role = {
      id: 0,
      name: 'Moderador',
      color: '', 
      serverId: '20' as unknown as number, 
      hoist: undefined as unknown as boolean 
    };

    mockRepositoryInstance.create.mockResolvedValue({ 
      ...novoCargo, 
      id: 2, 
      color: '#8a8c90', 
      serverId: 20, 
      hoist: false 
    });

    await roleService.create(novoCargo);

    expect(mockRepositoryInstance.create).toHaveBeenCalledWith('Moderador', '#8a8c90', 20, false);
  });

  it('deve atualizar todas as propriedades do cargo', async () => {
    const idCargo = 1;
    const dadosAtualizados: Role = {
      id: idCargo,
      name: 'Membro Premium',
      color: '#00ff00',
      serverId: 10,
      hoist: true
    };

    mockRepositoryInstance.update.mockResolvedValue(dadosAtualizados);

    await roleService.update(idCargo, dadosAtualizados);

    expect(mockRepositoryInstance.update).toHaveBeenCalledWith(idCargo, {
      name: 'Membro Premium',
      color: '#00ff00',
      hoist: true
    });
  });

  it('deve atualizar parcialmente apenas nome e cor do cargo', async () => {
    const idCargo = 1;
    const dadosPatch: Role = {
      id: idCargo,
      name: 'Novo Nome Cargo',
      color: '#0000ff',
      serverId: 10,
      hoist: false
    };

    mockRepositoryInstance.patch.mockResolvedValue(dadosPatch);

    await roleService.patch(idCargo, dadosPatch);

    expect(mockRepositoryInstance.patch).toHaveBeenCalledWith(idCargo, {
      name: 'Novo Nome Cargo',
      color: '#0000ff'
    });
  });

  it('deve deletar um cargo pelo ID', async () => {
    const idCargo = 9;
    mockRepositoryInstance.delete.mockResolvedValue(undefined);

    await roleService.delete(idCargo);

    expect(mockRepositoryInstance.delete).toHaveBeenCalledWith(idCargo);
  });
});
