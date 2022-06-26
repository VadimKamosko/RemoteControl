import { getPrintScreen } from "../robot/screen";
import draw from "../robot/draw";
import mouse from "../robot/mouse";

export async function Switcher(message: string[]) {
  try {
    switch (message[0]) {
      case "mouse_down":
        mouse.MouseMove(0, +message[1]);
        return "mouse_down";

      case "mouse_up":
        mouse.MouseMove(0, +message[1] * -1);
        return "mouse_up";

      case "mouse_left":
        mouse.MouseMove(+message[1] * -1);
        return "mouse_left";

      case "mouse_right":
        mouse.MouseMove(+message[1]);
        return "mouse_right";

      case "mouse_position":
        const ans = `mouse_position ${mouse.SendMousePos()}`;
        console.log(`Result: ${ans}`);
        return ans + '\0';

      case "draw_circle":
        draw.DrawCircle(+message[1]);
        return "draw_circle";

      case "draw_rectangle":
        draw.DrawRectangle(+message[1], +message[2]);
        return "draw_rectangle";

      case "draw_square":
        draw.DrawRectangle(+message[1]);
        return "draw_square";

      case "prnt_scrn":
        const png = await getPrintScreen();
        const ansPng = `prnt_scrn ${png}`;
        console.log(`Result: ${ansPng}`);
        return ansPng + '\0';
      default:
        console.log("Result: неизвестная команда");
        break;
    }
  } catch (error) {
    console.log(`Result: ${error}`);
  }
}
