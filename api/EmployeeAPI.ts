import { AbstractBaseAPI } from "./base/AbstractBaseAPI";
import  EmployeeService from "../service/EmployeeService";
import * as express from "express";

class EmployeeAPI extends AbstractBaseAPI {
    constructor(app:any) {
        super(app);
    }

    createRoutes(router) {

        //Creating a instance for EmployeeService
        let employeeService = new EmployeeService();

        if (router == null) {
            throw Error("router is null");
        }

        /**
         * Adding routes to employee service
         */
        router.get('/employee', employeeService.retrieve);
        router.get('/employee/:id', employeeService.findById);
        router.post('/employee', employeeService.create);
        router.put('/employee/:id', employeeService.update);
        router.delete('/employee/:id', employeeService.delete);
    }
};
export default this.router;
