import { useEffect, useState } from "react";
import type { User } from "../../infra/domain/userInfo/entity/userInfo";
import api from "../../Services/api";

export function UserInfoHooks() {

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get<User[]>('/users');

                if (response.data.length > 0) {
                    setUser(response.data[0]);
                }
            } catch (error) {
                console.error('Error searching for user:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);
     return {user,loading};
}