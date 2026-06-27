import ChannelMessage from '../../channelMessage/useCase/channelMessageServer';
import '../../../i18n/i18n'
import { useTranslation } from 'react-i18next';
import { Container, Message, InputWrapper, Input, InputIcon } from '../../../../components/ChannelData/styles';
import ChannelDataHooks from '../../../../hooks/channelData/channelDataHooks';

export default function ChannelData() {
    const { t } = useTranslation();
    const { 
        messages, 
        inputText, 
        setInputText, 
        messagesRef, 
        handleKeyDown 
    } = ChannelDataHooks();

    return (
        <Container>
            <Message ref={messagesRef}>
                {messages.length === 0 ? (
                    <p style={{ color: 'var(--gray)', padding: '16px' }}>Nenhuma mensagem enviada ainda neste canal.</p>
                ) : (
                    messages.map((msg) => (
                        <ChannelMessage
                            key={msg.id}
                            author={msg.user.nickname}
                            date={new Date(msg.createdAt).toLocaleDateString('pt-BR')}
                            content={msg.content}
                            isBot={msg.user.isBot}
                            avatarUrl={msg.user.avatar}
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