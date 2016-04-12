import { IBaseAPI } from "./IBaseAPI";
//import app from "../../config/Express";

/**
 * Abstract BaseAPI - This class will contain all the methods that are commonly used accross API layer.
 */
export abstract class AbstractBaseAPI implements IBaseAPI {
    
    protected router:any;
    
    protected routerMiddleware():void {
    
        // this.router.use("/", (req, res, next) => {
        //     console.log("routerMiddleware - common to all router")         
        //     next();
        // });    
    } 
   
    /** 
     * Creating the routes specific to API using the router object.
     */
    abstract createRoutes(router);
    
    constructor(app:any) {
      this.router = app.route;
      //this.routerMiddleware();
    }
    
}