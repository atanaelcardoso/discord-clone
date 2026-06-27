import { useEffect, useState } from "react";
import type { ServerData } from "../../infra/domain/serverList/entity/serverList";
import api from "../../Services/api";

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
