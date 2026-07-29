import { useEffect, useState } from "react";
import type { ServerData } from "../../infra/domain/server/entity/server";
import { apiServices } from "../../infra/domain/apiServices";

const { serverService } = apiServices();

export function useServerList() {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
        serverService.getAll()
            .then(data => {
                setServers(data);
            })
            .catch(error => {
                console.error("Error loading server list:", error);
            });
    }, []);

    return { servers };
}
