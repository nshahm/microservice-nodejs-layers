import * as Express from "express";
import {IEmployeeService} from "./../service/IEmployeeService";
import {IEmployeeAPI} from "./IEmployeeAPI";
import {BaseAPI} from "base-api";

import { injectable, inject } from "inversify";

let router: Express.Router = Express.Router();

/**
 * @class EmployeeAPI
 * @classdesc EmployeeAPI class will have all REST API routes for Employee service
 * @extends { BaseAPI } - available in base-api package
 * @implements {IEmployeeAPI } - IEmployeeAPI
 */
@injectable()
class EmployeeAPI extends BaseAPI implements IEmployeeAPI {

    /**
     * @private {IEmployeeService } Injected employee service instance 
     */
    private employeeService: IEmployeeService;

    /**
     * @constructor constructor 
     */
    constructor (@inject("IEmployeeService")  employeeService: IEmployeeService) {
        super();
        this.employeeService = employeeService;
    }

    /**
     * @method
     * @memberof EmployeeAPI
     * @returns { Express.Router } router instance contains all the REST routes added for EmployeeAPI
     */
    public routes (): Express.Router {

        /**
         * @api {get} /employee/ Fetch all employees
         * @apiName GetAllEmployees
         * @apiGroup Employee
         * @apiVersion 1.0.0
         * @apiSuccess {json} json with list of employee.
         */
        router.get("/", this.employeeService.retrieve);

        /**
         * @api {get} /employee/:id Fetch Employee
         * @apiName GetEmployeeById 
         * @apiGroup Employee
         * @apiParam {String} id - mongoose.Types.ObjectId || hexString  
         * @apiVersion 1.0.0
         * @apiSuccess {json} ServiceResponse Response json wrappered with status
         * @apiSuccessExample Example data on success
         * {
         *  status : "Success",
         *  message : [
         *      {
         *          employee 1
         *      }, 
         *      {
         *          employee 2
         *      }
         *  ]
         * }
         */
        router.get("/:id", this.employeeService.findById);

        /**
         * @api {post} /employee/ Create Employee
         * @apiGroup Employee
         * @apiVersion 1.0.0
         * @apiParam {json=EmployeeModel} input json of type EmployeeModel
         * @apiParamExample  Example request 
         * {
         *  "employee data"
         * }
         * @apiSuccess {json} ServiceResponse Response json wrappered with status
         * @apiSuccessExample Example data on success
         * {
         *     "status": "Success",
         *     "message": "Created successfully",
         * }
         */
        router.post("/", this.employeeService.create);

        /**
         * @api {put} /employee/:id Update Employee
         * @apiGroup Employee
         * @apiVersion 1.0.0
         * @apiParam {string } hexString or mongoose.Types.ObjectId _id of EmployeeModel 
         * @apiParam {json=EmployeeModel} input json of type EmployeeModel
         * @apiParamExample Example request 
         * {
         *  "employee updated data"
         * }
         * @apiSuccess {json} ServiceResponse Response json wrappered with status
         * @apiSuccessExample Example data on success
         * {
         *     "status": "Success",
         *     "message": "Updated successfully",
         * }
         */
        router.put("/:id", this.employeeService.update);

        /**
         * @api {delete} /employee/:id Delete Employee
         * @apiName DeleteEmployeeById 
         * @apiGroup Employee
         * @apiParam {String} id - mongoose.Types.ObjectId or hexString  
         * @apiVersion 1.0.0
         * @apiSuccess {json} ServiceResponse Response json wrappered with status 
         * @apiSuccessExample Example data on success
         * {
         *     "status": "Success",
         *     "message": "Deleted successfully",
         * }
         */
        router.delete("/:id", this.employeeService.delete);

        return router;
    }
}

Object.seal(EmployeeAPI);
export { EmployeeAPI };
