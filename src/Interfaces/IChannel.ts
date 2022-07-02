export interface IChannel {
  id: string;
  type: string;
  name: string;
  parent: string | undefined;
  position: number;
}
