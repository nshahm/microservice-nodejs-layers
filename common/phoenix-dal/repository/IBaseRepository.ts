import mongoose = require("mongoose");
interface IBaseRepository<T> {
    
    // Read
    retrieve: (callback: (error: any, result: any)=> void)=> void;
    findById: (id: string, callback: (error:any, result: T) => void) => void;    
    
    // Write
    create: (item:T, callback: (error: any, result: any ) => void) => void;
    update:(_id: mongoose.Types.ObjectId, item:T, callback: (error: any, result: any)=> void) => void ;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    
}

export {IBaseRepository};