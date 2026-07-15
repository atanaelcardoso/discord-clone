import api from "../api/api";
import { ChannelRepository } from "../api/channelRepository";
import { ServerRepository } from "../api/serverRepository";
import { UserRepository } from "../api/userRepository";
import type { ChannelService } from "./channel/useCase/serverChannel";
import type { ServerService } from "./server/useCase/serverServer";
import type { UserService } from "./user/useCase/serverUser";

interface apiServices {
    channelService: ChannelService;
    serverService: ServerService;
    userService: UserService; 
}

export function apiServices(): apiServices {
    const apiInstance = api;

    const channelService = new ChannelRepository(apiInstance);
    const serverService = new ServerRepository(apiInstance);
    const userService = new UserRepository(apiInstance);

    return {
        channelService,
        serverService,
        userService
    }
}