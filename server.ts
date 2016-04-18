/// <reference path="./typings/main.d.ts" />


//import * as config  from "config";
import app from "./config/Express";
import {initializeLogging } from './config/Logger';
import Mongodb from "./config/Mongodb";
import Middlewares from "./middlewares/base/BaseMiddlewares";

/**
 * Initialize logging
 * TODO - Eventually This will a logging client to logging service running 
 * separately to enter logs in Mongodb 
 */
initializeLogging();

/**
 * initilize MongoDB 
 */
Mongodb.initialize();


/*app.use('/', (req, res, next) => {
    console.log("middleware function called from server.ts");
    next();
})*/

app.use(Middlewares.configuration);

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

