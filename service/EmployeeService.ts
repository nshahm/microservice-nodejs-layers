import IEmployeeService  from "./IEmployeeService";
import {Request, Response} from "express";
import IEmployeeModel from "./../dal/model/IEmployeeModel";
import EmployeeDAO from "./../dal/EmployeeDAO";
import ServiceResponse from "../helpers/error/Response"
import Constants from "../helpers/constants/Constants"


/**
 * EmployeeService
 * 
 * Employee Service is used to write any business validation
 * and the bridge between API and Data access layer
 */
class EmployeeService implements IEmployeeService {

    /**
     * Create Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public create(req:Request, res:Response) {
        try {
            var employee: IEmployeeModel = <IEmployeeModel>req.body;
            var employeeDataAccess = new EmployeeDAO();
            employeeDataAccess.create(employee, (error, result) => {
                if (error) {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.EMPLOYEE_CREATE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, Constants.SERVICE_EXCEPTION_MESSAGE));
        }
    }
    
    /**
     * Updatae Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public update(req:Request, res:Response) {
        try {
            var employee: IEmployeeModel = <IEmployeeModel>req.body;
            var _id: string = req.params.id;
            var employeeDataAccess = new EmployeeDAO();
            employeeDataAccess.update(_id, employee, (error, result) => {
                if(error) {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.EMPLOYEE_UPDATE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, Constants.SERVICE_EXCEPTION_MESSAGE));
        }
    }
    
    /**
     * Delete Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public delete(req:Request, res:Response) {
        try {
            var _id: string = req.params.id;
            var employeeDataAccess = new EmployeeDAO();
            employeeDataAccess.delete(_id, (error, result) => {
                if (error) {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.EMPLOYEE_DELETE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, Constants.SERVICE_EXCEPTION_MESSAGE));
        }
    }

    /**
     * Get all employees
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public retrieve(req:Request, res:Response) {
        try {
            var employeeDataAccess = new EmployeeDAO();
            employeeDataAccess.retrieve((error, result) => {
                if(error) {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, result));
                }
            });
        } catch (e)  {
            res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, Constants.SERVICE_EXCEPTION_MESSAGE));
        }
    }

    /**
     * Get Employee by Id
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public findById(req:Request, res:Response) {
        try {
            var _id: string = req.params.id;
            var employeeDataAccess = new EmployeeDAO();
            employeeDataAccess.findById(_id, (error, result) => {
                if(error) {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, result));
                }
            });
        } catch (e)  {
            res.send(new ServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, Constants.SERVICE_EXCEPTION_MESSAGE));
        }
    }
}

export default EmployeeService;