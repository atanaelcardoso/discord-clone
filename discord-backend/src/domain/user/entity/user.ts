export class User {
  public id: number;
  public nickname: string;
  public avatar: string | null;
  public isBot: boolean;
  public email: string;

  constructor(props: User) {
    this.id = props.id;
    this.nickname = props.nickname;
    this.avatar = props.avatar;
    this.isBot = props.isBot;
    this.email = props.email;
  }
}