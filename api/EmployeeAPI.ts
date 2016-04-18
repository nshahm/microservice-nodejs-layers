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
        router.get("/", service.retrieve);
        router.get("/:_id", service.findById);
        router.post("/", service.create);
        router.put("/:_id", service.update);        
        router.delete("/:_id", service.delete);
        
        return router;
    }
}

Object.seal(EmployeeRoutes);
export default EmployeeRoutes;