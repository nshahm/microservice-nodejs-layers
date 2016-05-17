import * as express from "express";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";

import { getInstance } from "../src/inversify.config";
import { IAPI } from "../src/api/IAPI";

let app: any = express(),
    api: IAPI = getInstance<IAPI>("IAPI");

/** App Middlewares */
app.use(function (req, res, next) {
    next();
});

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(api.routes());

/** start the app by listening to the port for running testcase*/
const port = process.env.PORT ? process.env.PORT : 8888;
app.listen(port);
console.log("Testcase API Server listening on port " + port);

export {app };
