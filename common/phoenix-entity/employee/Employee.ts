import {IEmployee} from "./IEmployee";
import * as Mongoose from "mongoose";

class EmployeeSchema {
   
  static get employeeSchema () {
       let employeeSchema =  new Mongoose.Schema({
           employeeID: {
                type: String,
                required: true,
                unique: true
            },
            name: {
                first: {
                    type: String,
                    required: true,
                    errMsg: 'Enter First Name'
                },
                last: {
                    type: String,
                    required: true
                }
            },
            address: {
                lines: {
                    type: [String]
                },
                city: {
                    type: String
                },
                state: {
                    type: String
                },
                zip: {
                    type: Number
                }
            }
       });
       
       return employeeSchema;
   }
   
}
const Employee = Mongoose.model<IEmployee>("Employees", EmployeeSchema.employeeSchema);
export {Employee};
