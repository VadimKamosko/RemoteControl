import { createWriteStream, write } from "fs";
import robot from "robotjs";

// Speed up the mouse.
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = screenSize.height / 2 - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++) {
//   let y = height * Math.sin((twoPI * x) / width) + height;
//   robot.moveMouse(x, y);
// }
function PrintScreen() {
  let size = robot.getScreenSize();

  let b = robot.screen.capture(0, 0, size.width, size.height);

  return b.image;
  //   let Write = createWriteStream("C:\\Users\\User\\Desktop\\screen.bmp");

  //   Write.write(b.image.toString("base64"));
}

function MouseMove(mX: number = 0, mY: number = 0) {
  robot.moveMouse(robot.getMousePos().x + mX, robot.getMousePos().y + mY);
}
function SendMousePos(mX: number = 0, mY: number = 0) {
  return robot.getMousePos();
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

DrawRectangle(200);
