import '../../../i18n/i18n'
import { useTranslation } from 'react-i18next';
import { Container, Message, InputWrapper, Input, InputIcon } from '../styles/stylesChannelData';
import useChannelData from '../../../../hooks/channelData/channelDataHooks';
import { formatDate } from '../../../../utils/formatterDate';
import ChannelMessage from './channelMessageServer';

export default function ChannelData() {
    const { t, i18n } = useTranslation();
    const {
        messages,
        inputText,
        setInputText,
        messagesRef,
        handleKeyDown
    } = useChannelData();

    return (
        <Container>
            <Message ref={messagesRef}>
                {messages.length === 0 ? (
                    <p style={{ color: 'var(--gray)', padding: '16px' }}>Nenhuma mensagem enviada ainda neste canal.</p>
                ) : (
                    messages.map((msg) => (
                        <ChannelMessage
                            key={msg.id}
                            author={msg.user?.nickname || "Unknown User"}
                            date={formatDate(msg.createdAt, i18n.language)}
                            content={msg.content}
                            isBot={msg.user?.isBot || false}
                            avatarUrl={msg.user?.avatar || ""}
                        />
                    ))
                )}
            </Message>

            <InputWrapper>
                <Input
                    type="text"
                    placeholder={t("Digite uma mensagem e aperte Enter")}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <InputIcon />
            </InputWrapper>
        </Container>
    );
}