import * as Express from "express";
import EmployeeRoutes from "./../EmployeeRoutes";
var app = Express();
class BaseRoutes {
    
    get routes() {
        app.use("/", new EmployeeRoutes().routes);
        return app;
    }
}
export default BaseRoutes;