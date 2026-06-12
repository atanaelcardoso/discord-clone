import { ChannelService } from '../services/channelService.js';

export class Server {
  public id: number;
  public name: string;
  public icon: string | null;
  public ownerId: number;
  public channels?: ChannelService[];

  constructor(props: Server) {
    this.id = props.id;
    this.name = props.name;
    this.icon = props.icon;
    this.ownerId = props.ownerId;
    this.channels = props.channels;
  }
}

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
