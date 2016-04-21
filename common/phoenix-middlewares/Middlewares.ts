import * as Express from "express";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
import * as morgan  from "morgan";
import * as errorhandler from "errorhandler";
import {IAPI} from "./../../api/IAPI";
import {IMiddlewares} from "./IMiddlewares";
import { inject, injectable } from "inversify";
import winston from "../../config/Logger";

@injectable()
class Middlewares implements IMiddlewares {
    
    private api:IAPI;
    
    constructor(@inject("IAPI") _api:IAPI) {
        this.api = _api;    
    }
    
    config () {
         var app = Express();
         app.use(BodyParser.urlencoded({ extended: false }));
         app.use(BodyParser.json());
         app.use(CookieParser());
         app.use(this.api.routes());
         
         app.use(morgan("combined", { "stream": { write: (message) => { winston.info(message) }}}));

        if (process.env.NODE_ENV === 'dev') {
            app.use(errorhandler());
        }
        
        app.use((req, res, next) => {
            console.log("middleware function called");
            next();
        })
        return app;
    }    
}
Object.seal(Middlewares);
export {Middlewares};