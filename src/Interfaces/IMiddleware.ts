import * as http from "http";

export interface IMiddleware {
    (req: http.IncomingMessage,
     res: http.ServerResponse,
     next: IMiddleware | any): any;
}
