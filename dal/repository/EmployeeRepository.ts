import EmployeeModel from "./../model/EmployeeModel";
import IEmployeeModel from "./../model/interfaces/EmployeeModel";
import EmployeeSchema from "./../schemas/EmployeeSchema";
import RepositoryBase from "./base/RepositoryBase";

class EmployeeRepository  extends RepositoryBase<IEmployeeModel> {
    constructor () {
        super(EmployeeSchema);
    }    
} 

Object.seal(EmployeeRepository);
export default EmployeeRepository;