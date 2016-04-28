/// <reference path="./typings/main.d.ts" />

/** Import libraries */ 
import * as express from "express";
import { kernel, getInstance } from "./inversify.config";
/** Import preivate npm packages */
import {IMiddlewares} from "base-middlewares";
/** Import files */
import {initializeLogging } from './config/Logger';
import {IAPI} from "./api/IAPI";

let app:any = express(),
    _api:IAPI = getInstance<IAPI>("IAPI"),
    _middlewares = getInstance<IMiddlewares>("IMiddlewares");

/**
 * Initialize logging
 * TODO - Eventually This will a logging client to logging service running 
 * separately to enter logs in Mongodb 
 */
initializeLogging();

/** Establish mongoDB database connection */
require(__dirname + "/config/Mongodb");

app.use(_middlewares.config(_api.routes()));

/** Handle uncaughtException through out the application */
process.on('uncaughtException', function(err) {
    console.error('Exception at :  ' + new Date() + err);
});

/**
 * Initilizing server with serverHost and serverPort.
 */
const serverHost = process.env.HOST || '0.0.0.0';
const serverPort = process.env.PORT || 8080;

let server = app.listen (serverPort, serverHost, () => {
  
    const host:string = server.address().address;
    const port:number = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});

