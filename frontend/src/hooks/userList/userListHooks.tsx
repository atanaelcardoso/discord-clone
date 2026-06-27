import { useState, useEffect } from 'react';
import type { UserBackend } from '../../infra/domain/userList/entity/userList';
import api from '../../Services/api';

export function userListHooks() {
  const [users, setUsers] = useState<UserBackend[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get<UserBackend[]>('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error retrieving users:',error);
            } finally {
                setLoading(false);
            }
        }
            fetchUsers();
    }, []);

  return { users, loading };
}
