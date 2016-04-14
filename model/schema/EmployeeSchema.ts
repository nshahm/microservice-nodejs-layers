import mongoose = require("mongoose");
import IEmployee = require("../Employee");

/**
 * EmployeeSchema
 */
class EmployeeSchema {
    
    static get schema() {
        var schema = new mongoose.Schema({
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
        });
        return schema;
    }
}

var repository = mongoose.model<IEmployee>("Employee", EmployeeSchema.schema);

export = repository;