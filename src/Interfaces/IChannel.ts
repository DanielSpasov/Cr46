export interface IChannel {
  id: string;
  type: string;
  name: string;
  parent: string | null;
  position: number;
}
