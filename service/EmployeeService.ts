import BaseService  from "./base/BaseService";
import {Request, Response} from "express";
import Employee from "../dal/EmployeeDAL";

/**
 * Employee Service is used to write any business validation
 * and the bridge between API and Data access layer
 */
export default class EmployeeService extends BaseService {

    // TODO - Find a way to not to create new instance.

    /**
     * Create Employee
     */
    public createEmployee(req:Request, res:Response) {
        new Employee().createEmployee(req, res);
    }

    /**
     * Get all employees
     */
    public getAll(req:Request, res:Response) {
        new Employee().getAllEmployee(req, res);
    }

    /**
     * Get Employee by Id
     */
    public getEmployee(req:Request, res:Response) {
        new Employee().getEmployeeByID(req, res);
    }

    /**
     * Updatae Employee
     */
    public updateEmployee(req:Request, res:Response) {
        new Employee().updateEmployee(req, res);
    }

    /**
     * Delete Employee
     */
    public deleteEmployee(req:Request, res:Response) {
        new Employee().deleteEmployee(req, res);
    }

    /**
     * Employee exists
     */
    public exists(req:Request, res:Response) {
        console.log("exists() in employee api invoked");
        res.send('exists() method invoked');
    }
}
