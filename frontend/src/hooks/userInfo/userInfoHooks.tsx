import { useEffect, useState } from "react";
import type { User } from "../../infra/domain/user/entity/user";
import { SuggestionService } from "../../infra/domain/user/useCase/serverUser";

const service = new SuggestionService();

export function UserInfoHooks() {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await service.getAll();
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

    return {
        user,
        loading
    };
}