import robot from "robotjs";

function MouseMove(mX: number = 0, mY: number = 0) {
  robot.moveMouse(robot.getMousePos().x + mX, robot.getMousePos().y + mY);
}

function SendMousePos(mX: number = 0, mY: number = 0) {
  let pos = robot.getMousePos();
  return `${pos.x},${pos.y}`;
}

export = {
  SendMousePos,
  MouseMove,
};
