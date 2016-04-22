/// <reference path="node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
/// <reference path="node_modules/reflect-metadata/reflect-metadata.d.ts"/>

import "reflect-metadata";
import { Kernel } from "inversify";

// Actual implementation
import EmployeeService from "./service/EmployeeService";
import EmployeeAPI from "./api/EmployeeAPI";
import {Middlewares} from "base-middlewares";
import API from "./api/API";

// Interfaces
import {IEmployeeService} from "./service/IEmployeeService";
import {IEmployeeAPI} from "./api/IEmployeeAPI";
import {IMiddlewares} from "base-middlewares";
import {IAPI} from "./api/IAPI";

let kernel:inversify.IKernel = new Kernel();

kernel.bind<IEmployeeService>("IEmployeeService").to(EmployeeService).inSingletonScope();
kernel.bind<IEmployeeAPI>("IEmployeeAPI").to(EmployeeAPI).inSingletonScope();
kernel.bind<IMiddlewares>("IMiddlewares").to(Middlewares); 
kernel.bind<IAPI>("IAPI").to(API);

//kernel.bind<ITest>("ITest").to(Test).inSingletonScope();
//kernel.bind<IVehicle>("IVehicle").to(Truck).whenTargetNamed('Truck');

export default kernel;


export function getInstance<T>(name:string): T {
    return kernel.get<T>(name);
}