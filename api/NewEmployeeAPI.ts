
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
router.get('/', employeeService.retrieve);

// Get employee by Id
router.get('/:id', employeeService.findById);

// Create employee
router.post('/', employeeService.create);

// Update employee by id
router.put('/:id', employeeService.update);

// delete employee
router.delete('/:id', employeeService.delete);

export default router;
        
        