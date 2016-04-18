import MongoDB from "../../config/Mongodb";
import IEmployeeModel from "./../model/IEmployeeModel";

var mongoose = MongoDB.mongooseInstance;
var mongooseConnection = MongoDB.mongooseConnection;

class EmployeeSchema {
   
  static get schema () {
       let schema =  mongoose.Schema({
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
const schema = mongooseConnection.model<IEmployeeModel>("Employees", EmployeeSchema.schema);
export default schema;