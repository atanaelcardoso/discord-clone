import ServerButton from './ServerButtonServer';
import { Container, Separator } from '../styles/stylesServerList';
import { useUserList } from '../../../../hooks/serverList/serverListHooks';

export default function ServerList() {
    const { users } = useUserList(); 

    return (
        <Container>
            <ServerButton isHome />
            <Separator />

            {}
            {users && users.map(user => (
                <ServerButton
                    key={user.id}
                    title={user.nickname}
                />
            ))}
        </Container>
    );
};  
