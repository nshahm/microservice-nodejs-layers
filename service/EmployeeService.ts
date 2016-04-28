/// <reference path="../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />

import {IEmployeeService}  from "./IEmployeeService";
import {Request, Response} from "express";
import IEmployeeDAO from "./../dal/dao/IEmployeeDAO";
import { EmployeeDAO } from "./../dal/dao/EmployeeDAO";
import Constants from "../helpers/constants/Constants"
import { injectable, inject } from "inversify";
import {EmployeeModel, IEmployeeModel} from "entity-employee";
import {ServiceResponse} from "base-service";

/**
 * EmployeeService
 *
 * Employee Service is used to write any business validation
 * and the bridge between API and Data access layer
 */
@injectable()
class EmployeeService  implements IEmployeeService {


    private _this = this;
    constructor(@inject("IEmployeeDAO") _employeeDAO:IEmployeeDAO) {
        employeeDAO = _employeeDAO;
        
    }

    /**
     * Create Employee
     *
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    
    public create(req:Request, res:Response) {
        try {
            var employee: IEmployeeModel = <IEmployeeModel>req.body;

            employeeDAO.create(employee, (error, result) => {
                if (error) {
                    console.log(error);
                    console.log(result);
                   
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.CREATE_SUCCESS));
                }
            });
        } catch (e)  {
            console.log(e);
            res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
            
            employeeDAO.update(_id, employee, (error, result) => {
                if(error) {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.UPDATE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
            
            
            employeeDAO.delete(_id, (error, result) => {
                if (error) {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.DELETE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
           
            employeeDAO.retrieve((error, result) => {
                if(error) {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, result));
                }
            });
        } catch (e)  {
            console.log(e);
            res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
            
            employeeDAO.findById(_id, (error, result) => {
                if(error) {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, result));
                }
            });
        } catch (e)  {
            res.send(createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
        }
    }
}

/**
 * createServiceResponse
 *
 * @param {String} status - Response status.
 * @param {Object} message - The response object of the API request.
 */
let  createServiceResponse = (status, message) => {

    var _response = new ServiceResponse(status, message)
    return _response;
}

// Holding the dao instance globally as this operator does not available at method scope.
let employeeDAO:IEmployeeDAO;

export default EmployeeService;
