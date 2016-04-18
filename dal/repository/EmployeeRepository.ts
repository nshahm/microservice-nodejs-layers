import EmployeeModel from "./../model/EmployeeModel";
import IEmployeeModel from "./../model/IEmployeeModel";
import EmployeeSchema from "./../schemas/EmployeeSchema";
import BaseRepository from "./base/BaseRepository";

class EmployeeRepository  extends BaseRepository<IEmployeeModel> {
    constructor () {
        super(EmployeeSchema);
    }    
} 

Object.seal(EmployeeRepository);
export default EmployeeRepository;