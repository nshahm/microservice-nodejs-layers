import MongoDB from "../../config/MongoDB";
import IEmployeeModel from "./../model/interfaces/EmployeeModel";

var mongoose = MongoDB.mongooseInstance;
var mongooseConnection = MongoDB.mongooseConnection;

class EmployeeSchema {
   
  static get schema () {
       var schema =  mongoose.Schema({
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
       
       return schema;
   }
   
}
var schema = mongooseConnection.model<IEmployeeModel>("Employees", EmployeeSchema.schema);
export default schema;