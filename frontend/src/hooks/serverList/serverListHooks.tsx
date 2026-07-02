import { useEffect, useState } from "react";
import api from "../../infra/api/api";
import type { ServerData } from "../../infra/domain/server/entity/server";

export function ServerListHooks() {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
        api.get('/servers')
            .then(response => {
                setServers(response.data);
            })
            .catch(error => {
                console.error("Error loading server list:", error);
            });
    }, []);
    return{servers};
}
