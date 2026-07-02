import { useState, useEffect } from 'react';
import type { User } from '../../infra/domain/user/entity/user';
import api from '../../infra/api/api';

export function userListHooks() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get<User[]>('/users');
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
