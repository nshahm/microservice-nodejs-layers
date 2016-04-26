import {IBaseService} from "base-service";
import * as Express from "express";

interface IEmployeeService extends IBaseService {
    
    findByEmployeeId(req, res);
}

export {IEmployeeService};