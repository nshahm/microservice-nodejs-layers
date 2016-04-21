/// <reference path="../../typings/main.d.ts" />
import EmployeeRepository from "../repository/EmployeeRepository";
import IEmployeeDAO from "./EmployeeDAO";
import {IEmployee} from "./../../common/phoenix-entity/index";
import * as Mongoose from "mongoose";


class EmployeeDAO  implements IEmployeeDAO {
    private _employeeRepository: EmployeeRepository;

    constructor () {
        this._employeeRepository = new EmployeeRepository();
    }

    create (item: IEmployee, callback: (error: any, result: any) => void) {
        this._employeeRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
         this._employeeRepository.retrieve(callback);
    }

    update (_id: string, item: IEmployee, callback: (error: any, result: any) => void) {

        this._employeeRepository.findById(_id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                this._employeeRepository.update(res._id, item, callback);
            }
        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._employeeRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IEmployee) => void) {
        this._employeeRepository.findById(_id, callback);
    }

}

Object.seal(EmployeeDAO);
export default EmployeeDAO;
