export interface ChannelButtonProps {
    ChannelName: string;
    selected?: boolean;
}

export interface MessageBackend {
    id: number;
    name: string;
    content: string;
    createdAt: string;
    channelId: number;
    user: {
        nickname: string;
        isBot: boolean;
        avatar: string | null;
    }
}

export interface ChannelInfoProps {
    title?: string;
    description?: string;
}

export interface channel {
    id: number;
    name: string;
}

export interface Props {
    author: string;
    date: string;
    content: string | React.ReactNode | React.ReactNode;
    hasMention?: boolean;
    isBot?: boolean;
    avatarUrl?: string | null;
}