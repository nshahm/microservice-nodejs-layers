import express = require("express");
import mongoose = require("mongoose");
import BaseDAO = require("./base/BaseDAO");
import repository = require("../model/schema/EmployeeSchema");
import IEmployee = require("../model//Employee");
import ErrorObj = require("../error/ErrorObject");


/**
 * EmployeeDAO
 */
class EmployeeDAO extends BaseDAO {
    
    /**
     * Create Employee.
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public static createEmployee(req: express.Request, res: express.Response) {
        
        var employee : IEmployee = <IEmployee>req.body;
        repository.create(employee, (err) => {
            if (err) {
                res.status(400).send(new ErrorObj("error", err));
            } else {
                res.status(200).send(new ErrorObj("success", "Employee Created Successfully"));
            }
        });
    }
    
    /**
     * Get all Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public static getEmployees(req: express.Request, res: express.Response) {
        
        repository.find((err, employees) => {
            if (err) {
                res.status(400).send(new ErrorObj("error", err));
            } else {
                res.status(200).send(new ErrorObj("success", employees));
            }
        });
        
    }
    
    /**
     * Get Employee by ID
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public static getEmployeeByID(req: express.Request, res: express.Response) {
        
        repository.findById(req.params.id, (err, employee) =>{
            if (err) {
                res.status(400).send(new ErrorObj("error", err));
            } else {
                res.status(200).send(new ErrorObj("success", employee));
            } 
        });
    }
    
    /**
     * Update Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public static updateEmployee(req: express.Request, res: express.Response) {
        
        repository.findOneAndUpdate({_id:req.params.id}, req.body, (err, employee) => {
            if (err) {
                res.status(400).send(new ErrorObj("error", err));
            } else {
                res.status(200).send(new ErrorObj("success", "Employee updated successfully"));
            }            
        });
    }
    
    /**
     * Update Employee
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public static deleteEmployee(req: express.Request, res: express.Response) {
        
        repository.remove({_id: req.params.id}, (err) => {
            if (err) {
                res.status(400).send(new ErrorObj("error", err));
            } else {
                res.status(200).send(new ErrorObj("success", "Employee deleted successfully"));
            }
        });
    }
    
    /**
     * Find Employee By Name
     * 
     * @param {Object} req - The request of the employee.
     * @param {Object} res - The response of the employee.
     */
    public static findEmployeeByName(req: express.Request, res: express.Response) {
        
        console.log(" req.params " + JSON.stringify(req.params) + " " + JSON.stringify(req.body));
        
        var userName = req.params;
    
        repository.findOne({ 'name.first' : userName }, (err, employee) => {
            if (err) {
                res.status(400).send(new ErrorObj("error", err));
            } else {
                res.status(200).send(new ErrorObj("success", employee));
            }
        });
    }
}

export = EmployeeDAO;
 

 
