import * as Express from "express";
import { IEmployeeAPI } from "./IEmployeeAPI";
import {IAPI} from "./IAPI";
import { inject, injectable } from "inversify";


const app:Express.Express = Express();
/**
 * This class is to add all the different API as part of this microservices.
 */
@injectable()
class API implements IAPI {
    private employeeAPI:IEmployeeAPI
    
    constructor(@inject("IEmployeeAPI") employeeAPI:IEmployeeAPI) {
        this.employeeAPI = employeeAPI;
    }
    
    routes() {
        app.use("/v1/employee/", this.employeeAPI.routes());
        return app;
    }
}
export default API;