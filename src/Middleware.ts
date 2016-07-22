import * as http from "http";

import {IMiddleware} from "./Interfaces/IMiddleware";

class Middleware {
    public middleware: IMiddleware[];

    public use(fn: IMiddleware) {
        this.middleware.push(fn);
        return this;
    }

    public call(req: http.IncomingMessage, res: http.ServerResponse) {
        if (this.middleware === []) {
            return;
        }

        let i = this.middleware.length;
        while (i--) {
            if (this.middleware[i - 1]) {
                this.middleware[i--].call(this, req, res, this.middleware[i]);
            } else {
                this.middleware[i].call(this, req, res);
            }
        }
    }
}

export {Middleware, IMiddleware};
