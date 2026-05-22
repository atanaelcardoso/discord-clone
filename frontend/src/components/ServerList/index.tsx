import type React from 'react';
import { useEffect, useState } from 'react'; 
import ServerButton from '../ServerButton';
import { Container, Separator } from './styles';
import api from '../../Services/api';

interface ServerData {
    id: number;
    name: string;
    icon?: string;
}

const ServerList: React.FC = () => {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
        api.get('/servers')
            .then(response => {
                setServers(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar a lista de servidores:", error);
            });
    }, []);

    return (
        <Container>
            {}
            <ServerButton isHome />

            <Separator />

            {}
            {servers.map(server => (
                <ServerButton 
                    key={server.id} 
                    title={server.name}
                />
            ))}
        </Container>
    );
};

export default ServerList;
