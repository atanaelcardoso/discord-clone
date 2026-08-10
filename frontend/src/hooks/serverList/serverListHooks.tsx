import { useEffect, useState } from "react";
import { apiServices } from "../../infra/domain/apiServices";
import type { ServerData } from "../../infra/domain/server/entity/server";

const { userService } = apiServices(); 

export function useUserList() {
  const [users, setUsers] = useState<ServerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    userService.getAll() 
      .then(data => {
        if (isMounted) {
          setUsers(data);
        }
      })
      .catch(err => console.error("Error loading user list:", err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  return { users, isLoading };
}
