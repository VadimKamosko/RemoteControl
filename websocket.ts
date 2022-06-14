import WebSocket from "ws";
import robot from "./index";

const wsServer = new WebSocket.Server({ port: 9000 });

wsServer.on("connection", onConnect);

function onConnect(wsClient: WebSocket.WebSocket) {
  console.log("Новый пользователь");
  wsClient.send("Привет");
  wsClient.on("message", function (message: string) {
    Switcher(message.toString().trim().split(" "), wsClient);
  });
  wsClient.on("close", function () {
    console.log("Пользователь отключился");
  });
}

function Switcher(message: string[], wsClient: WebSocket.WebSocket) {
  try {
    switch (message[0]) {
      case "mouse_down":
        robot.MouseMove(0, +message[1]);
        break;
      case "mouse_up":
        robot.MouseMove(0, +message[1] * -1);
        break;
      case "mouse_left":
        robot.MouseMove(+message[1] * -1);
        break;
      case "mouse_left":
        robot.MouseMove(+message[1] * -1);
        break;
      case "mouse_coord":
        wsClient.send(robot.SendMousePos());
        break;
      case "draw_circle":
        robot.DrawCircle(+message[1]);
        break;
      case "draw_rectangle":
        robot.DrawRectangle(+message[1], +message[2]);
        break;
      case "draw_square ":
        robot.DrawRectangle(+message[1]);
        break;
      case "prnt_scrn ":
        robot.PrintScreen().pipe(wsClient.send)
        //wsClient.send(robot.PrintScreen());
        break;
      default:
        console.log("Неизвестная команда");
        break;
    }
  } catch (error) {
    console.log("Ошибка", error);
  }
}
