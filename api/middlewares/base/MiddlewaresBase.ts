import * as Express from "express";
import * as BodyParser from "body-parser";

import BaseRoutes from "./../../routes/base/BaseRoutes"; 


class MiddlewaresBase {
    
    static get configuration () {
         var app = Express();
         app.use(BodyParser.json());
         app.use(new BaseRoutes().routes);
         
         return app;
    }    
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;