import * as Express from "express";
import EmployeeRoutes from "./../EmployeeAPI";
var app = Express();
class BaseRoutes {
    
    get routes() {
        app.use("/v1/employee/", new EmployeeRoutes().routes);
        return app;
    }
}
export default BaseRoutes;