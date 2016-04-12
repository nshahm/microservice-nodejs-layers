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
        router.get('/employee', employeeService.getAll);
        router.get('/employee/:id', employeeService.getEmployee);
        router.post('/employee', employeeService.createEmployee);
        router.put('/employee/:id', employeeService.updateEmployee);
        router.delete('/employee/:id', employeeService.deleteEmployee);
        router.get('/employee/:id/exists', employeeService.exists);
    }
    
    
};
export default this.router;

