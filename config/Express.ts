/// <reference path="../typings/main.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan  from "morgan";
import * as errorhandler from "errorhandler";

let app:any = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'dev') {
    app.use(errorhandler());
}

// Exporting the express app that will used on other module initialization

export default app;
