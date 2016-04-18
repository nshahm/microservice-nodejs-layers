import IEmployeeModel from "./interfaces/EmployeeModel";

class HeroModel {
   
   private _heroModel: IEmployeeModel;
   
   constructor(heroModel: IEmployeeModel) {
       this._heroModel = heroModel;
   }
   get employeeID (): string {
       return this._heroModel.employeeID;
   }
   
   get name (): any {
       return this._heroModel.name;
   }
   
   get address (): any {
       return this._heroModel.address;
   }    
}
Object.seal(HeroModel);
export default HeroModel;