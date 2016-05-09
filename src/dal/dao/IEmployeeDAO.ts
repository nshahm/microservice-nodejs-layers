import * as Mongoose from "mongoose";
import {IBaseDAO} from "base-dal";

interface IEmployeeDAO<T>
extends IBaseDAO<T> {

    // Read
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;

    // Write
    create: (item: T, callback: (error: any, result: any ) => void) => void;
    update: (id: Mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void ;
    delete: (id: string, callback: (error: any, result: any) => void) => void;

}
export {IEmployeeDAO};
