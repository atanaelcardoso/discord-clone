import ServerButton from '../../serverBuntton/useCase/serverBunttonServer';
import { Container, Separator } from '../../../../components/ServerList/styles'
import { ServerListHooks } from '../../../../hooks/serverList/serverListHooks';

export default function ServerList() {
    const {servers} = ServerListHooks();

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
