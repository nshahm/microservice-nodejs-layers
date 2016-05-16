import * as express from "express";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
// import { mongodb} from "./Testing";
import { getInstance } from "../src/inversify.config";
import { IAPI } from "../src/api/IAPI";
// import "./config/Mongodb";

let app: any = express(),
    api: IAPI = getInstance<IAPI>("IAPI");
    // loggerConfig: any = Config.get("logger"),



// /**
//  * Initialize Logger
//  */
// Logger.init(loggerConfig);

/**
 * Initialize Mongodb
 */
// mongodb.connect();

/** If the Node process ends, close the Mongoose connection */
// process.on("SIGINT", mongodb.exit)
//        .on("SIGTERM", mongodb.exit);

/** App Middlewares */
app.use(function (req, res, next) {
    next();
});

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(api.routes());

// app.use(morgan("combined", { "stream": { write: (message) => { Logger.info(message); } } }));

// app.use(function (err, req, res, next) {
//     Logger.info(err.stack);
//     res.status(500).send({
//         "status": "internal error",
//         "message": err.stack,
//     });
// });

/** start the app by listening to the port for running testcase*/
const port = process.env.PORT ? process.env.PORT : 8888;
app.listen(port);
console.log("Testcase API Server listening on port " + port);

export {app };
