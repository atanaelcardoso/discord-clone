import '../../../i18n/i18n'
import { useTranslation } from 'react-i18next';
import { Container, Category, AddCategoryIcon } from '../styles/stylesChannelList'
import useChannelList from '../../../../hooks/channelList/channelListHooks';
import ChannelButton from './ChannelButtonServer';

export default function ChannelList() {
    const { t } = useTranslation();
    const {channels, loading} = useChannelList();

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
                        channelName={channel.name}
                    />
                ))
            )}
        </Container>
    );
}