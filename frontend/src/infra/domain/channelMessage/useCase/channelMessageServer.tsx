import { Container, Avatar, Message, Header, Content } from '../../../../components/ChannelMessage/styles';
import type { Props } from '../entity/channelMessage';

export default function ChannelMessage({ 
    author, 
    date, 
    content, 
    hasMention, 
    isBot,
    avatarUrl 
}: Props) {
    return (
        <Container className={hasMention ? 'mention' : ''}>
            <Avatar 
                className={isBot ? 'bot' : ''} 
                style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined }} 
            />
            <Message>
                <Header>
                    <strong>{author}</strong>

                    {isBot && <span>Bot</span>}

                    <time>{date}</time>
                </Header>
                <Content>{content}</Content>
            </Message>
        </Container>
    )
};