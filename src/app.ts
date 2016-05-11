import * as express from "express";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
import { Mongodb} from "./config/Mongodb";
import * as morgan  from "morgan";
import * as Config from "config";
import { getInstance } from "./inversify.config";
import { Logger } from "logger";
import { IAPI } from "./api/IAPI";
// import "./config/Mongodb";

let app: any = express(),
    api: IAPI = getInstance<IAPI>("IAPI"),
    loggerConfig: any = Config.get("logger"),
    dbConfig: any = Config.get("mongodb"),
    mongodb: Mongodb;

/**
 * Initialize Logger
 */
Logger.init(loggerConfig);

/**
 * Initialize Mongodb
 */
mongodb = new Mongodb(dbConfig);
mongodb.connect();

/** If the Node process ends, close the Mongoose connection */
process.on("SIGINT", mongodb.exit)
       .on("SIGTERM", mongodb.exit);

/** App Middlewares */
app.use(function (req, res, next) {
    next();
});

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(api.routes());

app.use(morgan("combined", { "stream": { write: (message) => { Logger.info(message); } } }));

app.use(function (err, req, res, next) {
    Logger.info(err.stack);
    res.status(500).send({
        "status": "internal error",
        "message": err.stack,
    });
});


/** Handle uncaughtException through out the application */
process.on("uncaughtException", function(err) {
    /** Server going to crash !!! Sending alert to configured mail. */
    console.log("Exception at :  " + new Date() + err);
});



/** start the app by listening to the port */
const port = process.env.PORT ? process.env.PORT : 8888;
app.listen(port);
console.log("Server listening on port " + port);
