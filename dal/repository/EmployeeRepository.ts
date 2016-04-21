import {Employee, IEmployee} from "./../../common/phoenix-entity/index"
import {BaseRepository} from "./../../common/phoenix-dal/index";

class EmployeeRepository  extends BaseRepository<IEmployee> {
    constructor () {
        super(Employee);
    }    
} 

Object.seal(EmployeeRepository);
export default EmployeeRepository;