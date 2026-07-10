import { useEffect, useState } from "react";
import type { ServerData } from "../../infra/domain/server/entity/server";
import { ApiServerServices } from "../../infra/domain/apiServerServices";

const { serverServices } = ApiServerServices();

export function ServerListHooks() {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
        serverServices.getAll()
            .then(data => {
                setServers(data);
            })
            .catch(error => {
                console.error("Error loading server list:", error);
            });
    }, []);

    return { servers };
}
