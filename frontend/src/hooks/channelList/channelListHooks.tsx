import { useEffect, useState } from "react";
import api from "../../Services/api";
import type { channel } from "../../infra/domain/channelList/entity/channelList";

export default function ChannelListHooks() {
    const [chanels, setChannels] = useState<channel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChannels() {
            try {
                const response = await api.get('/channels');
                setChannels(response.data);
            } catch (error) {
                console.error('Error retrieving backend channels:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchChannels();
    }, []);
    return{ loading, chanels};
}