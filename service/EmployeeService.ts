import BaseService  from "./base/BaseService";
import {Request, Response} from "express";
import Employee from "../data/Employee";

/**
 * Employee Service is used to write any business validation 
 * and the bridge between API and Data access layer
 */
export default class EmployeeService extends BaseService {
    
    employee:Employee = new Employee();
    
    /**
     * Get all employees
     */
    public getAll(req:Request, res:Response) {
        this.employee.createEmployee(req, res);
    }
    
    /**
     * Get Employee by Id
     */
    public getEmployee(req:Request, res:Response) {
        console.log("getEmployee() in employee api invoked");
        res.send("getEmployee() in employee api invoked");
    }
    
    /**
     * Updatae Employee
     */
    public updateEmployee(req:Request, res:Response) {
        console.log("updateEmployee() in employee api invoked");
        res.send('updateEmployee() method invoked');
    }    
    
    /**
     * Delete Employee
     */
    public deleteEmployee(req:Request, res:Response) {
        console.log("deleteEmployee() in employee api invoked");
        res.send('deleteEmployee() method invoked');
    }     
    
    /**
     * Employee exists
     */
    public exists(req:Request, res:Response) {
        console.log("exists() in employee api invoked");
        res.send('exists() method invoked');
    }   
    
    /**
     * Create Employee
     */
    public createEmployee(req:Request, res:Response) {
        new Employee().createEmployee(req, res);
    }
}