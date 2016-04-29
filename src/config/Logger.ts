/// <reference path="../../typings/main.d.ts" />

import * as winston from "winston";
// import * as winstonDailyRotateFile from "winston-daily-rotate-file";
import * as path from "path";

// Not having typings file so for now using require
let dailyRotateFile = require("winston-daily-rotate-file");

// Console level options.
const consoleTransportOptions = <winston.ConsoleTransportOptions> {
   debugStdout : true,
   json : true,
   level : "info",
   logstash : true,
   name : "console",
   prettyPrint : true,
};

const exceptionFileOption = <winston.FileTransportOptions> {
    colorize : true,
    datePattern : ".yyyy-MM-ddTHH",
    dirname : "logs",
    filename : path.join(__dirname, "logs", "all.log"),
    level : "silly",
    name : "exception",
};

const unHandledExceptionOptions = <winston.FileTransportOptions> {
    colorize : true,
    datePattern: ".yyyy-MM-ddTHH",
    dirname : "logs",
    filename: path.join(__dirname, "logs", "unhandled-exceptions.log"),
    level: "error",
    name : "unhandled-exception",
};

// Daily file rotate options
const dailyRotateFileOptions = <winston.DailyRotateFileTransportOptions> {
    colorize : true,
    datePattern: ".yyyy-MM-ddTHH",
    dirname : "logs",
    filename: path.join(__dirname, "logs", "all.log"),
    json : true,
    level : "info",
    maxFiles : 10,
    maxsize : 5242880,
    name : "dailyRotateFile",
    prettyPrint : true,
    showLevel : true,
    timestamp : true,
};

export function initializeLogging() {

    // Default console log removed.
    winston.remove(winston.transports.Console);

    // Adding console transport
    winston.add(winston.transports.Console, consoleTransportOptions);

    // Adding file transport
    winston.add(winston.transports.File, exceptionFileOption);
    winston.add(winston.transports.File, unHandledExceptionOptions);

    // Adding DailyRotateFile transport for file logging.
    winston.add(dailyRotateFile, dailyRotateFileOptions);

    winston.addColors("debug");
    winston.handleExceptions(winston.transports.Console, winston.transports.File);
    winston.unhandleExceptions(winston.transports.Console, winston.transports.File);
    // console.log("Winston configured...")

};

export default winston;
exports = initializeLogging;
