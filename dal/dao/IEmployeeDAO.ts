
import {IBaseDAO} from "./../../common/phoenix-dal/index";
import {IEmployee} from "./../../common/phoenix-entity/index";

interface IEmployeeDAO extends IBaseDAO<IEmployee> {
    
} 
export default IEmployeeDAO;