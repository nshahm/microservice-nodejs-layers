import mongoose = require("mongoose");

interface IEmployee extends mongoose.Document {
    
    employeeID: String,
    name: {
        first: String,
        last: String
    },
    address: {
        lines: [String],
        city: String,
        state: String,
        zip: Number
    }
}
 
export = IEmployee;