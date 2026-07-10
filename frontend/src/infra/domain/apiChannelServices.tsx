import api from "../api/api";
import { ChannelRepository } from "../api/channelRepository";
import type { ChannelService } from "./channel/useCase/serverChannel";

interface apiChannelServices {
    channelServices: ChannelService;
}

export function apiChannelServices(): apiChannelServices {
    const apiInstance = api;

    const channelServices = new ChannelRepository(apiInstance);

    return {
        channelServices
    }
}