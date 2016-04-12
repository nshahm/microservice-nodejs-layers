import EmployeeModel from "../model/EmployeeModel";

export default class Employee {
     createEmployee(req, res) {
        console.log("Created At " + req.body.createdAt);
        
        new EmployeeModel(req.body).save((err) => {
        if (err)
            res.send(err);

        res.json({ message: 'Employee created!' });
        });
    }
    
    getAllEmployee(req, res) {
        EmployeeModel.find((err, employees) => {
            if (err)
                res.send(err);

            res.json(employees);
        });
    }
   

    getEmployeeByID(req, res) {
        EmployeeModel.findById(req.params.employee_id, (err, employee) =>{
            if (err)
                res.send(err);
            res.json(employee);
        });
    }

    updateEmployee(req, res) {
        // use our employee model to find the employee we want
        EmployeeModel.findById(req.params.employee_id, (err, employee) => {

            if (err)
                res.send(err);

            employee.id = req.body.name;  // update the employees info

            // save the employee
            employee.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    }

  deleteEmployee(req, res) {
    EmployeeModel.remove({
        _id: req.params.employee_id
    }, (err) => {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
  }
};

