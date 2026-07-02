import { useEffect, useState } from "react";
import type { channel } from "../../infra/domain/channel/entity/channel";
import api from "../../infra/api/api";

export default function ChannelListHooks() {
    const [chanels, setChannels] = useState<channel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChannels() {
            try {
                // const response = await api.get('/channels');
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

    return {
        loading,
        chanels
    };
}