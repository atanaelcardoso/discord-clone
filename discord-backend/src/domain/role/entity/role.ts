export class Role {
  public id: number;
  public name: string;
  public color: string;
  public serverId: number;
  public hoist: boolean;

  constructor(props: Role) {
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
    this.serverId = props.serverId;
    this.hoist = props.hoist;
  }
}