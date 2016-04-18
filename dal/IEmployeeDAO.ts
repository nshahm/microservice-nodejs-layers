
import IBaseDAO from "./base/IBaseDAO";
import IEmployeeModel from "./model/EmployeeModel";

interface IEmployeeDAO extends IBaseDAO<IEmployeeModel> {
    
} 
export default IEmployeeDAO;