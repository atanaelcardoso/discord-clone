export interface User {
  id: number;
  nickname: string;
  avatar: string | null;
  isBot: boolean;
  email: string;
  password: string;
}