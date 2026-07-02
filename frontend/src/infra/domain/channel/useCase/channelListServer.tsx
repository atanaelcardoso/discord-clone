import ChannelButton from './channelBunttonServer';
import '../../../i18n/i18n'
import { useTranslation } from 'react-i18next';
import { Container, Category, AddCategoryIcon } from '../styles/stylesChannelList'
import ChannelListHooks from '../../../../hooks/channelList/channelListHooks';

export default function ChannelList() {
    const { t } = useTranslation();
    const {channels, loading} = ChannelListHooks();

    return (
        <Container>
            <Category>
                <span>{t("Canais de texto")}</span>
                <AddCategoryIcon />
            </Category>

            {loading ? (
                <p style={{ color: 'var(--gray)', padding: '0 16px', fontSize: '13px' }}>Carregando canais...</p>
            ) : channels.length === 0 ? (
                <p style={{ color: 'var(--gray)', padding: '0 16px', fontSize: '13px' }}>Nenhum canal criado</p>
            ) : (
                channels.map((channel) => (
                    <ChannelButton
                        key={channel.id}
                        ChannelName={channel.name}
                    />
                ))
            )}
        </Container>
    );
}