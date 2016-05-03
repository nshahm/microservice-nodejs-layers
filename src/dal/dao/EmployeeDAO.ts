import { EmployeeRepository } from "../repository/EmployeeRepository";
import { IEmployeeDAO } from "./IEmployeeDAO";
import {IEmployeeModel} from "entity-employee";
import { inject, injectable } from "inversify";

let employeeRepository: EmployeeRepository<IEmployeeModel>;

@injectable()
class EmployeeDAO implements IEmployeeDAO {

    constructor (@inject("EmployeeRepository") employeeRepositoryObj: EmployeeRepository<IEmployeeModel>) {
        employeeRepository = employeeRepositoryObj;
    }

    /**
     * Create employee
     */
    public create (item: IEmployeeModel, callback: (error: any, result: any) => void) {
        employeeRepository.create(item, callback);
    }

    /**
     * Retrieve employee
     */
    public retrieve (callback: (error: any, result: any) => void) {
         employeeRepository.retrieve(callback);
    }

    /**
     * update employee
     */
    public update (id: string, item: IEmployeeModel, callback: (error: any, result: any) => void) {

        employeeRepository.findById(id, (err, res) => {
            if (err) {
                callback(err, res);
            }
            employeeRepository.update(res._id, item, callback);
        });
    }

    /**
     * delete employee
     */
    public delete (id: string, callback: (error: any, result: any) => void) {
        employeeRepository.delete(id, callback);
    }

    /**
     * Find by employee id
     */
    public findById (id: string, callback: (error: any, result: IEmployeeModel) => void) {
        employeeRepository.findById(id, callback);
    }
}

Object.seal(EmployeeDAO);
export { EmployeeDAO };

