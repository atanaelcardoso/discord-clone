import { useEffect, useState } from "react";
import type { ServerData } from "../../infra/domain/server/entity/server";
import { suggestionservice } from "../../infra/domain/server/serverServer";

const service = new suggestionservice();

export function ServerListHooks() {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
        //api.get('/servers')
        service.getAll()
            .then(response => {
                setServers(response.data);
            })
            .catch(error => {
                console.error("Error loading server list:", error);
            });
    }, []);

    return { servers };
}
