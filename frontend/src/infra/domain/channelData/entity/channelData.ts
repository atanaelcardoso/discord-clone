export interface MessageBackend {
    id: number;
    content: string;
    createdAt: string;
    channelId: number;
    user: {
        nickname: string;
        isBot: boolean;
        avatar: string | null;
    }
}