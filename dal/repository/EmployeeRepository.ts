import {BaseRepository} from "base-dal";
// import { EmployeeRepository} from "./EmployeeRepository";
import {IEmployeeModel, EmployeeModel} from "entity-employee";
import * as Mongoose from "mongoose";
import {injectable} from "inversify"

@injectable()
class EmployeeRepository<T extends Mongoose.Document> 
extends BaseRepository<IEmployeeModel> {
    
    private _employeeModel: Mongoose.Model<Mongoose.Document>;
    
    constructor () {
        
        super(EmployeeModel);
        this._employeeModel = EmployeeModel;
    }
}

Object.seal(EmployeeRepository);
export {EmployeeRepository};
