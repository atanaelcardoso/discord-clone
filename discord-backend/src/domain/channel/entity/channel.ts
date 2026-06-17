import { Message } from "../../message/entity/message.js";
import { Server } from "../../server/entity/server.js";

export enum ChannelType {
  TEXT = 'TEXT',
  VOICE = 'VOICE'
}

export interface Channel {
  id: number;
  name: string;
  type: ChannelType;
  serverId: number;
  server?: Server;
  messages?: Message[];
}