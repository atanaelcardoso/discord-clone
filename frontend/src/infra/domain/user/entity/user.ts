// entity
export interface User {
  id: number;
  nickname: string;
  avatar: string;
  isBot: boolean;
}

// propriedades para serem utilizadas no caso de uso ou API
export interface UserProps {
    nickname: string;
    isBot?: boolean;
    avatarUrl?: string;
}