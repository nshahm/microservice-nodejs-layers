/// <reference path="../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />

import * as Express from "express";
import {IEmployeeService} from "./../service/IEmployeeService";
import {IEmployeeAPI} from "./IEmployeeAPI";
import {BaseAPI} from "base-api";

import { injectable, inject } from "inversify";

var router = Express.Router();

@injectable()
class EmployeeAPI extends BaseAPI implements IEmployeeAPI {
    private _employeeService: IEmployeeService;
    
    constructor (@inject("IEmployeeService")  employeeService:IEmployeeService) {
        super();
        this._employeeService = employeeService;   
    }
    routes () {
        
        router.get("/", this._employeeService.retrieve);
        router.get("/:_id", this._employeeService.findById);
        router.post("/", this._employeeService.create);
        router.put("/:_id", this._employeeService.update);        
        router.delete("/:_id", this._employeeService.delete);
        router.get("/employeeId/:employeeID", this._employeeService.findByEmployeeId);
        
        return router;
    }
}

Object.seal(EmployeeAPI);
export default EmployeeAPI;