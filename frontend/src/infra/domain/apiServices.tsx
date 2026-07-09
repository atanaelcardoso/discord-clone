import api from "../api/api"
import { UserRepository } from "../api/userRepository"
import type { UserService } from "./user/useCase/serverUser";

interface ApiServices {
    userService: UserService;
}

export function ApiService(): ApiServices {
    const apiInstance = api;
    
    const userService = new UserRepository(apiInstance);

    return {
        userService
    };
}