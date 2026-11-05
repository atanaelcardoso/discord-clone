import { useEffect, useState } from "react";
import { apiServices } from "../../infra/domain/apiServices";
import type { ServerData } from "../../infra/domain/server/entity/server";

const { serverService } = apiServices();

export function useServerList() {
  const [servers, setServers] = useState<ServerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    serverService.getAll()
      .then(data => {
        if (isMounted) {
          setServers(data);
        }
      })
      .catch(err => console.error("Error loading server list:", err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  return { servers, isLoading };
}
