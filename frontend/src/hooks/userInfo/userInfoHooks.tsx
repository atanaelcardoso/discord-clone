import { useEffect, useState } from "react";
import type { User } from "../../infra/domain/user/entity/user";
import { apiServices } from "../../infra/domain/apiServices";

const { userService } = apiServices();

export function UserInfoHooks() {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await userService.getAll();
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