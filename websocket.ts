import { Messagetransform } from "./transform";
import { WriteMsg } from './write';
import stream from 'stream';
import WebSocket from "ws";

export function onConnect(wsClient: WebSocket.WebSocket) {
    const readable = new stream.Readable({
      read(){}
    });
    const msgTr=new Messagetransform();
    const writeMsg = new WriteMsg(wsClient);
    
    console.log("Новый пользователь");
    wsClient.send("Привет");
    wsClient.on("message", function (message: string) {
      readable.push( message );
    });
    readable.pipe(msgTr).pipe(writeMsg);
  
    wsClient.on("close", function () {
      console.log("Пользователь отключился");
    });
  }
  