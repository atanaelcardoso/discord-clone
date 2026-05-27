import { useEffect, useState } from 'react';
import api from '../../Services/api';

import { Container, Role, User, Avatar } from './styles';

interface UserBackend {
    id: number;
    nickname: string;
    avatar: string | null;
    isBot: boolean;
}
interface UserProps {
    nickname: string;
    isBot?: boolean;
    avatarUrl?: string | null;
}

function UserRow({ nickname, isBot, avatarUrl }: UserProps) {
    return (
        <User>
            <Avatar 
                className={isBot ? 'bot' : ''} 
                style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined }} 
                />
            <strong>{nickname}</strong>
            {isBot && <span>Bot</span>}
        </User>
    )
}

export default function UserList() {
    const [users, setUsers] = useState<UserBackend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get<UserBackend[]>('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error ao buscar usuários:',error);
            } finally {
                setLoading(false);
            }
        }
            fetchUsers();
    }, []);

    if (loading) {
        return (
            <Container>
                <Role>Carregando usuários...</Role>
            </Container>
        );
    }

    return (
        <Container>
            <Role>Disponível - {users.length}</Role>

            {users.length === 0 ? (
                <p style= {{ color: 'var(--gray)', 'padding': '0 16px' }}>Nenhum usuário disponível.</p>
            ) : (
                users.map(user => (
                    <UserRow
                        key={user.id}
                        nickname={user.nickname}
                        isBot={user.isBot}
                        avatarUrl={user.avatar}
                    />
                ))
            )}
            <Role>Offline - 0</Role>
        </Container>    
    );
}