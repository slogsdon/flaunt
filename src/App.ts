import {IRouteList} from "./IRouteList";
import * as http from "http";

export class App {
    public routes: IRouteList;

    constructor() {
        this.routes = {};
    }

    public route(route: string) {
        return (target: Object, property: string | symbol) => {
            this.routes[route] = (<any> target)[property];
        };
    }

    public run() {
        http
            .createServer(this.handle.bind(this))
            .listen(8000);
    }

    protected handle(req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            this.routes[req.url](req, res);
        } catch (e) {
            res.statusCode = 404;
            res.statusMessage = "Not found";
        }
        res.end();
    }
}
