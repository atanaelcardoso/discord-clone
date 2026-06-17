export class ServerRepository {
  
  public async findAll() {
    return []; 
  }

  public async create(name: string, ownerId: number) {
    return { id: Date.now(), name, ownerId, icon: null };
  }

  public async update(id: number, data: { name?: string, icon?: string }) {
    return { id, ...data };
  }

  public async delete(id: number) {
    return { id };
  }
}
