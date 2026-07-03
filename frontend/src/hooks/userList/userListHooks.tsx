import { useState, useEffect } from 'react';
import type { User } from '../../infra/domain/user/entity/user';
import { suggestionservice } from '../../infra/domain/user/serverUser';

const service = new suggestionservice();


export function userListHooks() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                // const response = await api.get<User[]>('/users');
                // setUsers(response.data);
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
