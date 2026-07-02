import type { ServerData } from "../domain/server/entity/server";

export interface serverRepository {
    getServer(): Promise<ServerData[]>;
}