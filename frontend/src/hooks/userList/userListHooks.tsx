import { useEffect, useState } from "react";
import { SuggestionService } from "../../infra/domain/channel/useCase/serverChannel";
import type { MessageBackend } from "../../infra/domain/channel/entity/channel";

const service = new SuggestionService();

export function UserListHooks() {
    const [users, setUsers] = useState<MessageBackend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await service.getAll();
                setUsers(response.data);
            } catch (error) {
                console.error('Error retrieving users:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return { 
        users, 
        loading
     };
}