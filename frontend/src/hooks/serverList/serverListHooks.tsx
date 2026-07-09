import { useEffect, useState } from "react";
import type { ServerData } from "../../infra/domain/server/entity/server";
import { SuggestionService } from "../../infra/domain/channel/useCase/serverChannel";

const service = new SuggestionService();

export function ServerListHooks() {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
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
