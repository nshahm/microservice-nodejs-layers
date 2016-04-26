import {BaseRepository} from "base-dal";
import {IEmployeeModel, EmployeeModel} from "entity-employee";
import * as Mongoose from "mongoose";
class EmployeeRepository<T extends Mongoose.Document>  extends BaseRepository<IEmployeeModel> {
    
    private _employeeModel: Mongoose.Model<Mongoose.Document>;
    
    constructor () {
        
        super(EmployeeModel);
        this._employeeModel = EmployeeModel;
    }
    
    
    findByEmployeeId (_employeeId: string, callback: (error: any, result: T) => void) {
        this._employeeModel.findOne({employeeID: _employeeId}, callback);
    }
}

Object.seal(EmployeeRepository);
export {EmployeeRepository};
