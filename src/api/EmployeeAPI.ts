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
        router.get("/:id", this.employeeService.findById);
        router.post("/", this.employeeService.create);
        router.put("/:id", this.employeeService.update);
        router.delete("/:id", this.employeeService.delete);

        return router;
    }
}

Object.seal(EmployeeAPI);
export { EmployeeAPI };
