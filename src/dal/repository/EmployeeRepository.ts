import {BaseRepository} from "base-dal";
import { IEmployeeRepository} from "./IEmployeeRepository";
import { IEmployeeModel, EmployeeModel } from "entity-employee";
import * as Mongoose from "mongoose";
import {injectable} from "inversify";

@injectable()
class EmployeeRepository<T extends Mongoose.Document>
extends BaseRepository<IEmployeeModel>
implements IEmployeeRepository<IEmployeeModel> {

    private employeeModel: Mongoose.Model<Mongoose.Document>;

    constructor () {
        super(EmployeeModel);
        this.employeeModel = EmployeeModel;
    }

    /**
     *  New Additional Method Implementation goes here (if required)
     */
}

Object.seal(EmployeeRepository);
export {EmployeeRepository};

