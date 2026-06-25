import { useEffect, useState } from 'react';
import api from '../../Services/api';

import '../../infra/i18n/i18n'
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const [users, setUsers] = useState<UserBackend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get<UserBackend[]>('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error retrieving users:',error);
            } finally {
                setLoading(false);
            }
        }
            fetchUsers();
    }, []);

    if (loading) {
        return (
            <Container>
                <Role>{t('Carregando usuários...')}</Role>
            </Container>
        );
    }

    return (
        <Container>
            <Role>{t('Disponível')} - {users.length}</Role>

            {users.length === 0 ? (
                <p style= {{ color: 'var(--gray)', 'padding': '0 16px' }}>{t('Nenhum usuário disponível.')}</p>
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
            <Role>{t('Offline')} - 0</Role>
        </Container>    
    );
}