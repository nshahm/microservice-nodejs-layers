import {IEmployeeService}  from "./IEmployeeService";
import {Request, Response} from "express";
import EmployeeDAO from "./../dal/dao/EmployeeDAO";
import Constants from "../helpers/constants/Constants"
import { injectable } from "inversify";
import {EmployeeModel, IEmployeeModel} from "entity-employee";
import {BaseService} from "base-service";

/**
 * EmployeeService
 *
 * Employee Service is used to write any business validation
 * and the bridge between API and Data access layer
 */
@injectable()
class EmployeeService extends BaseService implements IEmployeeService {

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
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.EMPLOYEE_CREATE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.EMPLOYEE_UPDATE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, Constants.EMPLOYEE_DELETE_SUCCESS));
                }
            });
        } catch (e)  {
            res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, result));
                }
            });
        } catch (e)  {
            console.log(e);
            res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
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
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, result));
                }
            });
        } catch (e)  {
            res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
        }
    }
    
    /**
     * findByEmployeeId
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee. 
     */
    public findByEmployeeId(req: Request, res: Response) {
        try {
            var _employeeId: string = req.params.employeeID;
            var employeeDataAccess = new EmployeeDAO();
            employeeDataAccess.findByEmployeeId(_employeeId, (error, result) => {
                if(error) {
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, error));
                } else {
                    res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_SUCCESS, result));
                }
            });
        } catch (e) {
            res.send(this.createServiceResponse(Constants.SERVICE_RESPONSE_STATUS_FAILURE, e));
        }
    }
}

export default EmployeeService;
