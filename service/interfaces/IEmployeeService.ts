import BaseService from "../base/BaseService";
import * as Express from "express";

interface IEmployeeService extends BaseService {
    
    createEmployee: Express.RequestHandler;
    updateEmployee: Express.RequestHandler;
    deleteEmployee: Express.RequestHandler;
    getAll: Express.RequestHandler;
    getEmployee: Express.RequestHandler;
    
}

export default IEmployeeService;