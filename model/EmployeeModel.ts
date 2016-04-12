/// <reference path="../typings/main.d.ts" />

import * as Mangoose from "mongoose";

let Schema = Mangoose.Schema;

const EmployeeSchema = new Schema({
    employeeID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        first: {
            type: String,
            required: true
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

}, {collection: 'employees'});

//console.log(EmployeeSchema);
export default Mangoose.model('Employee', EmployeeSchema);