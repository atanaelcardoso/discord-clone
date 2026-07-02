import { useState, useEffect } from 'react';
import type { User } from '../../infra/domain/user/entity/user';
import type { UserRepository } from '../../infra/api/userRepository';
import { ApiUserRepository } from '../../infra/domain/user/useCase/serverUser';

const defaultRepositoy = new ApiUserRepository();


export function userListHooks(repository: UserRepository = defaultRepositoy) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                // const response = await api.get<User[]>('/users');
                // setUsers(response.data);
                const data = await repository.getUsers();
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
