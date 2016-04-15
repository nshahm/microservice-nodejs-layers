/// <reference path="../typings/main.d.ts" />

import * as winston from "winston";
//import * as winstonDailyRotateFile from "winston-daily-rotate-file";
import * as path from "path";


// Not having typings file so for now using require
const dailyRotateFile = require("winston-daily-rotate-file");
 
//const logger = winston.Logger; 

//  winston.transports.Console =  
 
// Console level options.
const consoleTransportOptions = <winston.ConsoleTransportOptions> {
   name : 'console',
   logstash : true,
   debugStdout : true,
   json : true,
   level : 'info',
   prettyPrint : true
};
 
// Daily file rotate options
const dailyRotateFileOptions = <winston.DailyRotateFileTransportOptions> {
    name:'dailyRotateFile',
    colorize : true,
    timestamp : true,
    json :true,
    level : 'info',
    prettyPrint : true,
    showLevel : true,
    maxFiles : 10,
    maxsize : 5242880,
    dirname : "logs",
    datePattern: '.yyyy-MM-ddTHH',
    filename: path.join(__dirname, "logs", "employee.log")
};
 
 
export function initializeLogging() {
    
    // Default console log removed.
    winston.remove(winston.transports.Console);
    
    // Adding console transport
    winston.add(winston.transports.Console, consoleTransportOptions);
    
    // Adding DailyRotateFile transport for file logging.
    winston.add(dailyRotateFile, dailyRotateFileOptions);

    console.log("Winston configured...")
    
};

export default winston;
exports = initializeLogging;



