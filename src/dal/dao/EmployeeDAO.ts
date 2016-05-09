import * as mongoose from "mongoose";
import { injectable } from "inversify";
import { EmployeeModel } from "entity-employee";
import { IEmployeeDAO } from "./IEmployeeDAO";

@injectable()
class EmployeeDAO<T extends mongoose.Document>
implements IEmployeeDAO<T> {

    private model: mongoose.Model<mongoose.Document>;

    constructor () {
        this.model = EmployeeModel;
    }

    public create (item: T, callback: (error: any, result: any) => void) {
        this.model.create(item, callback);

    }

    public retrieve (callback: (error: any, result: any) => void) {
         this.model.find({}, callback);
    }

    public update (id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
            this.model.update({_id: id}, item, callback);

    }

    public delete (id: string, callback: (error: any, result: any) => void) {
        this.model.remove({_id: this.toObjectId(id)}, (err) => callback(err, null));

    }

    public findById (id: string, callback: (error: any, result: T) => void) {
        this.model.findById( id, callback);
    }


    private toObjectId (id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }
}

Object.seal(EmployeeDAO);
export { EmployeeDAO };

