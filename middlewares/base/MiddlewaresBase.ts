import * as Express from "express";
import * as BodyParser from "body-parser";

import BaseAPI from "./../../api//base/BaseAPI";
import MongoDB from "./../../config/Mongodb"; 


class MiddlewaresBase {
    
    static get configuration () {
         var app = Express();
         app.use(BodyParser.json());
         app.use(new BaseAPI().routes);
         
         return app;
    }    
}
Object.seal(MiddlewaresBase);
export default MiddlewaresBase;