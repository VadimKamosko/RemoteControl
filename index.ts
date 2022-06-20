import Jimp from "jimp";
import robot from "robotjs";

function PrintScreen() {
  let pos = robot.getMousePos();
  let bitmap = robot.screen.capture(pos.x - 100, pos.y - 100, 200, 200).image;

  return new Promise((res, rej) => {
    new Jimp({ data: bitmap, width: 200, height: 200 }, (err: any, image: any) => {
      image.getBuffer(Jimp.MIME_PNG, (err: any, buffer: any) => {       
        res(buffer.toString("base64"));
      });
    });
  });
}

function MouseMove(mX: number = 0, mY: number = 0) {
  robot.moveMouse(robot.getMousePos().x + mX, robot.getMousePos().y + mY);
}
function SendMousePos(mX: number = 0, mY: number = 0) {
  let pos =robot.getMousePos()
  return `${pos.x},${pos.y}`
  // let pos = Buffer.from(JSON.stringify(robot.getMousePos()));
  // return new Screenreader(pos, { highWaterMark: 2 });
}

function DrawCircle(radius: number) {
  const mousePos = robot.getMousePos();
  let x = mousePos.x + radius * Math.cos(0);
  let y = mousePos.y + radius * Math.sin(0);
  robot.moveMouse(x, y);
  robot.mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    x = mousePos.x + radius * Math.cos(i);
    y = mousePos.y + radius * Math.sin(i);

    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
}

function DrawRectangle(widthRec: number, heightRec?: number) {
  if (!heightRec) {
    heightRec = widthRec;
  }
  const mousePos = robot.getMousePos();
  robot.mouseToggle("down");
  robot.moveMouseSmooth(mousePos.x + widthRec, mousePos.y, 10);
  robot.moveMouseSmooth(mousePos.x + widthRec, mousePos.y + heightRec, 10);
  robot.moveMouseSmooth(mousePos.x, mousePos.y + heightRec, 10);
  robot.moveMouseSmooth(mousePos.x, mousePos.y, 10);
  robot.mouseToggle("up");
}

export = {
  DrawRectangle,
  DrawCircle,
  SendMousePos,
  MouseMove,
  PrintScreen,
};
