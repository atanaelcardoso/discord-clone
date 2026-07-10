export interface User {
  id: number;
  nickname: string;
  name: string;
  avatar: string;
  isBot: boolean;
}
export interface UserProps {
  nickname: string;
  isBot?: boolean;
  avatarUrl?: string;
}
