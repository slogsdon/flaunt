import * as http from "http";
import {App} from "../src/App";

let app = new App();

export class Main {
    @app.route("/")
    public home(req: http.IncomingMessage, res: http.ServerResponse) {
        res.write("home");
    }

    public run() {
        app.run();
    }
}

app.run();