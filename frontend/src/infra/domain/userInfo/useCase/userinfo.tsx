import '../../../i18n/i18n'
import { useTranslation } from 'react-i18next';

import {
    Container,
    Profiler,
    Avatar,
    UserData,
    Icons,
    MicIcon,
    HeadphoneIcon,
    SettingsIcon
} from '../../../../components/UserInfo/styles';
import { UserInfoHooks } from '../../../../hooks/userInfo/userInfoHooks';


export default function UserInfo() {
    const { t } = useTranslation();
    const { user, loading} = UserInfoHooks();

    

    if (loading) {
        return (
            <Container>
                <Profiler>
                    <UserData><strong>{t('Carregando...')}</strong></UserData>
                </Profiler>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container>
                <Profiler>
                    <UserData><strong>{t('Nenhum usuário')}</strong></UserData>
                </Profiler>
            </Container>
        );
    }

    const userTag = `#${String(user.id).padStart(4, '0')}`;

    return (
        <Container>
            <Profiler>
                <Avatar style={{ backgroundImage: user.avatar ? `url(${user.avatar})` : undefined }} />
                <UserData>
                    <strong>{user.nickname}</strong>
                    <span>{userTag}</span>
                </UserData>
            </Profiler>

            <Icons>
                <MicIcon />
                <HeadphoneIcon />
                <SettingsIcon />
            </Icons>
        </Container>
    );
}