import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { IEmployeeModel, EmployeeModel } from "entity-employee";
import { BaseService } from "base-service";
import { ParseError } from "mongoose-error-parser";
import { IEmployeeService }  from "./IEmployeeService";
import { IEmployeeDAO } from "./../dal/dao/IEmployeeDAO";
import { Constants } from "../helpers/constants/Constants";

// Holding the dao instance globally as this operator does not available at method scope.
let employeeDAO: IEmployeeDAO<IEmployeeModel>;

/**
 * EmployeeService
 * @class
 * @classdesc Employee Service is used to write any business validation and the bridge between API and Data access layer
 */
@injectable()
class EmployeeService
    extends BaseService
    implements IEmployeeService {

    constructor( @inject("IEmployeeDAO") employeeDAOObj: IEmployeeDAO<IEmployeeModel>) {
        super();
        employeeDAO = employeeDAOObj;
    }

    /**
     * @method Create Employee
     * @memberof EmployeeService
     * @param {Express.Request} req - The request of the employee.
     * @param {Express.Response} res - The response of the employee.
     */
    public create(req: Request, res: Response) {
        let employee: IEmployeeModel = <IEmployeeModel>req.body;
        if (super.validateEntityVersion(employee.entityVersion, new EmployeeModel().entityVersion)) {
            res.status(505).send(super.createServiceResponse(Constants.FAILURE, "Entity Version Not Supported"));
        } else {

            employeeDAO.create(employee, (error, result) => {
                if (error) {
                    res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
                } else {
                    res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.CREATE_SUCCESS));
                }
            });
        }
    }

    /**
     * @method Update Employee
     * @memberof EmployeeService
     * @param {Express.Request} req - The request of the employee.
     * @param {Express.Response} res - The response of the employee.
     */
    public update(req: Request, res: Response) {
        let employee: IEmployeeModel = <IEmployeeModel>req.body;
        let id: string = req.params.id;

        employeeDAO.findById(id, (error, data) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            }
            employeeDAO.update(data._id, employee, (err, result) => {
                if (err) {
                    res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
                } else {
                    res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.UPDATE_SUCCESS));
                }
            });
        });

    }

    /**
     * @method Delete Employee
     * @memberof EmployeeService
     * @param {Express.Request} req - The request of the employee.
     * @param {Express.Response} res - The response of the employee.
     */
    public delete(req: Request, res: Response) {
        let id: string = req.params.id;

        employeeDAO.delete(id, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, Constants.DELETE_SUCCESS));
            }
        });
    }

    /**
     * @method Get all employees
     * @memberof EmployeeService
     * @param {Express.Request} req - The request of the employee.
     * @param {Express.Response} res - The response of the employee.
     */
    public retrieve(req: Request, res: Response) {
        employeeDAO.retrieve((error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, result));
            }
        });
    }

    /**
     * @method Get Employee by Id
     * @memberof EmployeeService
     * @param {Express.Request} req - The request of the employee.
     * @param {Express.Response} res - The response of the employee.
     */
    public findById(req: Request, res: Response) {
        let id: string = req.params.id;

        employeeDAO.findById(id, (error, result) => {
            if (error) {
                res.status(422).send(super.createServiceResponse(Constants.FAILURE, ParseError.parse(error)));
            } else {
                res.status(200).send(super.createServiceResponse(Constants.SUCCESS, result));
            }
        });
    }
}

/**
 * @export - EmployeeService exported will be used in API layer.
 */
export { EmployeeService };

