import { useEffect, useState } from "react";
import type { MessageBackend } from "../../infra/domain/channel/entity/channel";
import { apiServices } from "../../infra/domain/apiServices";

const { channelService } = apiServices();

export default function ChannelListHooks() {
    const [channels, setChannels] = useState<MessageBackend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChannels() {
            try {
                const data = await channelService.getAll();
                setChannels(data);
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