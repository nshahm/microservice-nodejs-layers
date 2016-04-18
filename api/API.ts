import * as Express from "express";
import EmployeeRoutes from "./EmployeeAPI";

const app:Express.Express = Express();

class API {
    
    get routes() {
        app.use("/v1/employee/", new EmployeeRoutes().routes);
        return app;
    }
}
export default API;