/// <reference path="./typings/main.d.ts" />

import * as express from "express";
import {initializeLogging } from './config/Logger';
import {IMiddlewares} from "./common/phoenix-middlewares/IMiddlewares";
import kernel, { getInstance } from "./inversify.config";
import {IAPI} from "./api/IAPI";

let app:any = express();

/**
 * Initialize logging
 * TODO - Eventually This will a logging client to logging service running 
 * separately to enter logs in Mongodb 
 */
initializeLogging();


/** establish mongo database connection */
require(__dirname + "/config/Mongodb");

//const API:IAPI = getInstance<IAPI>("IAPI");

app.use(getInstance<IMiddlewares>("IMiddlewares").config());

/**
 * Initilizing server with serverport and serverHost.
 */
const serverHost = process.env.HOST || '0.0.0.0';
const serverPort = process.env.PORT || 8080

let server = app.listen (serverPort, serverHost, () => {
    const host:string = server.address().address;
    const port:number = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});

