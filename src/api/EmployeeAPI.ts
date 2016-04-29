/// <reference path="../../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />

import * as Express from "express";
import {IEmployeeService} from "./../service/IEmployeeService";
import {IEmployeeAPI} from "./IEmployeeAPI";
import {BaseAPI} from "base-api";

import { injectable, inject } from "inversify";

let router: Express.Router = Express.Router();

@injectable()
class EmployeeAPI extends BaseAPI implements IEmployeeAPI {
    private employeeService: IEmployeeService;

    constructor (@inject("IEmployeeService")  employeeService: IEmployeeService) {
        super();
        this.employeeService = employeeService;
    }
    public routes () {

        router.get("/", this.employeeService.retrieve);
        router.get("/:_id", this.employeeService.findById);
        router.post("/", this.employeeService.create);
        router.put("/:_id", this.employeeService.update);
        router.delete("/:_id", this.employeeService.delete);

        return router;
    }
}

Object.seal(EmployeeAPI);
export { EmployeeAPI };
