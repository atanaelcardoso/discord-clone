export interface UserBackend {
    id: number;
    nickname: string;
    avatar: string ;
    isBot: boolean;
}
export interface UserProps {
    nickname: string;
    isBot?: boolean;
    avatarUrl?: string;
}