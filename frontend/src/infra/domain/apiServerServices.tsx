import api from "../api/api";
import { ServerRepository } from "../api/serverRepository";
import type { ServerService } from "./server/useCase/serverServer";

interface ApiServerServices {
    serverServices: ServerService;
}

export function ApiServerServices(): ApiServerServices {
    const apiInstance = api;

    const serverServices = new ServerRepository(apiInstance);

    return {
        serverServices
    }
}