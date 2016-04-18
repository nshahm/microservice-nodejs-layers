
import  EmployeeService from "../service/EmployeeService";
import * as express from "express";
//import app from "../config/Express";


let router = express.Router();

//Creating a instance for EmployeeService
let employeeService = new EmployeeService();

if (router == null) {
    throw Error("Error creating router");
}

/**
 * Adding routes to employee service
 */
// List
router.get('/', employeeService.getAll);

// Get employee by Id
router.get('/:id', employeeService.getEmployee);

// Create employee
router.post('/', employeeService.createEmployee);

// Update employee by id
router.put('/:id', employeeService.updateEmployee);

// delete employee
router.delete('/:id', employeeService.deleteEmployee);

export default router;
        
        