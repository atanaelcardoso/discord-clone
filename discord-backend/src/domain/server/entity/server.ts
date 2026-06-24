import { Channel } from "../../channel/entity/channel.ts";

export interface Server {
  id: number;
  name: string;
  icon: string;
  ownerId: number;
  channels?: Channel[];

}
