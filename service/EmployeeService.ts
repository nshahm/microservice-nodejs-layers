import BaseService  from "./base/BaseService";
import {Request, Response} from "express";
import EmployeeDAO = require("../dal/EmployeeDAO");

/**
 * EmployeeService
 * 
 * Employee Service is used to write any business validation
 * and the bridge between API and Data access layer
 */
export default class EmployeeService extends BaseService {

    /**
     * Create Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public createEmployee(req:Request, res:Response) {
        EmployeeDAO.createEmployee(req, res);
    }

    /**
     * Get all employees
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public getAll(req:Request, res:Response) {
        EmployeeDAO.getEmployees(req, res);
    }

    /**
     * Get Employee by Id
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public getEmployee(req:Request, res:Response) {
        EmployeeDAO.getEmployeeByID(req, res);
    }

    /**
     * Updatae Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public updateEmployee(req:Request, res:Response) {
        EmployeeDAO.updateEmployee(req, res);
    }

    /**
     * Delete Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public deleteEmployee(req:Request, res:Response) {
        EmployeeDAO.deleteEmployee(req, res);
    }

    /**
     * Employee exists
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public exists(req:Request, res:Response) {
        EmployeeDAO.findEmployeeByName(req, res);
    }
}
