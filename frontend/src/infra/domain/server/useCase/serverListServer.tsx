import ServerButton from './ServerButtonServer';
import { Container, Separator } from '../styles/stylesServerList'
import { useServerList } from '../../../../hooks/serverList/serverListHooks';

export default function ServerList() {
    const { servers } = useServerList();

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
