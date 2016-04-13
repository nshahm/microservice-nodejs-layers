import  NewEmployeeAPI from "./NewEmployeeAPI";


//This API class will hold all the API belongs to this microservices.
let initializeAPI = (app:any) => {

    // Adding employee API routers
    app.use('/v1/employee', NewEmployeeAPI);
    
    
    // app.use('/', );
    app.use('/', (req, res, next) => {
        console.log("middleware function called from server.ts");
        next();
    })
}

export default initializeAPI;    
 

