import IEmployeeModel from "./interfaces/EmployeeModel";

class HeroModel {
   
   private _employeeModel: IEmployeeModel;
   
   constructor(heroModel: IEmployeeModel) {
       this._employeeModel = heroModel;
   }
   get employeeID (): string {
       return this._employeeModel.employeeID;
   }
   
   get name (): any {
       return this._employeeModel.name;
   }
   
   get address (): any {
       return this._employeeModel.address;
   }    
}
Object.seal(HeroModel);
export default HeroModel;