import Jimp from "jimp";
import robot from "robotjs";

export function getPrintScreen(): Promise<Buffer> {
  let pos = robot.getMousePos();
  let bitmap = robot.screen.capture(pos.x - 100, pos.y - 100, 200, 200).image;

  return new Promise((res, rej) => {
    new Jimp(
      { data: bitmap, width: 200, height: 200 },
      (err: any, image: any) => {
        image.scan(
          0,
          0,
          image.bitmap.width,
          image.bitmap.height,
          function (x: number, y: number, i: number) {
            if (i % 4 === 0) {
              [image.bitmap.data[i], image.bitmap.data[i + 2]] = [
                image.bitmap.data[i + 2],
                image.bitmap.data[i],
              ];
            }
            if (x == 200 - 1 && y == 200 - 1) {
              image.getBuffer(Jimp.MIME_PNG, (err: any, buffer: any) => {
                res(buffer.toString("base64"));
              });
            }
          }
        );
      }
    );
  });
}
