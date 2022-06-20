import { Transform } from "stream";
import { Switcher } from "./websocket";


export class Messagetransform extends Transform {
    constructor(){
        super();
    }
    async _transform(chunk:Buffer, encoding:string, callback:any) {
      try {    
        let transform = await Switcher(chunk.toString().trim().split(" "))
        callback(null, transform);
      } catch (err) {
        callback(err);
      }
    }
  }