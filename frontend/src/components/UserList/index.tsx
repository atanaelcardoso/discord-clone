import React from 'react';

import { Container, Role, User, Avatar } from './styles';
interface UserProps {
    nickname: string;
    isBot?: boolean;
}

const UserRow: React.FC<UserProps> = ({ nickname, isBot }) => {
    return (
        <User>
            <Avatar className={isBot ? 'bot' : ''} />

            <strong>{nickname}</strong>

            {isBot && <span>Bot</span>}
        </User>
    )
}

const UserList: React.FC = () => {
    return (
        <Container>
            <Role>Disponível - 1</Role>
            <UserRow nickname="John Doe" />

            <Role>Offline - 18</Role>
            <UserRow nickname="Jane Doe" isBot />
            <UserRow nickname="John Smith" />
            <UserRow nickname="Jane Smith" />
            <UserRow nickname="John Appleseed" />
            <UserRow nickname="Jane Appleseed" />
            <UserRow nickname="John Doe" />
            <UserRow nickname="Jane Doe" />
            <UserRow nickname="John Smith" />
            <UserRow nickname="Jane Smith" />
            <UserRow nickname="John Appleseed" />
            <UserRow nickname="Jane Appleseed" />
            <UserRow nickname="John Doe" />
            <UserRow nickname="Jane Doe" />
            <UserRow nickname="John Smith" />
            <UserRow nickname="Jane Smith" />
            <UserRow nickname="John Appleseed" />
            <UserRow nickname="Jane Appleseed" />  
        </Container>
    );
};

export default UserList;