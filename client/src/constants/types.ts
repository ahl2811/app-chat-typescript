export interface IMessage {
  message: string;
  username: string;
  time: string;
}

export interface IRoomObject {
  [key: string]: { name: string };
}
