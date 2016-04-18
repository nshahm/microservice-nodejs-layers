import * as Express from "express";
import EmployeeService from "./../service/EmployeeService";

var router = Express.Router();
class EmployeeRoutes {
    private _employeeController: EmployeeService;
    
    constructor () {
        this._employeeController = new EmployeeService();   
    }
    get routes () {
        var service = this._employeeController;
        router.get("/heroes", service.getAll);
        router.post("/heroes", service.createEmployee);
        router.put("/heroes/:_id", service.updateEmployee);
        router.get("/heroes/:_id", service.getEmployee);
        router.delete("/heroes/:_id", service.deleteEmployee);
        
        return router;
    }
}

Object.seal(EmployeeRoutes);
export default EmployeeRoutes;