import React from 'react';

import { Container, Avatar, Message, Header, Content } from './styles';
export { Mention} from './styles';

export interface Props {
    author: string;
    date: string;
    content: string | React.ReactNode | React.ReactNode;
    hasMention?: boolean;
    isBot?: boolean;
    avatarUrl?: string | null;
}

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