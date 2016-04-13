import EmployeeModel from "../model/EmployeeModel";
import BaseData from "./base/BaseData";
import {Request, Response } from "express";


export default class Employee extends BaseData {

    /**
     * Creating the new employee
     */
     createEmployee(req, res) {
        new EmployeeModel(req.body).save((err) => {
        if (err)
            res.send(err);
        res.json({ message: 'Employee created!' });
        });
    }

    /**
    * Get all employees
    */
    getAllEmployee(req, res) {
        EmployeeModel.find((err, employees) => {
            if (err)
                res.send(err);
            res.json(employees);
        });
    }

    /**
    * Get employee by ID
    */
    getEmployeeByID(req, res) {
        EmployeeModel.findById(req.params.id, (err, employee) =>{
            if (err)
                res.send(err);
            res.json(employee);
        });
    }

    /**
    * Updated employee
    */
    updateEmployee(req, res) {
        EmployeeModel.findOneAndUpdate({_id:req.params.id}, req.body, (err, employee) => {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully updated' });
        });
    }

    /**
    * Delete employee
    */
    deleteEmployee(req, res) {
        EmployeeModel.remove({
            _id: req.params.id
        }, (err) => {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    }
};
