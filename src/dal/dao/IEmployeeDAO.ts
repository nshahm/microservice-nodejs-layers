import {IBaseDAO} from "base-dal";

/**
 * @interface IEmployeeDAO - List of contract for defining DAO objects.
 */
interface IEmployeeDAO<T>
extends IBaseDAO<T> {

    /**
     * @method retrieve
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    retrieve: (callback: (error: any, result: any) => void) => void;

    /**
     * @method delete
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    findById: (id: string, callback: (error: any, result: T) => void) => void;

    /**
     * @method create
     * @param { IEmployeeModel }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    create: (item: T, callback: (error: any, result: any ) => void) => void;

    /**
     * @method update
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    update: (id: string, item: T, callback: (error: any, result: any) => void) => void ;

    /**
     * @method delete
     * @param { id }
     * @returns { error } Error if exists
     * @returns { result } Result will be success message. 
     */
    delete: (id: string, callback: (error: any, result: any) => void) => void;

}

/**
 * @export IEmployeeDAO
 */
export {IEmployeeDAO};
