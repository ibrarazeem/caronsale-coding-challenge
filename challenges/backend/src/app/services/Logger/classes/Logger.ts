import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {

    // public constructor() {}


    public log(message: string): void {
        // tslint:disable-next-line: no-console
        console.log(`[LOG]: ${message}`);
    }

}
