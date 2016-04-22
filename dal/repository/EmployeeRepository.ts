import {BaseRepository} from "base-dal";
import {IEmployeeModel, EmployeeModel} from "entity-employee";
class EmployeeRepository  extends BaseRepository<IEmployeeModel> {
    constructor () {
        super(EmployeeModel);
    }
}

Object.seal(EmployeeRepository);
export {EmployeeRepository};
