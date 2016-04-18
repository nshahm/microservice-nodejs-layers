/// <reference path="../../typings/main.d.ts" />
import * as mongoose from "mongoose";

interface EmployeeModel extends mongoose.Document {
  employeeID: string,
    name: {
        first: string,
        last: string
    },
    address: {
        lines: [string],
        city: string,
        state: string,
        zip: number
    }
}

export default EmployeeModel;