import { useEffect, useState } from "react";
import type { User } from "../../infra/domain/user/entity/user";
import { apiServices } from "../../infra/domain/apiServices";

const { userService } = apiServices();

export function UserListHooks() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await userService.getAll();
                setUsers(data);
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