import {httpServer} from './server/sever'
import stream from 'stream';
import WebSocket from "ws";
import robot from "./index";
import { Messagetransform } from "./transform";
import { WriteMsg } from './write';



const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);



const wsServer = new WebSocket.Server({ port: 8080 }, () => {
  console.log(`WebSocket start on 8080 port`);
});

wsServer.on("connection", onConnect);

function onConnect(wsClient: WebSocket.WebSocket) {
  console.log("Новый пользователь");
  wsClient.send("Привет");
  const readable = new stream.Readable({
    read(){}
  });
  let msgTr=new Messagetransform();
  let writeMsg = new WriteMsg(wsClient);
  wsClient.on("message", function (message: string) {
    readable.push( message );
   // Switcher(message.toString().trim().split(" "), wsClient);
  });
  readable.pipe(msgTr).pipe(writeMsg);

  wsClient.on("close", function () {
    console.log("Пользователь отключился");
  });
}

export async function Switcher(message: string[]) {
  try {
    switch (message[0]) {
      case "mouse_down":
        robot.MouseMove(0, +message[1]);
        return "mouse_down"

      case "mouse_up":
        robot.MouseMove(0, +message[1] * -1);
        return "mouse_up"

      case "mouse_left":
        robot.MouseMove(+message[1] * -1);
        return "mouse_left";

      case "mouse_right":
        robot.MouseMove(+message[1]);
        return "mouse_right";

      case "mouse_position":
        // wsClient.send(JSON.stringify(robot.SendMousePos()));
        return `mouse_position ${robot.SendMousePos()}`;

      case "draw_circle":
        robot.DrawCircle(+message[1]);
        return 'draw_circle';

      case "draw_rectangle":
        robot.DrawRectangle(+message[1], +message[2]);
        return "draw_rectangle";

      case "draw_square":
        robot.DrawRectangle(+message[1]);
        return "draw_square";

      case "prnt_scrn":
        let png = await robot.PrintScreen();
        return `prnt_scrn ${png}`
          // wsClient.send(JSON.stringify(res));
        break;
      default:
        console.log("Неизвестная команда");
        break;
    }
  } catch (error) {
    console.log("Ошибка", error);
  }
}
