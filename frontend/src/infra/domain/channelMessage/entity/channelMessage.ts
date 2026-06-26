export interface Props {
    author: string;
    date: string;
    content: string | React.ReactNode | React.ReactNode;
    hasMention?: boolean;
    isBot?: boolean;
    avatarUrl?: string | null;
}