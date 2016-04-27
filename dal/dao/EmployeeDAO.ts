/// <reference path="../../typings/main.d.ts" />

import {EmployeeRepository} from "../repository/EmployeeRepository";
import IEmployeeDAO from "./IEmployeeDAO";
import {IEmployeeModel} from "entity-employee";
import * as Mongoose from "mongoose";
import {inject, injectable } from "inversify";

@injectable()
class EmployeeDAO  implements IEmployeeDAO {
    

    constructor (@inject("EmployeeRepository") _employeeRepository: EmployeeRepository<IEmployeeModel>) {
        employeeRepository = _employeeRepository;
    }
    
    /**
     * Create employee
     */
    create (item: IEmployeeModel, callback: (error: any, result: any) => void) {
        employeeRepository.create(item, callback);
    }

    /**
     * Retrieve employee
     */
    retrieve (callback: (error: any, result: any) => void) {
         employeeRepository.retrieve(callback);
    }

    /**
     * update employee
     */
    update (_id: string, item: IEmployeeModel, callback: (error: any, result: any) => void) {

        employeeRepository.findById(_id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                employeeRepository.update(res._id, item, callback);
            }
        });
    }

    /**
     * delete employee
     */
    delete (_id: string, callback:(error: any, result: any) => void) {
        employeeRepository.delete(_id , callback);
    }

    /**
     * Find by employee id
     */
    findById (_id: string, callback: (error: any, result: IEmployeeModel) => void) {
        employeeRepository.findById(_id, callback);
    }
}

let employeeRepository: EmployeeRepository<IEmployeeModel>;


Object.seal(EmployeeDAO);
export { EmployeeDAO };
