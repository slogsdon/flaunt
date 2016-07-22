import * as http from "http";
import * as cluster from "cluster";
import * as os from "os";

import {IRouteList} from "./Interfaces/IRouteList";
import {Middleware, IMiddleware} from "./Middleware";
import {Mixin} from "./Utility/Mixins";

const numCPUs = process.env.NODE_THREADS || os.cpus().length;

@Mixin([Middleware])
export class App implements Middleware {
    public routes: IRouteList = {};
    public middleware: IMiddleware[] = [];
    public use: (m: IMiddleware) => this;
    public call: (req: http.IncomingMessage, res: http.ServerResponse) => void;

    constructor() {
        this.use(this.handle.bind(this));
    }

    public route(route: string) {
        return (target: Object, property: string | symbol) => {
            this.routes[route] = (<any> target)[property];
        };
    }

    public run() {
        http
            .createServer(this.call.bind(this))
            .listen(8000);
    }

    public runClustered() {
        if (cluster.isMaster && numCPUs > 1) {
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
        } else {
            this.run();
        }
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
