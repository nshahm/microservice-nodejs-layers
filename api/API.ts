import  NewEmployeeAPI from "./NewEmployeeAPI";
//import app from "../config/Express"


//This API class will hold all the API belongs to this microservices.
//let router:any = app.route;
//console.log(app);
let initializeAPI = (app:any) => {

    // Adding employee API routers
    app.use('/v1/employee', NewEmployeeAPI);
}

export default initializeAPI;    
//export default app;    

