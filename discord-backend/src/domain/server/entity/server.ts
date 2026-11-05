import { Channel } from "../../channel/entity/channel.ts";

export interface Server {
  id: number;
  name: string;
  icon: string | null;
  ownerId: number;
  channels?: Channel[];

}
