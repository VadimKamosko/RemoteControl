import { Writable } from "stream";
import WebSocket from "ws";
export interface WriteMsg {
  wsClient: WebSocket.WebSocket;
}

export class WriteMsg extends Writable {
  constructor(wsClient: WebSocket.WebSocket) {
    super();
    this.wsClient =wsClient;
  }

  _write(chunk:Buffer,encoding: any,callback: () => void) {    
    this.wsClient.send(chunk.toString())
    callback();
  }

}
