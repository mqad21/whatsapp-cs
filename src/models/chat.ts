export interface Chat {
  id: string;
  body: string;
  ack: string;
  fromMe: boolean;
  timestamp: number;
  type: string;
}
