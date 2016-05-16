import * as mongoose from "mongoose";
import { injectable } from "inversify";
import { EmployeeModel } from "entity-employee";
import { IEmployeeDAO } from "./IEmployeeDAO";
/**
 * @class EmployeeDAO
 * @classdesc Employee Data access layer has interaction with database for CRUD operations.
 */
@injectable()
class EmployeeDAO<T extends mongoose.Document>
implements IEmployeeDAO<T> {

    /**
     * @private - model
     */
    private model: mongoose.Model<mongoose.Document>;

    /**
     * @constructor EmployeeDAO
     * @memberof EmployeeDAO
     */
    constructor () {
        this.model = EmployeeModel;
    }

    /**
     * @method create
     * @memberof EmployeeDAO
     * @param { IEmployeeModel }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public create (item: T, callback: (error: any, result: any) => void) {
        this.model.create(item, callback);
    }

    /**
     * @method retrieve
     * @memberof EmployeeDAO
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public retrieve (callback: (error: any, result: any) => void) {
         this.model.find({}, callback);
    }

    /**
     * @method update
     * @memberof EmployeeDAO
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public update (id: string, item: T, callback: (error: any, result: any) => void) {
            this.model.findByIdAndUpdate( id , item, callback);

    }

    /**
     * @method delete
     * @memberof EmployeeDAO
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public delete (id: string, callback: (error: any, result: any) => void) {
        this.model.remove({_id: this.toObjectId(id)}, (error) => callback(error, null));

    }

    /**
     * @method findById
     * @memberof EmployeeDAO
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    public findById (id: string, callback: (error: any, result: T) => void) {
        this.model.findOne({employeeID: id}, callback);
    }

    /**
     * @method toObjectId
     * @memberof EmployeeDAO
     * @param { hexString } - input hexString
     * @returns { Mongoose.Types.ObjectId } ObjectId
     */
    private toObjectId (id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }
}

Object.seal(EmployeeDAO);

/**
 * @export Exported EmployeeDAO to use it in service layer
 */
export { EmployeeDAO };

