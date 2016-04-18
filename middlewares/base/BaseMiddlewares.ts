import * as Express from "express";
import * as BodyParser from "body-parser";

import API from "./../../api/API";
import MongoDB from "./../../config/Mongodb"; 


class BaseMiddlewares {
    
    static get configuration () {
         var app = Express();
         app.use(BodyParser.json());
         app.use(new API().routes);
         
         return app;
    }    
}
Object.seal(BaseMiddlewares);
export default BaseMiddlewares;