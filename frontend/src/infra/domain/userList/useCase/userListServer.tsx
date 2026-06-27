import { useTranslation } from 'react-i18next';
import { userListHooks } from '../../../../hooks/userList/userListHooks';
import { Container, Role, User, Avatar } from '../../../../components/UserList/styles';
import type { UserProps } from '../entity/userList';

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
  );
}

export default function UserList() {
  const { t } = useTranslation();
  const { users, loading } = userListHooks();

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
        <p style={{ color: 'var(--gray)', padding: '0 16px' }}>{t('Nenhum usuário disponível.')}</p>
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
