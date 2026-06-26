import type React from 'react';
import { useEffect, useState } from 'react'; 
import ServerButton from '../../serverBuntton/useCase/serverBunttonServer';
import { Container, Separator } from '../../../../components/ServerList/styles'
import api from '../../../../Services/api';
import type { ServerData } from '../entity/serverList';


const ServerList: React.FC = () => {
    const [servers, setServers] = useState<ServerData[]>([]);

    useEffect(() => {
        api.get('/servers')
            .then(response => {
                setServers(response.data);
            })
            .catch(error => {
                console.error("Error loading server list:", error);
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
