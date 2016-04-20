import * as Express from "express";
import * as BodyParser from "body-parser";

import IAPI from "./../api/IAPI";
import MongoDB from "./../config/Mongodb"; 

import IMiddlewares from "./IMiddlewares";

import { inject, injectable } from "inversify";

@injectable()
class Middlewares implements IMiddlewares {
    
    private api:IAPI;
    
    constructor(@inject("IAPI") _api:IAPI) {
        this.api = _api;    
    }
    
    config () {
         var app = Express();
         app.use(BodyParser.json());
         app.use(this.api.routes());
         
         return app;
    }    
}
Object.seal(Middlewares);
export default Middlewares;