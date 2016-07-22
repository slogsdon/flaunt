import * as cluster from "cluster";
import * as http from "http";
import * as os from "os";

import {App} from "./App";

let app = new App();
const numCPUs = process.env.NODE_THREADS || os.cpus().length;

export class Main {
    private value: boolean;

    constructor() {
        this.value = true;
    }

    @app.route("/")
    public home(req: http.IncomingMessage, res: http.ServerResponse) {
        res.write("home");
    }

    public run() {
        app.run();
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
}
