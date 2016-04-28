// Library import
import { Request, Response } from "express";
import { injectable, inject } from "inversify";
// Privatye npm package import
import { EmployeeModel, IEmployeeModel } from "entity-employee";
import { BaseService } from "base-service";
// File import
import { IEmployeeService }  from "./IEmployeeService";
import { IEmployeeDAO } from "./../dal/dao/IEmployeeDAO";
import { Constants } from "../helpers/constants/Constants"

/**
 * EmployeeService
 *
 * Employee Service is used to write any business validation
 * and the bridge between API and Data access layer
 */
@injectable()
class EmployeeService 
extends BaseService 
implements IEmployeeService {

    constructor(@inject("IEmployeeDAO") _employeeDAO:IEmployeeDAO) {
        super();
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
                   res.status(422).send(super.createServiceResponse(Constants.FAILURE, error));
                } else {
                    res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.CREATE_SUCCESS));
                }
            });
        } catch (e)  {
            res.status(500).send(super.createServiceResponse(Constants.FAILURE, e.stack));
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
                    res.status(422).send(super.createServiceResponse(Constants.FAILURE, error));
                } else {
                    res.send(super.createServiceResponse(Constants.SUCCESS, Constants.UPDATE_SUCCESS));
                }
            });
        } catch (e)  {
            res.status(500).send(super.createServiceResponse(Constants.FAILURE, e.stack));
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
                    res.status(422).send(super.createServiceResponse(Constants.FAILURE, error));
                } else {
                    res.send(super.createServiceResponse(Constants.SUCCESS, Constants.DELETE_SUCCESS));
                }
            });
        } catch (e)  {
            res.status(500).send(super.createServiceResponse(Constants.FAILURE, e.stack));
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
                    res.status(422).send(super.createServiceResponse(Constants.FAILURE, error));
                } else {
                    res.send(super.createServiceResponse(Constants.SUCCESS, result));
                }
            });
        } catch (e)  {
           res.status(500).send(super.createServiceResponse(Constants.FAILURE, e.stack));
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
                    res.status(422).send(super.createServiceResponse(Constants.FAILURE, error));
                } else {
                    res.send(super.createServiceResponse(Constants.SUCCESS, result));
                }
            });
        } catch (e)  {
            res.status(500).send(super.createServiceResponse(Constants.FAILURE, e.stack));
        }
    }
}

// Holding the dao instance globally as this operator does not available at method scope.
let employeeDAO:IEmployeeDAO;

export { EmployeeService };
