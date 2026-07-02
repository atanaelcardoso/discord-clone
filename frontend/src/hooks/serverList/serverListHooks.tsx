import { useEffect, useState } from "react";
import type { ServerData } from "../../infra/domain/server/entity/server";
import type { serverRepository } from "../../infra/api/serverRepository";
import { apiServerRepository } from "../../infra/domain/server/useCase/serverServer";

const defaultRepositoy = new apiServerRepository();

export function ServerListHooks(repository: serverRepository = defaultRepositoy) {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
        //api.get('/servers')
        repository.getServer()
            .then(response => {
                setServers(response);
            })
            .catch(error => {
                console.error("Error loading server list:", error);
            });
    }, []);

    return { servers };
}
