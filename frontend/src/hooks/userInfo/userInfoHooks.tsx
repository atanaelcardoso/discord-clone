import { useEffect, useState } from "react";
import type { User } from "../../infra/domain/user/entity/user";
import type { UserRepository } from "../../infra/api/userRepository";
import { ApiUserRepository } from "../../infra/domain/user/useCase/serverUser";

const defaultRepositoy = new ApiUserRepository();

export function UserInfoHooks(repository: UserRepository = defaultRepositoy) {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                // const response = await api.get<User[]>('/users');

                // if (response.data.length > 0) {
                //     setUser(response.data[0]);
                // }
                const data = await repository.getUsers();
                if (data.length > 0) {
                  setUser(data[0]);
                }
            } catch (error) {
                console.error('Error searching for user:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);
    
     return {
        user,
        loading
    };
}