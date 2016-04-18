/// <reference path="../../typings/main.d.ts" />
import EmployeeRepository from "./../repository/EmployeeRepository";
import IEmployeeDataAccess from "./interfaces/EmployeeDataAccess";
import IEmployeeModel from "./../model/interfaces/EmployeeModel";
import EmployeeModel from "./../model/EmployeeModel";


class EmployeeDataAccess  implements IEmployeeDataAccess {
    private _employeeRepository: EmployeeRepository;

    constructor () {
        this._employeeRepository = new EmployeeRepository();
    }

    create (item: IEmployeeModel, callback: (error: any, result: any) => void) {
        this._employeeRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
         this._employeeRepository.retrieve(callback);
    }

    update (_id: string, item: IEmployeeModel, callback: (error: any, result: any) => void) {

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

    findById (_id: string, callback: (error: any, result: IEmployeeModel) => void) {
        this._employeeRepository.findById(_id, callback);
    }

}

Object.seal(EmployeeDataAccess);
export default EmployeeDataAccess;
