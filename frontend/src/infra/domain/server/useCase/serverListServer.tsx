import ServerButton from './serverBunttonServer';
import { Container, Separator } from '../styles/stylesServerList'
import { ServerListHooks } from '../../../../hooks/serverList/serverListHooks';

export default function ServerList() {
    const { servers } = ServerListHooks();

    return (
        <Container>
            { }
            <ServerButton isHome />

            <Separator />

            { }
            {servers.map(server => (
                <ServerButton
                    key={server.id}
                    title={server.name}
                />
            ))}
        </Container>
    );
};
