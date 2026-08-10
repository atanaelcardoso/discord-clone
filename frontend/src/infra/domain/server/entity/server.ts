export interface ServerButtonProps {
    selected?: boolean;
    isHome?: boolean;
    hasNotifications?: boolean;
    mentions?: number;
    title?: string; 
}

export interface ServerData {
    id: number;
    nickname: string;
    icon?: string;
}