import {Middleware} from "../src/Middleware";
import {assert} from "chai";

suite("Middleware", function () {
    let middleware: Middleware;
    let count: number;

    let counter =
        (req: any, res: any, next: any) => {
            count++;
            if (next) { next(req, res); }
        };
    let badCounter =
        (req: any, res: any, next: any) => {
            count++;
        };

    setup(function () {
        middleware = new Middleware();
        count = 0;
    });

    test("should work with zero", function () {
        middleware
            .call(null, null);

        assert.equal(count, 0);
    });

    test("should work with one", function () {
        middleware
            .use(counter)
            .call(null, null);

        assert.equal(count, 1);
    });

    test("should work with two (one next)", function () {
        middleware
            .use(counter)
            .use(counter)
            .call(null, null);

        assert.equal(count, 2);
    });

    test("should fail with two (zero next)", function () {
        middleware
            .use(counter)
            .use(badCounter)
            .call(null, null);

        assert.notEqual(count, 2);
    });

    test("should work with three (two next)", function () {
        middleware
            .use(counter)
            .use(counter)
            .use(counter)
            .call(null, null);

        assert.equal(count, 3);
    });
});
