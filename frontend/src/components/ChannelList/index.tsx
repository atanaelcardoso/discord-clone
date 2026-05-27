import { useEffect, useState } from 'react';
import api from '../../Services/api';
import ChannelButton from '../ChannelButton';

import { Container, Category, AddCategoryIcon } from './styles'

interface channel {
    id: number;
    name: string;
}

export default function ChannelList() {
    const [channels, setChannels] = useState<channel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChannels() {
            try {
                const response = await api.get('/channels');
                setChannels(response.data);
            } catch (error) {
                console.error('Error ao buscar canais do backend:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchChannels();
    }, []);

    return (
        <Container>
            <Category>
                <span>Canais de texto</span>
                <AddCategoryIcon />
            </Category>

            {loading ? (
                <p style={{ color: 'var(--gray)', padding: '0 16px', fontSize: '13px' }}>Carregando canais...</p>
            ) : channels.length === 0 ? (
                <p style={{ color: 'var(--gray)', padding: '0 16px', fontSize: '13px' }}>Nenhum canal criado</p>
            ) : (
                channels.map((channel) => (
                    <ChannelButton
                        key={channel.id}
                        ChannelName={channel.name}
                    />
                ))
            )}
        </Container>
    );
}