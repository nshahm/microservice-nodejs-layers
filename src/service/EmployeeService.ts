import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IEmployeeModel } from "entity-employee";
import { BaseService } from "base-service";
import { ParseError } from "asd-mongoose-error-parse";
import { IEmployeeService }  from "./IEmployeeService";
import { IEmployeeDAO } from "./../dal/dao/IEmployeeDAO";
import { Constants } from "../helpers/constants/Constants";

// Holding the dao instance globally as this operator does not available at method scope.
let employeeDAO: IEmployeeDAO;

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

    constructor( @inject("IEmployeeDAO") employeeDAOObj: IEmployeeDAO) {
        super();
        employeeDAO = employeeDAOObj;
    }

    /**
     * Create Employee
     *
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public create(req: Request, res: Response) {
        let employee: IEmployeeModel = <IEmployeeModel>req.body;

        employeeDAO.create(employee, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.CREATE_SUCCESS));
            }
        });
    }

    /**
     * Updatae Employee
     *
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public update(req: Request, res: Response) {
        let employee: IEmployeeModel = <IEmployeeModel>req.body;
        let id: string = req.params.id;

        employeeDAO.update(id, employee, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.send(super.createServiceResponse(Constants.SUCCESS, Constants.UPDATE_SUCCESS));
            }
        });
    }

    /**
     * Delete Employee
     *
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public delete(req: Request, res: Response) {
        let id: string = req.params.id;

        employeeDAO.delete(id, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.send(super.createServiceResponse(Constants.SUCCESS, Constants.DELETE_SUCCESS));
            }
        });
    }

    /**
     * Get all employees
     *
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public retrieve(req: Request, res: Response) {
        employeeDAO.retrieve((error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.send(super.createServiceResponse(Constants.SUCCESS, result));
            }
        });
    }

    /**
     * Get Employee by Id
     *
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public findById(req: Request, res: Response) {
        let id: string = req.params.id;

        employeeDAO.findById(id, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.send(super.createServiceResponse(Constants.SUCCESS, result));
            }
        });
    }
}

export { EmployeeService };

