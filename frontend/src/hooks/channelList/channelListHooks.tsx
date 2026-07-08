import { useEffect, useState } from "react";
import type { MessageBackend } from "../../infra/domain/channel/entity/channel";
import { SuggestionService } from "../../infra/domain/channel/useCase/serverChannel";

const service = new SuggestionService();

export default function ChannelListHooks() {
    const [channels, setChannels] = useState<MessageBackend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChannels() {
            try {
                // const response = await api.get('/channels');
                const response = await service.getAll();
                setChannels(response.data);
            } catch (error) {
                console.error('Error retrieving backend channels:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchChannels();
    }, []);

    return {
        loading,
        channels
    };
}