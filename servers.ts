import {httpServer} from './server/sever'
import WebSocket from "ws";
import { onConnect } from './websocket';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);



const wsServer = new WebSocket.Server({ port: 8080 }, () => {
  console.log(`WebSocket start on 8080 port`);
});

wsServer.on("connection", onConnect);



