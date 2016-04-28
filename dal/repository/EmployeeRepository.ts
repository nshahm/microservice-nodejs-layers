import {BaseRepository} from "base-dal";
import { IEmployeeRepository} from "./IEmployeeRepository";
import { IEmployeeModel, EmployeeModel } from "entity-employee";
import * as Mongoose from "mongoose";
import {injectable} from "inversify"

@injectable()
class EmployeeRepository<T extends Mongoose.Document> 
extends BaseRepository<IEmployeeModel>
implements IEmployeeRepository<IEmployeeModel> { 
    
    private _employeeModel: Mongoose.Model<Mongoose.Document>;
    
    constructor () {
        
        super(EmployeeModel);
        this._employeeModel = EmployeeModel;
    }
    
    /** Method Implementation goes here */
    
}

Object.seal(EmployeeRepository);
export {EmployeeRepository};
