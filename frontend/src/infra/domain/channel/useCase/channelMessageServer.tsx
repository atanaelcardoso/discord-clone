import type { Props } from '../entity/channel';
import { Container, Avatar, Message, Header, Content } from '../styles/stylesChannelMessage';
export {Mention} from '../styles/stylesChannelMessage'

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